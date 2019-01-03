import { SupportFormMutations }                   from './mutations';
import { SupportFormDefaultState, ISupportFormState } from './state';

describe('SupportFormMutations', () => {
  let testState: ISupportFormState;

  beforeEach(() => {
    testState = SupportFormDefaultState();
  });

  test('it should set the count', () => {
    SupportFormMutations.SET_COUNT(testState, 1337);
    expect(testState.count).toBe(1337);
  });

  test('it should set increment pending', () => {
    SupportFormMutations.SET_INCREMENT_PENDING(testState, true);
    expect(testState.incrementPending).toBe(true);
  });

  test('it should set decrement pending', () => {
    SupportFormMutations.SET_DECREMENT_PENDING(testState, true);
    expect(testState.decrementPending).toBe(true);
  });

});
