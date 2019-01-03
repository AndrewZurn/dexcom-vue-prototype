import { ISupportFormState } from './state';

export interface ISupportFormGetters {
  incrementPending(state: ISupportFormState): boolean;
  decrementPending(state: ISupportFormState): boolean;
  count(state: ISupportFormState): number;
}

export const SupportFormGetters: ISupportFormGetters = {
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
