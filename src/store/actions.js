import { ADD_COUNT ,ADD_TO_CART} from './mutationsType' 

export default {
  addCart(context,payload){
    return new Promise((resolve ,reject)=> {
      let oldProduct = context.state.cartList.find(item => item.iid == payload.iid)
    // for(let item of state.cartList){
    //   if(item.iid == payload.iid){
    //     oldProduct = item
    //   }
    // }
    if(oldProduct){
      context.commit(ADD_COUNT,oldProduct)
      // oldProduct.count +=1
      resolve("数量加1")
    }else{
      payload.count = 1
      context.commit(ADD_TO_CART ,payload)
      resolve("添加购物车成功")
      // state.cartList.push(payload)
    }
    })
}
}