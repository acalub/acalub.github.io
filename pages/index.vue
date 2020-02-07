<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="(product,index) in products" :key="index" class="d-flex child-flex" cols="12" sm="4">
        <Product
          v-on:show-carousel="showCarousel"
          :productHeroImageSrc="product.heroImageSrc"
          :id="product.id"
          :name="product.name"
          :link="product.link"
          :reviews="product.reviews"
          :price="product.prices">
        </Product>
        </v-col>
      </v-row>
      <v-overlay :value="overlay">
        <Carousel v-on:close="overlay=false" :productId="productId"/>
      </v-overlay>
  </v-container>
</template>

<script>
import { PRODUCTS, PRODUCT_BY_ID } from '@/lib/types';
import { mapGetters } from 'vuex';
import Product from '@/components/product';
import Carousel from '@/components/carousel';
export default {
  data() {
    return {
      overlay: false,
      productId: null
    };
  },
  components: {
    Product,
    Carousel
  },
  computed: {
    ...mapGetters([PRODUCTS])
  },
  methods: {
    showCarousel(id) {
      this.productId = id;
      this.overlay = true;
    }
  }
}
</script>
