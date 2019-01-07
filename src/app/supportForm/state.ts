export interface ISupportFormState {
  incrementPending: boolean;
  decrementPending: boolean;
  count: number;
  appInfo: string;
}

export const SupportFormDefaultState = (): ISupportFormState => {
  return {
    incrementPending: false,
    decrementPending: false,
    count:            0,
    appInfo:          '',
  };
};
