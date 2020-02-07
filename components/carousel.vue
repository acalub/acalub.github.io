<template>
  <v-container fluid>
    <v-row dense no-gutters>
      <v-col cols="12" md="8" offset-md="2" lg="4" offset-lg="4" class="carousel-col carousel-close-col pa-0">
        <v-btn icon @click="$emit('close', true)">
          <v-icon style="color:black">mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="8" offset-md="2" lg="4" offset-lg="4" class="carousel-col carousel-body pt-0 px-2 pb-2">
        <h4 class="mb-2">{{name}}</h4>
				 <v-carousel
					cycle
					height="auto"
					hide-delimiter-background
					show-arrows-on-hover
				>
					<v-carousel-item
						v-for="(image, i) in images"
						:key="i"
						:src="image.href"
						aspect-ratio="1"
					>
					</v-carousel-item>
				</v-carousel> 
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {mapGetters} from 'vuex';
import { PRODUCT_BY_ID } from '@/lib/types';
import { decode } from '@/lib/utils';

export default {
  props: ['productId'],
  computed: {
    ...mapGetters([PRODUCT_BY_ID]),
		images() {
      return this[PRODUCT_BY_ID](this.productId).images || '';
		},
    name() {
      return decode(this[PRODUCT_BY_ID](this.productId).name) || '';
    }
  }
}

</script>
<style lang="scss">
  .v-carousel__item {
    border-radius: 0px 0px 10px 10px;
  }
  .v-overlay__content {
    width: 100% !important;
  }
  .carousel-col {
    background-color: white;
  }
  .carousel-close-col {
    border-radius: 10px 10px 0px 0px;
    text-align: right;
    color: black;
  }
  .carousel-body {
    border-radius: 0px 0px 10px 10px;
    color: green;
  }
</style>

