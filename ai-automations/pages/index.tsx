/* eslint-disable @next/next/no-img-element */
import { Markprompt } from '@markprompt/react';
import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp, ChevronsDown } from 'lucide-react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { Button } from '../components/ui/Button';
import { Navbar } from '../components/ui/Navbar';
import { functions } from '../functions/definitions';
import { companyData, defaultData } from '../lib/constants';
import { loggedToast } from '../lib/toast';
import { Data } from '../lib/types';
import { timeout } from '../lib/utils';

const inter = Inter({ subsets: ['latin'] });

const SelectItem = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ children, ...props }: any, forwardedRef) => {
    return (
      <Select.Item className="SelectItem" {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-2 w-8 items-center justify-center">
          <Check className="w-4 h-4 text-blue-500" />
        </Select.ItemIndicator>
      </Select.Item>
    );
  },
);

SelectItem.displayName = 'SelectItem';

export const Field = ({
  label,
  value: _value,
  onChange,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}) => {
  const [value, setValue] = useState(_value);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-neutral-500">{label}</p>
      <input
        type="text"
        className="base-input p-2 border border-neutral-200 rounded"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e.target.value);
        }}
      />
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<Data | undefined>();
  const [isSaving, setSaving] = useState(false);
  const [showLogs, setShowLogs] = useState(true);

  useEffect(() => {
    try {
      const demoDataString = localStorage.getItem('markprompt-demo-data');
      if (demoDataString) {
        const demoData = JSON.parse(demoDataString);
        setData(demoData);
      } else {
        setData(defaultData);
        // First time, store locally to make available globally, e.g. in the
        // Zendesk hooks.
        localStorage.setItem(
          'markprompt-demo-data',
          JSON.stringify(defaultData),
        );
      }
    } catch {
      // Do nothing
    }
  }, []);

  const saveData = useCallback(async () => {
    if (!data) {
      return;
    }
    setSaving(true);
    localStorage.setItem('markprompt-demo-data', JSON.stringify(data));
    await timeout(500);
    setSaving(false);
    loggedToast.success('Settings have been saved');
  }, [data]);

  const clearData = useCallback(() => {
    localStorage.removeItem('markprompt');
    localStorage.removeItem('markprompt-zendesk-store');
    localStorage.removeItem('markprompt-demo-data');
    setData(defaultData);
    loggedToast.success('Data has been reset');
    setTimeout(() => {
      router.reload();
    }, 2000);
  }, [router]);

  if (!data) {
    return <></>;
  }

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      <Head>
        <title>Settings</title>
        <meta charSet="utf-8" />
      </Head>

      <Markprompt
        projectKey={process.env.NEXT_PUBLIC_PROJECT_API_KEY!}
        chat={{
          enabled: true,
          assistantId: '...',
          tools: functions(data),
          // ToolCallsConfirmation,
        }}
        references={{ display: 'end' }}
        showBranding={false}
      />

      <Navbar
        showLogs={showLogs}
        setShowLogs={setShowLogs}
        clearData={clearData}
        className="sticky"
      />
      <div className="grid grid-cols-3 flex-grow w-full pr-48">
        <div className="h-full bg-neutral-50 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div />
            <div className="pt-16 flex flex-col gap-6 text-[13px] font-medium text-neutral-600">
              <Image
                className="rounded-full overflow-hidden border mb-8"
                src="/avatar.png"
                alt="Alexa Doe"
                width={100}
                height={100}
                priority
              />

              <p>Account</p>
              <p className="text-black -ml-2 px-2 bg-neutral-100 rounded-md font-semibold py-2">
                Personal Information
              </p>
              <p>Contact</p>
              <p>Billing</p>
              <p>Recent charges</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 pl-8 pt-20 pb-8">
          <h2 className="text-3xl font-semibold">Personal Information</h2>
          <div className="grid grid-cols-2 gap-4 mt-8 text-sm">
            <Field
              label="First name"
              value={data.user.firstName}
              onChange={(value) => {
                setData({ ...data, user: { ...data.user, firstName: value } });
              }}
            />
            <Field
              label="Last name"
              value={data.user.lastName}
              onChange={(value) => {
                setData({ ...data, user: { ...data.user, lastName: value } });
              }}
            />
            <Field
              label="Primary email"
              value={data.user.email}
              onChange={(value) => {
                setData({ ...data, user: { ...data.user, email: value } });
              }}
            />
            <Field label="Secondary email" value="" />
            <Field
              label="Username"
              value={data.user.username}
              onChange={(value) => {
                setData({ ...data, user: { ...data.user, username: value } });
              }}
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-neutral-500 text-sm">Account type</p>
            <div className="text-black font-medium">
              <Select.Root
                defaultValue={data.user.accountType}
                onValueChange={(value) => {
                  setData({
                    ...data,
                    user: { ...data.user, accountType: value },
                  });
                }}
              >
                <Select.Trigger
                  className="base-button flex flex-row gap-2 items-center rounded-md bg-neutral-100 hover:bg-neutral-200 px-3 py-2 border border-neutral-200 hover:border-neutral-300 text-sm"
                  aria-label="Account type"
                >
                  <Select.Value placeholder="Select account type…" />
                  <Select.Icon>
                    <ChevronDown className="w-4 h-4 text-neutral-800" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="SelectContent">
                    <Select.ScrollUpButton className="SelectScrollButton">
                      <ChevronUp />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="text-sm">
                      <Select.Group>
                        <SelectItem value="Free">Free</SelectItem>
                        <SelectItem value="Starter">Starter</SelectItem>
                        <SelectItem value="Accelerate">Accelerate</SelectItem>
                        <SelectItem value="Ultimate">Ultimate</SelectItem>
                        <SelectItem value="Ultimate Plus">
                          Ultimate Plus
                        </SelectItem>
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className="SelectScrollButton">
                      <ChevronsDown />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>
          <div className="w-full h-px bg-neutral-200 col-span-2 mt-8" />
          <div className="flex items-start mt-8">
            <Button
              className="relative px-4 py-3 rounded-md bg-black text-sm font-medium text-white text-center base-button"
              onClick={saveData}
              loading={isSaving}
              noStyle
            >
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

// function ToolCallsConfirmation(props: ConfirmationProps) {
//   return '';
// }
