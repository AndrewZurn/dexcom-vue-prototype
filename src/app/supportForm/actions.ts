import { ActionContext } from 'vuex';
import { ISupportFormState } from './state';
import { IState }        from '../state';
import { HttpService }   from '../shared/services/HttpService';
import { AxiosResponse } from 'axios';

export interface ISupportFormResponse {
  count: number;
}

export interface ISupportFormActions {
  increment(context: ActionContext<ISupportFormState, IState>): Promise<any>;

  decrement(context: ActionContext<ISupportFormState, IState>): Promise<any>;
}

export const SupportFormActions: ISupportFormActions = {
  increment({ commit, state }: ActionContext<ISupportFormState, IState>): Promise<any> {
    commit('SET_INCREMENT_PENDING', true);

    return HttpService
    .put('/counter/increment', { count: state.count })
    .then((res: AxiosResponse<ISupportFormResponse>) => {
      commit('SET_COUNT', res.data.count);
      commit('SET_INCREMENT_PENDING', false);
    })
    .catch(() => {
      commit('SET_INCREMENT_PENDING', false);
    });
  },
  decrement({ commit, state }: ActionContext<ISupportFormState, IState>): Promise<any> {
    commit('SET_DECREMENT_PENDING', true);

    return HttpService
    .put('/counter/decrement', { count: state.count })
    .then((res: AxiosResponse<ISupportFormResponse>) => {
      commit('SET_COUNT', res.data.count);
      commit('SET_DECREMENT_PENDING', false);
    })
    .catch(() => commit('SET_DECREMENT_PENDING', false));
  },
};
