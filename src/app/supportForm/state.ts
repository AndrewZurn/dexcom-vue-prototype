export interface ISupportFormState {
  incrementPending: boolean;
  decrementPending: boolean;
  count: number;
}

export const SupportFormDefaultState = (): ISupportFormState => {
  return {
    incrementPending: false,
    decrementPending: false,
    count:            0,
  };
};
