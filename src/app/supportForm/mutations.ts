import { ISupportFormState } from './state';

export interface ISupportFormMutations {
  SET_INCREMENT_PENDING(state: ISupportFormState, pending: boolean): void;

  SET_DECREMENT_PENDING(state: ISupportFormState, pending: boolean): void;

  SET_COUNT(state: ISupportFormState, count: number): void;

  SET_APP_INFO(state: ISupportFormState, appInfo: string): void;
}

export const SupportFormMutations: ISupportFormMutations = {
  SET_INCREMENT_PENDING: (state: ISupportFormState, pending: boolean) => {
    state.incrementPending = pending;
  },
  SET_DECREMENT_PENDING: (state: ISupportFormState, pending: boolean) => {
    state.decrementPending = pending;
  },
  SET_COUNT:             (state: ISupportFormState, count: number) => {
    state.count = count;
  },
  SET_APP_INFO:          (state: ISupportFormState, appInfo: string) => {
    state.appInfo = appInfo;
  },
};
