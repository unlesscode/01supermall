import {debounse} from 'common/utils.js'

import BackTop from 'components/common/backtop/backtop'

export const itemListenerMIX = {
  data(){
    return{
      itemListener:null
    }
  },
  mounted(){
    const refresh = debounse(this.$refs.scroll.refresh,50)
    this.itemListener = ()=>{
         refresh()
        }
    this.$bus.$on("itemImageLoad",this.itemListener)
  }
}

export const getTopBack = {
  components:{
    BackTop
  },
  data(){
    return {
      IsHave:false,
    }
  },
  methods:{
    topClick(){
      this.$refs.scroll.scrollTo(0,0)
    }
  }
}