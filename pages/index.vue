<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="(product,index) in products" :key="index" class="d-flex child-flex" cols="12" sm="4">
        <Product :productHeroImageSrc="product.heroImageSrc" :name="product.name" :link="product.link" :reviews="product.reviews" :price="product.prices"></Product>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import { PRODUCTS } from '@/lib/types';
import { mapGetters } from 'vuex';
import Product from '@/components/product';
export default {
  components: {
    Product
  },
  computed: {
    ...mapGetters([PRODUCTS])
  },
}
</script>
