<template>
  <div class="toast" v-show="isShow">
    {{messages}}
  </div>
</template>

<script>
export default {
  props:{
    // messages:{
    //   type:String,
    //   default:''
    // },
    // show:{
    //   type:Boolean,
    //   default:false
    // }
  },
  data(){
    return {
      messages:'',
      isShow:false
    }
  },
  methods:{
    show(messages="你好啊" , duration = 2000){
      this.messages = messages
      this.isShow = true
      setTimeout(() => {
        this.isShow = false 
        this.messages = ''
      }, duration);
    }
  }
}
</script>

<style>
  .toast{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50% , -50%);
    background-color:rgba(0,0,0, 0.75) ;
    padding: 8px 10px;
    color: #fff;
    z-index: 11;
  }
</style>