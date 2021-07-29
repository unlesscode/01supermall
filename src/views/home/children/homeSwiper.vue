<template>
  <swiper>
      <swiper-item v-for="item in banners" :key='item.image' >
        <a :href="item.link">
          <img :src="item.image" alt="" @load = "imageInTabControl">
        </a>
      </swiper-item>
  </swiper>
</template>

<script>
import {Swiper ,SwiperItem} from 'components/common/swiper/index.js'
export default {
  data(){
    return{
      isEmit:true
    }
  },
  props:{
      banners:{
        type:Array,
      default(){
        return []
      }
    }   
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageInTabControl(){
      if(this.isEmit){
        
        this.$emit('imageDownLoad')
        this.isEmit=false
      }
    }
  }
}
</script>

<style>

</style>