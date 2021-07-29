<template>
  <div @click="itemClick">
    <div v-if = "!isActive">
      <slot name='item-icon'></slot>
    </div>
    <div v-else>
      <slot name='item-icon-active'></slot>
    </div>
    <div :style="isActiveColor">
      <slot name='text'></slot>
    </div>
  </div>
  
</template>

<script>
export default {
  props:{
      activecolor:{
      type:String,
      default:'red'
      },
      path:String
    },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    isActiveColor(){
     return this.isActive?{color:this.activecolor}:{}
    }
    },
  data(){
    return{
      // isActive:true
    }
  },
  methods:{
    itemClick(){
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
</style>