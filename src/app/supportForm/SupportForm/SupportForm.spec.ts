import { createLocalVue, mount }               from '@vue/test-utils';
import Vuex, { ActionTree, GetterTree, Store } from 'vuex';
import SupportForm                                 from './SupportForm.vue';
import { SupportFormGetters, ISupportFormGetters }     from '../getters';
import { SupportFormDefaultState, ISupportFormState }  from '../state';
import { SupportFormActions, ISupportFormActions }     from '../actions';
import { i18n }                                from '../../shared/plugins/i18n/i18n';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('SupportForm.vue', () => {
  let store: Store<ISupportFormState>;
  let getters: GetterTree<ISupportFormState, ISupportFormGetters>;
  let actions: ActionTree<ISupportFormState, ISupportFormActions>;
  let state: ISupportFormState;

  beforeEach(() => {
    getters = {
      ...SupportFormGetters,
    };
    actions = {
      ...SupportFormActions,
      increment: jest.fn(),
      decrement: jest.fn(),
    };
    state = {
      ...SupportFormDefaultState(),
    };

    store = new Vuex.Store({
                             modules: {
                               supportForm: {
                                 namespaced: true,
                                 getters,
                                 actions,
                                 state,
                               },
                             },
                           } as any);
  });

  test('renders component', () => {
    const wrapper = mount(SupportForm, {
      store,
      localVue,
      i18n,
    });

    expect(wrapper.find('h1').text()).toBe('SupportForm');
  });

  test('should increment and decrement', () => {
    const wrapper: any = mount(SupportForm, {
      store,
      localVue,
      i18n,
    });

    wrapper.vm.increment();
    expect(actions.increment).toHaveBeenCalled();

    wrapper.vm.decrement();
    expect(actions.decrement).toHaveBeenCalled();
  });

  test('dispatches action on the server', () => {
    store.dispatch = jest.fn();

    SupportForm.prefetch({ store });

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(`supportForm/increment`);
  });

});
