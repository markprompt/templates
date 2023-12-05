import { processCorporatePlanActivation } from './corporate';
import { processClassCreditInquiry } from './credits';
import { processReferralVerification } from './referral';
import { processRefund } from './refund';
import { defaultData } from '../lib/constants';
import { FunctionDefinitionWithFunction } from '../lib/react';
import { Data } from '../lib/types';

export const functions = (data: Data): FunctionDefinitionWithFunction[] => {
  return [
    {
      actual: processRefund(data.user || defaultData.user),
      name: 'processRefund',
      description: 'Cancel auto-renewal and process a refund for a customer',
      confirmationMessage: () => (
        <>
          Please confirm that you want to cancel auto-renewal and proceed with a
          refund.
        </>
      ),
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
    {
      actual: processReferralVerification,
      name: 'processReferralVerification',
      description:
        'Verify if a referral was successful and the user is eligible for a reward',
      confirmationMessage: (args) => (
        <>
          Just to make sure I got this right. You want to claim credits for the
          referral of <strong>{(args?.friendEmail as string) || ''}</strong>, is
          that correct?
        </>
      ),
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
    {
      actual: processCorporatePlanActivation,
      name: 'processCorporatePlanActivation',
      description: `Activate a user account and assign a corporate plan to the account.`,
      confirmationMessage: (args) => (
        <>
          Do you want to activate your user account and assign a{' '}
          <strong>{(args?.corporateName as string) || ''}</strong> corporate
          plan to the account?
        </>
      ),
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
    {
      actual: processClassCreditInquiry,
      name: 'processClassCreditInquiry',
      description: 'Retrieve the number of credits a class costs',
      autoConfirm: true,
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
  ];
};
