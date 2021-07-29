import Toast from 'components/common/toast/Toast'
const obj ={}
obj.install = function(Vue){
  //构建组件构造器
  const toastConstuctor = Vue.extend(Toast) 
  //根据new，让组件构造器构建一个对象
  const toast = new toastConstuctor()
  //将创建的组件实例对象挂载到对应的div元素上 例如#app等
  toast.$mount(document.createElement('div'))
  //将创建和挂载好的div加入到页面元素body上
  document.body.appendChild(toast.$el)

  //将方法添加到vue的原型中让每一个组件都能够调用
  Vue.prototype.$toast = toast

}

export default obj