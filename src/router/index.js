import Vue from "vue";
import VueRouter from "vue-router";

const Home = () =>import ('views/home/home')
const Category = () =>import ('views/category/category')
const ShopCard = () =>import ('views/shopcart/shopcart')
const Profile = () =>import ('views/profile/profile')
const Detail = () =>import ('views/detail/Detail')
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/shopcart',
    component:ShopCard
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail',
    component:Detail
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})
export default router