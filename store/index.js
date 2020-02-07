import {
  PRODUCTS,
  SET_PRODUCTS,
  SERVER_INIT } from '@/lib/types';

import ProductAPI from '@/lib/product-api';
const productAPI = new ProductAPI();

export const state = () => ({
  groups: null,
  products: null,
});

export const mutations = {
  [SET_PRODUCTS](state, products) {
    state.groups = products.groups;
    state.products = products.groups.map((value, index) => ({ name: value.name, link: value.links.www, reviews: { total: value.reviews.reviewCount, average: value.reviews.averageRating}, prices: value.priceRange.selling, heroImageSrc: value.hero.href }));
  }
}

export const actions = {
  async [SERVER_INIT]({ commit }) {
    const products =  await productAPI.fetch();
    commit(SET_PRODUCTS, products);
  }
}

export const getters = {
  [PRODUCTS](state) {
    return state.products;
  }
}
