import { AppDefaultState, IAppState }         from './app/state';
import { CounterDefaultState, ICounterState } from './counter/state';
import { SupportFormDefaultState, ISupportFormState }         from './supportForm/state';

export interface IState {
  [key: string]: any;

  app?: IAppState;
  counter?: ICounterState;
  supportForm?: ISupportFormState;
}

export const DefaultState: IState = {
  app:     {
    ...AppDefaultState(),
  },
  counter: {
    ...CounterDefaultState(),
  },
  supportForm: {
    ...SupportFormDefaultState(),
  },
};
