import { useChatStore, useFeedback } from '@markprompt/react';
import { type ComponentPropsWithoutRef, useState, useCallback } from 'react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

import { Icons } from './icons';

export type CSAT = 0 | 1 | 2 | 3 | 4 | 5;

interface CSATPickerProps extends ComponentPropsWithoutRef<'aside'> {
  threadId: string | undefined;
  csat?: CSAT;
  className?: string;
}

const getHeading = (csat: CSAT): string | undefined => {
  switch (csat) {
    case 1:
      return 'Very unhelpful';
    case 2:
      return 'Unhelpful';
    case 3:
      return 'Somewhat helpful';
    case 4:
      return 'Helpful';
    case 5:
      return 'Very helpful';
  }
  return undefined;
};

export const CSATPicker = ({
  csat = 0,
  threadId,
  className,
}: CSATPickerProps) => {
  const projectKey = useChatStore((state) => state.projectKey);
  const [tempValue, setTempValue] = useState<CSAT>(csat);
  const [permanentValue, setPermanentValue] = useState<CSAT>(csat);
  const [isHovering, setIsHovering] = useState(false);

  const { submitThreadCSAT } = useFeedback({
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    projectKey,
  });

  const submitCSAT = useCallback(
    (value: CSAT) => {
      if (!threadId) {
        return;
      }
      setTempValue(value);
      setPermanentValue(value);
      submitThreadCSAT(threadId, value);
      toast.success('Thank you!');
    },
    [submitThreadCSAT, threadId],
  );

  const tempHeading = getHeading(tempValue);
  return (
    <div className={cn(className, 'csat-heading')}>
      <p className="text-xs text-stone-500 mb-1.5">
        {isHovering && tempHeading ? tempHeading : 'How helpful was this?'}
      </p>
      <div
        onMouseEnter={() => {
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
          setTempValue(permanentValue);
        }}
        style={{ display: 'flex', alignItems: 'center', gap: '0.125rem' }}
      >
        {Array.from(Array(5).keys()).map((_, i) => {
          const isActive = i + 1 <= tempValue;
          return (
            <Icons.star
              onMouseEnter={() => {
                setTempValue((i + 1) as CSAT);
              }}
              onClick={() => {
                submitCSAT((i + 1) as CSAT);
              }}
              key={`star-${i}`}
              className={cn('csat-star', 'w-5 h-5', {
                'stroke-stone-500 fill-none': !isActive,
                'fill-amber-500 stroke-amber-500': isActive,
              })}
              data-active={isActive}
            />
          );
        })}
      </div>
    </div>
  );
};
