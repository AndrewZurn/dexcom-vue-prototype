import { ActionContext } from 'vuex';
import { ISupportFormState } from './state';
import { IState }        from '../state';
import { HttpService }   from '../shared/services/HttpService';
import { AxiosResponse } from 'axios';

export interface ISupportFormResponse {
  count: number;
}

export interface ISupportFormTextResponse {
  text: string;
}

export interface ISupportFormActions {
  getInfo(context: ActionContext<ISupportFormState, IState>): Promise<any>;

  increment(context: ActionContext<ISupportFormState, IState>): Promise<any>;

  decrement(context: ActionContext<ISupportFormState, IState>): Promise<any>;
}

export const SupportFormActions: ISupportFormActions = {
  getInfo({ commit, state }: ActionContext<ISupportFormState, IState>): Promise<any> {
    commit('SET_APP_INFO_LOADING', true);

    return HttpService.get('https://api.dexcom.com/info')
      .then((res: AxiosResponse<ISupportFormResponse>) => {
        commit('SET_APP_INFO_LOADING', false);
        commit('SET_APP_INFO', res.data);
      })
      .catch(() => commit('SET_APP_INFO_LOADING', false));
  },
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
