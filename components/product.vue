<template>
  <v-card flat tile class="product">
    <v-img class="img" :src="productHeroImageSrc" aspect-ratio="1"></v-img> 
    <div class="imgAccent" :style="{ 'background-image': productHeroImage }"></div>
    <div class="details">
      <div><a :href="link" :title="name"><h4>{{name}}</h4></a></div>
      <div class="d-flex price-reviews">
        <div class="flex-grow-1">{{msrp}}</div>
        <div class="flex-grow-1">
          <v-icon small v-for="(star, index) in stars" :key="index" :class>mdi-star</v-icon>
        </div>
      </div>
    </div>
  </v-card>
</template>
<script>

export default {
  props: ['productHeroImageSrc', 'name', 'link', 'price', 'reviews'],
  computed: {
    stars() {
      return 5;
    },
    msrp() {
      return `$${this.price.low}-$${this.price.high}`;
    },
    productHeroImage() {
      return `url(${this.productHeroImageSrc}) !important`;
    }
  }
}
</script>
<style lang="scss" scoped>
.price-reviews {
  & > div:last-child {
    text-align: right;
  }
}
.imgAccent {
  height: 10px;
  background-position: left bottom;
}
.img {
  border-radius: 0px 0px 10px;
}
.product {
  border:1px solid #999;
  border-radius: 10px;
  box-shadow: 0px 0px 5px #AAA;
  & > .details {
    position: relative;
    margin-top: -10px;
    padding: 15px 5px 20px 5px;
    z-index:1;
    height: 75px;
    background-color: white;
    border-radius: 10px 0px 0px 0px;
    & > div:last-child {
      font-size: 90%;
      color: #666;
    }
  }
}
.details h4 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
