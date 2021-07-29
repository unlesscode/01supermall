<template>
  <swiper class="detailSwipper">
    <swiper-item v-for="(item,index) in topImages" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper ,SwiperItem } from 'components/common/swiper/index.js'
export default {
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    topImages:Array,
    default(){
      return []
    }
  }
}
</script>

<style scoped>
.detailSwipper{
  height: 300px;
  overflow: hidden;
}
</style>