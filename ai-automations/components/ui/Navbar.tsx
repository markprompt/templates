/* eslint-disable @next/next/no-img-element */
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';
import { CheckIcon, ChevronDown } from 'lucide-react';
import Image from 'next/image';

import { Logo } from './Logo';

export const Navbar = ({
  className,
  showLogs,
  setShowLogs,
  clearData,
}: {
  className?: string;
  showLogs: boolean;
  setShowLogs: (show: boolean) => void;
  clearData: () => void;
}) => {
  return (
    <div
      className={clsx(
        className,
        'px-4 py-4 w-full shadow-lg bg-white flex flex-row gap-4 items-center flex-none',
      )}
    >
      <div className="flex-nonw flex flex-row gap-3 items-center">
        <Logo className="w-8 h-8" />
      </div>
      <div className="flex-grow" />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="select-none flex flex-row gap-1.5 items-center cursor-pointer outline-none hover:opacity-70 transition duration-300">
            <div className="rounded-full overflow-hidden">
              <Image
                src="/avatar.png"
                alt="Alexa Kendricks"
                width={28}
                height={28}
                priority
              />
            </div>
            <ChevronDown className="text-black w-5 h-5 flex-none" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
            <DropdownMenu.Item
              className="DropdownMenuItem"
              onClick={() => {
                clearData();
              }}
            >
              Reset data
            </DropdownMenu.Item>
            <DropdownMenu.CheckboxItem
              className="DropdownMenuCheckboxItem"
              checked={showLogs}
              onCheckedChange={setShowLogs}
            >
              <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              Show logs
            </DropdownMenu.CheckboxItem>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};
