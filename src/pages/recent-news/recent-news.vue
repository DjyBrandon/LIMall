<template>
    <view class="container tn-p-xs">
        <TnListItem v-for="(item, index) in news" :key="index" right-icon="right" bottom-border radius>
            <view>{{ item.title }}{{ item.publishTime }}</view>
        </TnListItem>
        <view class="recent-news">
            <block v-for="(item, index) in news" :key="index">
                <view class="news-item" :data-id="item.id" @tap="toNewsDetail">
                    <view class="news-item-title">
                        {{ item.title }}
                    </view>
                    <view class="news-item-date">
                        {{ item.publishTime }}
                    </view>
                </view>
            </block>
            <view v-if="!news || !news.length" class="empty">
                暂无数据
            </view>
        </view>
    </view>
</template>
  
<script setup lang="ts">

import TnListItem from '@tuniao/tnui-vue3-uniapp/components/list/src/list-item.vue'

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
  