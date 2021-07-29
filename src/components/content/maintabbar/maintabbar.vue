<template>
  <TabBar class="tab-bar">
      <TabBarItem path='/home' >
        <img slot="item-icon" src="~assets/img/tabbar/home.svg">
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg">
        <div slot="text">首页</div>
      </TabBarItem>
      <TabBarItem path='/category' > 
        <img slot="item-icon" src="~assets/img/tabbar/category.svg">
        <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg">
        <div slot="text">分类</div>
      </TabBarItem>
      <TabBarItem path='/shopcart' >
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg">
        <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg">
        <div slot="text">购物车</div>
      </TabBarItem>
      <TabBarItem path='/profile' >
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg">
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg">
        <div slot="text">我的</div>
      </TabBarItem>
    </TabBar>
</template>

<script>
import TabBar from 'components/common/tabbar/Tabbar'
import TabBarItem from 'components/common/tabbar/Tabbaritem'
export default {
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
.tab-bar img{
    display: block;
    width: 24px;
    height: 24px;
    margin:0 auto;
  }
</style>