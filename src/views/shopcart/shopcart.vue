<template>
  <div >
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车({{carLength}})
      </div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import {mapGetters} from 'vuex'
import cartList from './chidcart/cartList.vue'
import cartBottomBar from './chidcart/cartBottomBar.vue'

export default {
  components:{
    NavBar,
    cartList,
    cartBottomBar
  },
  computed:{
    ...mapGetters(['carLength','cartList'])
  }
}
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color:#fff
}
</style>