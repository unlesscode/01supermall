<template>
  <div id="tab-bar">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name:'tabbar'
}
</script>

<style scoped>
  #tab-bar{
    width: 100%;
    height: 49px;
    background-color: #f6f6f6;
    display: flex;
    justify-content: space-around;
    position:fixed;
    z-index: 3;
    left: 0;
    right: 0;
    bottom:0;
    box-shadow: 0 -3px 2px rgba(100,100 ,100 , 0.2);
  }
 
  
</style>