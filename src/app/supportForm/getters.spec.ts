import { SupportFormGetters }      from './getters';
import { SupportFormDefaultState, ISupportFormState } from './state';

describe('SupportFormGetters', () => {
  let testState: ISupportFormState;

  beforeEach(() => {
    testState = SupportFormDefaultState();
  });

  test('it should get the count', () => {
    expect(SupportFormGetters.count(testState)).toBe(0);
  });

  test('it should get increment pending', () => {
    expect(SupportFormGetters.incrementPending(testState)).toBe(false);
  });

  test('it should get decrement pending', () => {
    expect(SupportFormGetters.decrementPending(testState)).toBe(false);
  });

});
