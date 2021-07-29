<template>
  <div class="tabcontrol">
    <div v-for="(item,index) in titles" 
    :key="index" 
    :class="{active:index === currentIndex}" 
    class="tab-item"
    @click="itemClick(index)"
    
    >
       <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentIndex:0,
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index
      this.$emit('tabClick',index)
    },
  }
}
</script>

<style>
.tabcontrol{
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  line-height: 40px;
  background-color: #fff;
}
.active{
  color: var(--color-high-text);
}
.tab-item span{
  padding: 5px;
}
.active span{
  border-bottom:3px solid var(--color-tint);
}
</style>