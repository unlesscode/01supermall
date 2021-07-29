<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      scroll:null
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })
    this.scroll.on('scroll',(position) =>{
      this.$emit('scroll',position)
    })
    this.scroll.on('pullingUp',()=>{
      this.$emit("pulling")
    })
  },
  methods : {
    scrollTo(x,y,time=500){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      // console.log("小笨蛋")
       this.scroll.refresh()
    }
  }
}
</script>

<style>

</style>