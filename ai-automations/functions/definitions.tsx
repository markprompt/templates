import { ChatViewTool } from '@markprompt/react/dist/chat/store';

import { processCorporatePlanActivation } from './corporate';
import { processClassCreditInquiry } from './credits';
import { processReferralVerification } from './referral';
import { processRefund } from './refund';
import { getWeatherInCity } from './weather';
import { defaultData } from '../lib/constants';
import { Data } from '../lib/types';

export const functions = (data: Data): ChatViewTool[] => {
  return [
    {
      tool: {
        type: 'function',
        function: {
          name: 'processRefund',
          description:
            'Cancel auto-renewal and process a refund for a customer',
          parameters: {
            type: 'object',
            properties: {
              userId: {
                type: 'string',
                description: 'The username or email address of the user',
              },
              billingCycleEnd: {
                type: 'string',
                description: 'The date the billing cycle ends',
              },
            },
            required: ['userId', 'billingCycleEnd'],
          },
        },
      },
      call: processRefund(data.user || defaultData.user),
      requireConfirmation: true,
      // confirmationMessage: () => (
      //   <>
      //     Please confirm that you want to cancel auto-renewal and proceed with a
      //     refund.
      //   </>
      // ),
    },
    {
      tool: {
        type: 'function',
        function: {
          name: 'processReferralVerification',
          description:
            'Verify if a referral was successful and the user is eligible for a reward',
          parameters: {
            type: 'object',
            properties: {
              userEmail: {
                type: 'string',
                description: 'The username or email address of the user',
              },
              friendEmail: {
                type: 'string',
                description: 'The email of the referred friend',
              },
            },
            required: ['friendEmail', 'userId', 'referralCode'],
          },
        },
      },
      call: processReferralVerification,
      // confirmationMessage: (args) => (
      //   <>
      //     Just to make sure I got this right. You want to claim credits for the
      //     referral of <strong>{(args?.friendEmail as string) || ''}</strong>, is
      //     that correct?
      //   </>
      // ),
    },
    {
      tool: {
        type: 'function',
        function: {
          name: 'processCorporatePlanActivation',
          description: `Activate a user account and assign a corporate plan to the account.`,
          parameters: {
            type: 'object',
            properties: {
              userId: {
                type: 'string',
                description: 'The username or email address of the user',
              },
              corporateName: {
                type: 'string',
                description: 'The corporate name to which the plan belongs',
              },
            },
            required: ['userId', 'corporateName'],
          },
        },
      },
      call: processCorporatePlanActivation,
      // confirmationMessage: (args) => (
      //   <>
      //     Do you want to activate your user account and assign a{' '}
      //     <strong>{(args?.corporateName as string) || ''}</strong> corporate
      //     plan to the account?
      //   </>
      // ),
    },
    {
      tool: {
        type: 'function',
        function: {
          name: 'processClassCreditInquiry',
          description: 'Retrieve the number of credits a class costs',
          parameters: {
            type: 'object',
            properties: {
              className: {
                type: 'string',
                description: 'The name of the class',
              },
            },
            required: ['userId', 'classId'],
          },
        },
      },
      call: processClassCreditInquiry,
      requireConfirmation: false,
    },
    {
      tool: {
        type: 'function',
        function: {
          name: 'getWeatherInCity',
          description: 'Retrieve the weather in a city',
          parameters: {
            type: 'object',
            properties: {
              city: {
                type: 'string',
                description: 'The city name',
              },
            },
            required: ['city'],
          },
        },
      },
      call: getWeatherInCity,
      requireConfirmation: false,
    },
  ] satisfies ChatViewTool[];
};
