<template>
  <div id="detail">
    <titlenav class="titlenav" @titleClick="titleClick" ref="title"></titlenav>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll= "getposition" >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="GimageLoad" />
      <detail-params-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentsInfo" />
      <goods-list ref="list" :goods="recommendInfo"/>
    </scroll>
      <back-top @click.native="topClick"  v-show="IsHave"></back-top>
      <detail-bottom-bar @addToCart="addToCart"  />
      <!-- <toast :messages="messages" :show="show"></toast> -->
  </div>
</template>

<script>
import titlenav from './childcom/title.vue'
import detailSwiper from './childcom/detaiSwiper.vue'
import detailBaseInfo from "./childcom/DetailBaseInfo.vue"
import detailShopInfo from './childcom/DetailShopInfo.vue'
import detailGoodsInfo from "./childcom/DetailGoodsInfo.vue"
import detailParamsInfo from './childcom/DetailParamInfo.vue'
import detailCommentInfo from "./childcom/DetailCommentInfo.vue"
import detailBottomBar from "./childcom/DetailBottomBar.vue"
import {itemListenerMIX , getTopBack} from "common/mixin.js"


import Scroll from 'components/common/Scroll/scroll'
// import Toast from 'components/common/toast/Toast'

import goodsList from "components/content/Goods/goodslist.vue"

import {getDetail ,getrecommend, Goods , Shop , GoodsParam} from 'network/detail.js'
import {debounse} from 'common/utils.js'
import { mapActions } from 'vuex'
export default {
  name:"Detail",
  components:{
    titlenav,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo,
    Scroll,
    detailGoodsInfo,
    detailParamsInfo,
    detailCommentInfo,
    detailBottomBar,
    goodsList,
    // Toast
 },
 mixins:[itemListenerMIX , getTopBack],
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentsInfo:{},
      recommendInfo:[],
      themeTopys:[],
      imageLoadTag:null,
      currentIndex:0,
      messages:'',
      show:false
    }
  },
  created(){
    this.iid = this.$route.query.iid
    getDetail(this.iid).then(res => {
      const data = res.result
      this.topImages = data.itemInfo.topImages
      this.goods = new Goods(data.itemInfo , data.columns , data.shopInfo.services)
      this.shop = new Shop(data.shopInfo)
      this.detailInfo = data.detailInfo


      this.paramInfo = new GoodsParam(data.itemParams.info , data.itemParams.rule)
      if(data.rate.cRate !== 0) this.commentsInfo = data.rate.list[0]
    }),
    getrecommend().then(res =>{
      this.recommendInfo = res.data.list
    });
    
      this.imageLoadTag = debounse(()=>{
      this.themeTopys = []
      this.themeTopys.push(0)
      this.themeTopys.push(this.$refs.params.$el.offsetTop)
      this.themeTopys.push(this.$refs.comment.$el.offsetTop)
      this.themeTopys.push(this.$refs.list.$el.offsetTop)
      this.themeTopys.push(Number.MAX_VALUE)
      },100)
  },
  updated(){
      
  },
  mounted(){
     
  },
  destroyed(){
    this.$bus.$off("itemImageLoad",this.refresh)
  },
    methods:{
      GimageLoad(){
        this.$refs.scroll.refresh()
         this.imageLoadTag()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0 , -this.themeTopys[index] ,200)
      },
      getposition(position){
        const positionY = -position.y
        let length =this.themeTopys.length
        for(let i=0; i<length-1;i++){
          if(this.currentIndex !== i && (positionY > this.themeTopys[i] && positionY < this.themeTopys[i+1])){
            this.currentIndex = i
            this.$refs.title.currentIndex =this.currentIndex 
          }
        }
        // console.log(positionY)
        // for(let i=0;i<length ;i++){
        //   if( this.currentIndex !==i 
        //   && ((i<length-1 && positionY >= this.themeTopys[i] 
        //   && positionY < this.themeTopys[i+1]) 
        //   || (i === length -1 && positionY >= this.themeTopys[i]))){
        //     this.currentIndex = i
        //     this.$refs.title.currentIndex = this.currentIndex
        //   }
        // }
        this.IsHave = (-position.y) >1000
      },
      ...mapActions({
        add123:'addCart'
      }),
      addToCart(){
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        this.add123(product).then(res =>{
          this.$toast.show(res)
        })
        // this.add123(product).then(res =>{
        //   this.messages = res
        //   this.show = true
        //   setTimeout(() => {
        //     this.show = false
        //     this.messages = ''
        //   }, 1500);
        // })
        // this.$store.dispatch( "addCart", product).then(res =>{
        //   console.log(res);
        // })
      }
    }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
  }
  .titlenav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 102px);
  }
</style>