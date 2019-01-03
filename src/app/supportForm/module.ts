import { Module }                             from 'vuex';
import { SupportFormDefaultState, ISupportFormState } from './state';
import { SupportFormActions }                     from './actions';
import { IState }                                 from '../state';
import { SupportFormGetters }                     from './getters';
import { SupportFormMutations }                   from './mutations';

export const SupportFormModule: Module<ISupportFormState, IState> = {
  namespaced: true,
  actions:    {
    ...SupportFormActions,
  },
  getters:    {
    ...SupportFormGetters,
  },
  state:      {
    ...SupportFormDefaultState(),
  },
  mutations:  {
    ...SupportFormMutations,
  },
};
