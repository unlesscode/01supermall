<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <tab-control 
    :titles="['流行','新款','精选']" 
    @tabClick='tabClick'
    ref="TabBarControl1"
    class="tabbarcontrol"
    v-show="isTabFix"
    ></tab-control>

    <scroll class="wrapper" 
    ref="scroll" 
    :probe-type="3" 
    @scroll='contentScroll'
    :pull-up-load='true'
    @pulling="loadMore"
    >
    <home-swiper :banners="banners" @imageDownLoad='SwiperDownLoadOk'></home-swiper>
    <recommend-view :recommends="recommends" />
    <feature-view></feature-view>
    <tab-control 
    :titles="['流行','新款','精选']" 
    @tabClick='tabClick'
    ref="TabBarControl2"
    ></tab-control>
    <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="topClick"  v-show="IsHave"></back-top>
    
  </div>
</template>

<script>
import HomeSwiper from './children/homeSwiper.vue'
import RecommendView from './children/RecommendView.vue'
import FeatureView from './children/fetureView.vue'


import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/TabControl/tabcontrol'
import GoodsList from 'components/content/Goods/goodslist'
import Scroll from 'components/common/Scroll/scroll'

import {getHomeMultiData , getHomeGoods} from 'network/home.js'
import {itemListenerMIX, getTopBack} from "common/mixin.js"
import {debounse} from 'common/utils.js'
export default {
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,


  
    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins:[itemListenerMIX , getTopBack],
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page: 0,  list: []},
        'new':{page: 0,  list: []},
        'sell':{page: 0,  list: []},
      },
      currentType:'pop',
      IsHave:false,
      TabOffsetTop:0,
      isTabFix:false
    }
  },
  created(){
    this.getHomeMultiData()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted(){
  },
  deactivated(){
    this.$bus.$off("itemImageLoad",this.itemListener)
  },
  methods:{
    SwiperDownLoadOk(){
      this.TabOffsetTop =this.$refs.TabBarControl2.$el.offsetTop
    },
    /* 
    事件监听相关方法
     */
    tabClick(index){
      switch (index){
        case 0:
          this.currentType='pop'
          break;
        case 1:
          this.currentType='new'
          break;
        case 2:
          this.currentType='sell'
          break;
      }
      this.$refs.TabBarControl2.currentIndex = index
      this.$refs.TabBarControl1.currentIndex = index
    },
    contentScroll(position){
      this.IsHave = (-position.y) >1000
      this.isTabFix = (-position.y) > this.TabOffsetTop
    },
     loadMore(){
     this.getHomeGoods(this.currentType)
    },
    // /*
    // *网络请求相关方法
    // */
    getHomeMultiData(){
      getHomeMultiData().then(res => {
      this.banners = res.data.banner.list;
      this.recommends =res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page+1 
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list) 
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
.home{
  height:100vh ;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
}
.tabbarcontrol{
  position: relative;
  z-index: 9;
}
.wrapper{
  position: absolute;
  overflow: auto;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>