<template>
  <div>
    <nav-bar >
      <div slot="left" class="back" @click="imgClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="navtitle">
        <div
        v-for="(item,index) in titleMessages" 
        :key="index"
        :class="{actived:index === currentIndex}"
        @click="titleClick(index)"
        >{{item}}
        </div>
      </div>
    </nav-bar>
    
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
  data(){
    return{
      titleMessages:['商品','参数','推荐','评论'],
      currentIndex:0
    }
    
  },
  components:{
    NavBar
  },
  methods:{
    titleClick(index){
      this.currentIndex = index 
      this.$emit('titleClick', index)
    },
    imgClick(){
      this.$router.back()
    }
  }
}
</script>

<style  scoped>
.navtitle{
  display: flex;
  justify-content: space-around;
  flex-wrap:nowrap ;
}
.back img{
  margin-top: 10px;
  margin-left: -30px;
  width: 20px;
  height: 20px;
}
.actived{
  color: var(--color-high-text);
}
</style>>
