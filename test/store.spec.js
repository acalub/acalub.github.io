import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import { SERVER_INIT, ENDPOINT, SET_PRODUCTS, PRODUCTS, PRODUCT_BY_ID } from '@/lib/types';
import { actions, mutations, getters } from '@/store';
import Product from '@/components/product';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(axios);
import fixture from './fixtures/products.json';

mock.onGet(ENDPOINT).reply(200, fixture);

const localVue = createLocalVue();

localVue.use(Vuex);
let m;
let store;

describe('store', () => {
  test('store', async () => {
    m = {
      [SET_PRODUCTS]: jest.fn()
    };

    store = new Vuex.Store({
      actions,
      mutations:m
    });
    await store.dispatch(SERVER_INIT);
    expect(m[SET_PRODUCTS]).toHaveBeenCalled();
  });

  test('store state', async () => {
    const s = new Vuex.Store({
      actions,
      mutations,
      getters
    });
    await s.dispatch(SERVER_INIT);
    expect(s.state.groups.length).toBe(10);
    expect(s.getters[PRODUCTS].length).toBe(10);
    expect(s.getters[PRODUCT_BY_ID]('foo')).toBeUndefined();
    expect(s.getters[PRODUCT_BY_ID]('belgian-linen-embroidery-duvet-cover-shams-white-flax-b3025').links.www).toBe('https://www.westelm.com/products/belgian-linen-embroidery-duvet-cover-shams-white-flax-b3025/');
  });

});
