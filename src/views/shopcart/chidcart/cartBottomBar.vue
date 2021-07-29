<template>
  <div class="check-bottom">
    <div class="check-left">
      <check-button 
      class="check-content" 
      :is-checked = "isSelectAll" 
      @click.native="checkClick"
      >
      </check-button>
      <span>全选</span>
    </div>
    <div class="check-center">
       <span>合计{{totalPrice}}</span>
    </div>
    <div class="check-right" @click="calcClick">
      去计算{{checkLength}}
    </div>
  </div>
</template>

<script>
import checkButton from 'components/content/checkButten/CheckButton'
import {mapGetters} from 'vuex'
export default {
  components:{
    checkButton
  },
  
  computed:{
    ...mapGetters(["cartList"]),
    totalPrice(){
      return "￥"+ this.cartList.filter(item =>{
        return item.checked
      }).reduce((prevalue,item)=>{
        return prevalue+item.price*item.count
      },0).toFixed(2)
    },
    checkLength(){
      return this.cartList.filter(item =>{
        return item.checked
      }).length
    },
    isSelectAll(){
      // return  !(this.cartList.filter(item =>  !item.checked).length)
      if(this.cartList.length === 0) return false;
      // return !this.cartList.find(item => !item.checked);
      for(let item of this.cartList){
        if(!item.checked){
          return false
        }
      }
      return true
    }
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){
        this.cartList.forEach(item => item.checked = false)
      }else{
        this.cartList.forEach(item => item.checked = true) 
      }
      // this.cartList.forEach(item =>　item.checked = !this.isSelectAll)
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show("请选择购买的商品")
      }
    }
  },
}
</script>

<style scoped>
  .check-bottom{
    height: 40px;
    background-color:#eee;
    position: relative;
    display: flex;
    align-items: center;
    vertical-align: bottom;
  }
  .check-left {
    width: 60px;
  }
  .check-right{
    width: 90px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: orange;
  }
  .check-center {
    flex: 1;
    margin-left: 20px;
  }
  .check-content{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px ;
    display: inline-block;
    vertical-align: bottom;
  }
</style>