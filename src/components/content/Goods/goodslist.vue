<template>
  <div class="goods">
    <GoodsLIstItem v-for="item in goods" :key="item.index" :goods-item="item" />
  </div>
</template>

<script>
import GoodsLIstItem from './goodslistitem.vue'

export default {
  components:{
    GoodsLIstItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
.goods{
  display: flex;
  flex-wrap:wrap;
  justify-content: space-around;
}
</style>