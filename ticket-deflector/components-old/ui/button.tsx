import { cva, type VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ComponentType,
  type ComponentPropsWithoutRef,
} from 'react';

import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/ui';

const buttonVariants = cva(
  'group relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border-solid border text-sm/6 font-semibold after:absolute after:dark:inset-[-1px] after:inset-0 after:rounded-[calc(theme(borderRadius.lg)-1px)] after:bg-transparent transition duration-200 focus-visible:outline-none focus-visible:ring select-none disabled:cursor-not-allowed disabled:bg-[--btn-bg-disabled] disabled:text-[--btn-text-disabled] outline-none cursor-default focus-visible:ring-[--btn-ring] bg-[--btn-bg] hover:bg-[--btn-bg-hover] text-[--btn-text] border-[--btn-border] focus-visible:border-transparent shadow-[shadow:0_1px_3px_0_rgba(0,0,0,var(--shadow-opacity))] hover:shadow-[shadow:0_2px_5px_0_rgba(0,0,0,var(--shadow-accent-opacity))] after:shadow-[shadow:inset_0_1px_1px_0_rgba(255,255,255,var(--highlight-opacity))] disabled:after:hidden disabled:shadow-none',
  {
    variants: {
      variant: {
        default:
          'disabled:border-0 [--btn-bg:theme(colors.neutral.950)] dark:[--btn-bg:theme(colors.white)] [--btn-bg-hover:theme(colors.neutral.800)] dark:[--btn-bg-hover:theme(colors.neutral.300)] [--btn-text:theme(colors.white)] dark:[--btn-text:theme(colors.neutral.950)] [--btn-border:theme(colors.neutral.800)] dark:[--btn-border:theme(colors.transparent)] [--btn-ring:var(--ring)] [--shadow-opacity:0.15] [--shadow-accent-opacity:0.3] [--highlight-opacity:0.27] [--btn-bg-disabled:theme(colors.neutral.200)] dark:[--btn-bg-disabled:theme(colors.neutral.800)] [--btn-text-disabled:theme(colors.neutral.400)] dark:[--btn-text-disabled:theme(colors.neutral.950)]',
        secondary:
          'disabled:border-0 [--btn-bg:theme(colors.neutral.100)] dark:[--btn-bg:theme(colors.neutral.800)] [--btn-bg-hover:theme(colors.neutral.200)] dark:[--btn-bg-hover:theme(colors.neutral.800)] [--btn-text:theme(colors.neutral.950)] dark:[--btn-text:theme(colors.white)] [--btn-border:theme(colors.neutral.300)] dark:[--btn-border:theme(colors.white/5%)] [--btn-ring:var(--ring)] [--shadow-opacity:0.15] [--shadow-accent-opacity:0.2] [--highlight-opacity:0.1] [--btn-bg-disabled:theme(colors.neutral.200)] dark:[--btn-bg-disabled:theme(colors.neutral.800)] [--btn-text-disabled:theme(colors.neutral.400)] dark:[--btn-text-disabled:theme(colors.neutral.950)]',
        outline:
          '[--btn-bg:theme(colors.neutral.50)] dark:[--btn-bg:theme(colors.neutral.950)] [--btn-bg-hover:theme(colors.neutral.100)] dark:[--btn-bg-hover:theme(colors.neutral.900)] [--btn-text:var(--typography-heading)] [--btn-border:theme(colors.neutral.200)] dark:[--btn-border:theme(colors.neutral.800)] [--btn-ring:var(--ring)] [--shadow-opacity:0.05] [--shadow-accent-opacity:0.1] [--highlight-opacity:0] [--btn-text-disabled:theme(colors.neutral.400)] dark:[--btn-text-disabled:theme(colors.neutral.700)] disabled:border-neutral-200 dark:disabled:border-neutral-800',
        ghost:
          '[--btn-bg:theme(colors.transparent)] [--btn-bg-hover:theme(colors.neutral.100)] dark:[--btn-bg-hover:theme(colors.neutral.900)]  [--btn-text:theme(colors.neutral.950)] dark:[--btn-text:theme(colors.white)] [--btn-border:theme(colors.transparent)] dark:[--btn-border:theme(colors.transparent)] [--btn-ring:var(--ring)] [--shadow-opacity:0.0] [--shadow-accent-opacity:0.0] [--highlight-opacity:0] [--btn-text-disabled:theme(colors.neutral.400)] dark:[--btn-text-disabled:theme(colors.neutral.700)]',
        destructive:
          'disabled:border-0 [--btn-bg:theme(colors.rose.500)] [--btn-bg-hover:theme(colors.rose.450)] [--btn-text:theme(colors.white)] [--btn-border:theme(colors.rose.600)] dark:[--btn-border:theme(colors.white/10%)] [--btn-ring:theme(colors.rose.300)] dark:[--btn-ring:theme(colors.rose.700)] [--shadow-opacity:0.15] [--shadow-accent-opacity:0.25] [--highlight-opacity:0.2] [--btn-bg-disabled:theme(colors.neutral.200)] dark:[--btn-bg-disabled:theme(colors.neutral.800)] [--btn-text-disabled:theme(colors.neutral.400)] dark:[--btn-text-disabled:theme(colors.neutral.950)]',
      },
      size: {
        default: 'h-9 px-4 py-2',
        xs: 'h-6 rounded-md p-2 text-xs',
        sm: 'h-8 rounded-md p-2 text-sm',
        lg: 'h-10 rounded-md px-6 text-sm',
        xl: 'h-12 rounded-lg px-6 text-base font-medium',
        icon: 'h-9 w-9',
        free: '',
      },
      scale: {
        true: 'active:scale-[97%] disabled:active:scale-[100%] active:shadow-[shadow:0_1px_3px_0_rgba(0,0,0,var(--shadow-accent-opacity))]',
      },
      nowrap: {
        true: 'whitespace-nowrap',
      },
      pointer: {
        true: 'cursor-pointer',
      },
      muted: {
        true: 'text-[--typography-muted] hover:text-[--typography-heading] focus-visible:text-[--typography-heading]',
      },
      darkMuted: {
        true: 'dark:text-[--typography-muted] dark:hover:text-[--typography-heading] dark:focus-visible:text-[--typography-heading]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      scale: true,
      nowrap: true,
      pointer: false,
      muted: false,
      darkMuted: false,
    },
  },
);

type ButtonProps = {
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      scale,
      nowrap,
      pointer,
      muted,
      isLoading,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, scale, nowrap, pointer, muted }),
          className,
        )}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';

type LinkButtonProps = {
  href: string;
  target?: string;
  rel?: string;
  isLoading?: boolean;
  disabled?: boolean;
  as?: ComponentType;
} & ComponentPropsWithoutRef<'a'> &
  VariantProps<typeof buttonVariants>;

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      className,
      variant,
      size,
      scale,
      nowrap,
      pointer,
      muted,
      darkMuted,
      isLoading,
      href,
      target,
      rel,
      as,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = as ?? 'a';
    return (
      <Component
        className={cn(
          buttonVariants({
            variant,
            size,
            scale,
            nowrap,
            pointer,
            muted,
            darkMuted,
          }),
          className,
        )}
        ref={ref}
        disabled={isLoading}
        href={href}
        target={target}
        rel={rel}
        {...props}
      >
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Component>
    );
  },
);
LinkButton.displayName = 'LinkButton';

export { Button, LinkButton, buttonVariants };
