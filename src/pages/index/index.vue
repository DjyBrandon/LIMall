<script setup lang="ts">
import { ref } from 'vue'
import TnTabbar from '@tuniao/tnui-vue3-uniapp/components/tabbar/src/tabbar.vue'
import TnTabbarItem from '@tuniao/tnui-vue3-uniapp/components/tabbar/src/tabbar-item.vue'
import Home from '../home/home.vue'
import Category from '../category/category.vue'
import Basket from '../basket/basket.vue'
import User from '../user/user.vue'

const currentIndex = ref(0)
// 导航栏数据
const tabbarData = ref([
  {
    name: '首页',
    icon: 'home',
    activeIcon: 'home-fill',
    badge: ''
  },
  {
    name: '分类',
    icon: 'menu',
    activeIcon: 'menu-fill',
    badge: ''
  },
  {
    name: '购物车',
    icon: 'cart',
    activeIcon: 'cart-fill',
    badge: ''
  },
  {
    name: '我的',
    icon: 'my-circle',
    activeIcon: 'my-circle-fill',
    badge: ''
  },
])

onShow(() => {
  http.getCartCount().then(res => {
    tabbarData.value[2].badge = res
  })
})
</script>

<template>
  <view class="content">
    <view v-if="currentIndex === 0">
      <Home></Home>
    </view>
    <view v-if="currentIndex === 1">
      <Category></Category>
    </view>
    <view v-if="currentIndex === 2">
      <Basket></Basket>
    </view>
    <view v-if="currentIndex === 3">
      <User></User>
    </view>
    <TnTabbar v-model="currentIndex" fixed switch-animation>
      <TnTabbarItem v-for="(item, index) in tabbarData" :key="index" :icon="item.icon" :active-icon="item.activeIcon"
        :text="item.name" :badge="item.badge" />
    </TnTabbar>
  </view>
</template>

<style lang="scss" scoped>
@use './index.scss'
</style>
