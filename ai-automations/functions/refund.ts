/* eslint-disable @typescript-eslint/no-unused-vars */
import { loggedToast } from '@/lib/toast';

import { UserInfo } from '../lib/types';
import { timeout } from '../lib/utils';

/**
 * Check the user's eligibility for a refund using your decision tree available in the CX.
 * @param {UserInfo} userInfo - The user's information.
 * @returns {Promise<boolean>} - Promise object represents if user is eligible or not for a refund.
 */
async function checkRefundEligibility(userInfo: UserInfo): Promise<boolean> {
  // Implementation logic to check refund eligibility goes here.
  return true;
}

/**
 * Process the refund through Stripe payment system.
 * @param {UserInfo} userInfo - The user information.
 * @param {Date} billingCycleEnd - The end date of the billing cycle.
 * @returns {Promise<boolean>} - Promise object represents if the refund was successfully processed.
 */
async function processRefundThroughStripe(
  userInfo: UserInfo,
  billingCycleEnd: string,
): Promise<boolean> {
  // Implementation logic to process refund through Stripe goes here.
  return true;
}

/**
 * Process a refund request for a user.
 * @param {string} userId - The unique identifier of the user.
 * @param {string} billingCycleEnd - The end date of the billing cycle.
 * @returns {Promise<string>} - Promise object represents a message indicating if the refund request was approved or denied.
 */
export const processRefund =
  (userInfo: UserInfo) =>
  async (args: string): Promise<string> => {
    const { userId, billingCycleEnd } = JSON.parse(args) as {
      userId: string;
      billingCycleEnd: string;
    };

    loggedToast.loading(`Retrieving user info for ${userInfo.username}.`);
    await timeout(2000);

    loggedToast.loading(
      `Checking refund eligibility for ${userInfo.username}.`,
    );
    const refundEligibility = await checkRefundEligibility(userInfo);

    await timeout(2000);

    loggedToast.success(`${userInfo.username} is elligible for a refund.`);

    await timeout(2000);

    if (refundEligibility) {
      loggedToast.loading(
        `Processing refund on Stripe for the billing cycle ending at ${billingCycleEnd}.`,
      );
      const isRefundProcessed = await processRefundThroughStripe(
        userInfo,
        billingCycleEnd,
      );
      await timeout(3000);

      loggedToast.success('Done processing refund.');
      if (isRefundProcessed) {
        return 'Refund request approved. The refund will be credited back to your original payment method.';
      } else {
        return 'Refund request denied. Please contact customer support for further assistance.';
      }
    }

    return 'Refund request denied. You are not eligible for a refund.';
  };
