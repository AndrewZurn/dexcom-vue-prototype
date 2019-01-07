import { ISupportFormState } from './state';

export interface ISupportFormGetters {
  appInfo(state: ISupportFormState): string;
  incrementPending(state: ISupportFormState): boolean;
  decrementPending(state: ISupportFormState): boolean;
  count(state: ISupportFormState): number;
}

export const SupportFormGetters: ISupportFormGetters = {
  appInfo(state: ISupportFormState): string {
    return state.appInfo;
  },
  incrementPending(state: ISupportFormState): boolean {
    return state.incrementPending;
  },
  decrementPending(state: ISupportFormState): boolean {
    return state.decrementPending;
  },
  count(state: ISupportFormState): number {
    return state.count;
  },
};
