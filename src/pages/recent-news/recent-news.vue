<template>
    <view style="background-color: #F8F7F8; height: 100vh">
        <view class="tn-w tn-m-sm tn-radius" style="background-color: white;" v-for="(item, index) in news" :key="index">
            <TnListItem right-icon="right" bottom-border>
                <view :data-id="item.id" @tap="toNewsDetail">
                    {{ item.title }}
                </view>
            </TnListItem>
            <view class="tn-flex-end-end">
                <view class="tn-round tn-text-xs tn-gray-light_bg tn-m-xs tn-pl-sm tn-pr-sm">
                    {{ item.publishTime }}
                </view>
            </view>
        </view>
        <view v-if="!news || !news.length">
            <TnEmpty mode="data">
                <template #icon>
                    <image src="https://resource.tuniaokj.com/images/empty/alien/12.png"
                        style="height: 100rpx; width: 100rpx;" />
                </template>
                <template #tips>暂无公告</template>
            </TnEmpty>
        </view>
    </view>
</template>
  
<script setup lang="ts">

import TnListItem from '@tuniao/tnui-vue3-uniapp/components/list/src/list-item.vue'
import TnEmpty from '@tuniao/tnui-vue3-uniapp/components/empty/src/empty.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

type News = {
    id: number,
    title: string,
    publishTime: string
}
const news = ref<Array<News>>([])

/**
 * 生命周期函数--监听页面显示
 */
onShow(() => {
    // 加载公告
    http.request({
        url: '/shop/notice/noticeList',
        method: 'GET'
    })
        .then(({ data }) => {
            news.value = data.records
        })
})

/**
 * 跳转公告详情页
 */
const toNewsDetail = (e: { currentTarget: { dataset: { id: string } } }) => {
    uni.navigateTo({
        url: '/pages/news-detail/news-detail?id=' + e.currentTarget.dataset.id
    })
}
</script>
  
<style scoped lang="scss">
@use './recent-news.scss';
</style>
  