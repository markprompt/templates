/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner';

export const loggedToast = {
  loading: (...args: any) => {
    console.log(...args);
    return toast.loading(args);
  },
  success: (...args: any) => {
    console.log(...args);
    return toast.success(args);
  },
};
