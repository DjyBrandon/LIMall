<template>
    <!-- 搜索栏 + 轮播图 -->
    <view class="tn-pl-sm tn-pr-sm">
        <TnSearchBox shape="round" size="sm" placeholder="请输入搜索关键词" @search="toSearchPage" />
        <view class="swiper-container tn-mt-sm">
            <TnSwiper :data="indexImgs" width="100%" height="300" indicator indicator-type="dot">
                <template #default="{ data }">
                    <view class="swiper-data">
                        <image class="image" :src="data.imgUrl" :data-prodid="data.relation" @tap="toProdPage"
                            mode="aspectFill" />
                    </view>
                </template>
            </TnSwiper>
        </view>
    </view>
    <!-- 功能栏 -->
    <view class="tn-m tn-flex justify-evenly">
        <view class="tn-flex-column" data-sts="1" @tap="toClassifyPage">
            <TnIcon name="tips-fill" type="primary" size="75rpx" />
            <view class="title">新品推荐</view>
        </view>
        <view class="tn-flex-column" data-sts="2" @tap="toClassifyPage">
            <TnIcon name="time-fill" size="75rpx" />
            <view class="title">限时特惠</view>
        </view>
        <view class="tn-flex-column" data-sts="3" @tap="toClassifyPage">
            <TnIcon name="fire-fill" size="75rpx" />
            <view class="title">每日疯抢</view>
        </view>
        <view class="tn-flex-column" @tap="toCouponCenter">
            <TnIcon name="coupon-fill" size="75rpx" />
            <view class="title">领优惠券</view>
        </view>
    </view>

    <!-- 消息播放 -->
    <TnNoticeBar @click="onNewsPage" bg-color="#fff" text-color="#000" font-size="28" :data="news" left-icon="sound"
        left-icon-color="tn-grey" right-icon="right" right-icon-color="right" direction="vertical" auto-hidden />

    <view v-if="updata" class="update">
        <block v-for="(item, index) in taglist" :key="index">
            <!-- 每日上新 -->
            <view v-if="item.style === '2' && item.prods && item.prods.length" class="up-to-date">
                <view class="title">
                    <view>{{ item.title }}</view>
                    <view class="more-prod-cont" data-sts="0" :data-id="item.id" :data-title="item.title"
                        @tap="toClassifyPage">
                        <text class="more">
                            查看更多
                        </text>
                    </view>
                </view>
                <view class="content">
                    <block v-for="(prod, index2) in item.prods" :key="index2">
                        <view class="prod-item" :data-prodid="prod.prodId" @tap="toProdPage">
                            <view class="imagecont">
                                <image :src="prod.pic" style="height: 100rpx; width: 100rpx;"></image>
                                <!-- <img-show :src="prod.pic" :class-list="['prodimg']" /> -->
                            </view>
                            <view class="prod-text">
                                {{ prod.prodName }}
                            </view>
                            <view class="price">
                                <text class="symbol">¥</text>
                                <text class="big-num">{{ wxs.parsePrice(prod.price)[0] }}</text>
                                <text class="small-num">.{{ wxs.parsePrice(prod.price)[1] }}</text>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
            <!-- 商城热卖 -->
            <view v-if="item.style === '1' && item.prods && item.prods.length" class="hot-sale">
                <view class="title">
                    <view>{{ item.title }}</view>
                    <view class="more-prod-cont" data-sts="0" :data-id="item.id" :data-title="item.title"
                        @tap="toClassifyPage">
                        <text class="more">
                            更多
                        </text>
                    </view>
                </view>
                <view class="hotsale-item-cont">
                    <block v-for="(prod, index2) in item.prods" :key="index2">
                        <view class="prod-items" :data-prodid="prod.prodId" @tap="toProdPage">
                            <view class="hot-imagecont">
                                <image :src="prod.pic" style="height: 100rpx; width: 100rpx;"></image>
                                <!-- <img-show :src="prod.pic" :class-list="['prodimg']" /> -->
                            </view>
                            <view class="hot-text">
                                {{ prod.prodName }}
                            </view>
                            <view class="hotprod-text">
                                {{ prod.prodName }}
                            </view>
                            <view class="prod-info">
                                {{ prod.brief }}
                            </view>
                            <view class="prod-text-info">
                                <view class="price">
                                    <text class="symbol">¥</text>
                                    <text class="big-num">{{ wxs.parsePrice(prod.price)[0] }}</text>
                                    <text class="small-num">.{{ wxs.parsePrice(prod.price)[1] }}</text>
                                </view>
                            </view>
                            <TnIcon name="cart-fill" size="30rpx" />
                            <image src="../../static/images/tabbar/basket-sel.png" style="height: 100rpx;width: 100rpx;"
                                class="basket-img" />
                        </view>
                    </block>
                </view>
            </view>
            <!-- 更多宝贝 -->
            <view v-if="item.style === '0' && item.prods && item.prods.length" class="more-prod">
                <view class="title">
                    <view>{{ item.title }}</view>
                </view>
                <view class="prod-show">
                    <block v-for="(prod, index2) in item.prods" :key="index2" class="prod-item" :data-prodid="prod.prodId"
                        @tap="toProdPage">
                        <view class="more-prod-pic">
                            <image :src="prod.pic" style="height: 100rpx; width: 100rpx;"></image>
                            <!-- <img-show :src="prod.pic" :class-list="['prodimg']" /> -->
                        </view>
                        <view class="prod-text-right">
                            <view class="prod-text more">
                                {{ prod.prodName }}
                            </view>
                            <view class="prod-info">
                                {{ prod.brief }}
                            </view>
                            <view class="b-cart">
                                <view class="price">
                                    <text class="symbol">¥</text>
                                    <text class="big-num">{{ wxs.parsePrice(prod.price)[0] }}</text>
                                    <text class="small-num">.{{ wxs.parsePrice(prod.price)[1] }}</text>
                                </view>
                                <TnIcon name="cart" size="30rpx" @tap.stop="addToCart(prod)" />
                                <image src="../../static/images/tabbar/basket-sel.png" class="basket-img"
                                    @tap.stop="addToCart(prod)" />
                            </view>
                        </view>
                    </block>
                </view>
            </view>
        </block>
    </view>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import TnSearchBox from '@tuniao/tnui-vue3-uniapp/components/search-box/src/search-box.vue'
import TnSwiper from '@tuniao/tnui-vue3-uniapp/components/swiper/src/swiper.vue'
import TnNoticeBar from '@tuniao/tnui-vue3-uniapp/components/notice-bar/src/notice-bar.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

const wxs = number()
const indexImgs = ref([])
const seq = ref(0)
const news = ref([])
const updata = ref(true)
// 按标签分组读取数据初始化
type Taglist = {
    id: number,
    title: string,
    seq: string,
    style: string,
    prods: Array<{
        // 针对 TypeScript 只初始化了 prodId 属性
        pic: string,
        prodId: number,
        prodName: string,
        price: number,
        brief: string,
    }>
}
const taglist = ref<Array<Taglist>>([])

onMounted(() => {
    getAllData()
    // #ifdef MP-WEIXIN
    uni.getSetting({
        success(res) {
            if (!res.authSetting['scope.userInfo']) {
                uni.navigateTo({
                    url: '/pages/login/login'
                })
            }
        }
    })
    // #endif   
    http.getCartCount() // 重新计算购物车总数量
})

onPullDownRefresh(() => {
    // 模拟加载
    setTimeout(() => {
        getAllData()
        uni.stopPullDownRefresh() // 停止下拉刷新
    }, 100)
})

const getAllData = () => {
    http.getCartCount() // 重新计算购物车总数量
    getIndexImgs()
    getNoticeList()
    getTag()
}

const toProdPage = (e: any) => {
    const prodid = e.currentTarget.dataset.prodid

    if (prodid) {
        uni.navigateTo({
            url: '/pages/prod/prod?prodid=' + prodid
        })
    }
}
/**
 * 加入购物车
 */
const addToCart = (item: any) => {
    uni.showLoading({
        mask: true
    })
    http.request({
        url: '/prod/prodInfo',
        method: 'GET',
        data: {
            prodId: item.prodId
        }
    })
        .then(({
            data
        }) => {
            http.request({
                url: '/p/shopCart/changeItem',
                method: 'POST',
                data: {
                    basketId: 0,
                    count: 1,
                    prodId: data.prodId,
                    shopId: data.shopId,
                    skuId: data.skuList[0].skuId
                }
            })
                .then(() => {
                    uni.hideLoading()
                    http.getCartCount() // 重新计算购物车总数量
                    uni.showToast({
                        title: '加入购物车成功',
                        icon: 'none'
                    })
                })
        })
}

const toCouponCenter = () => {
    uni.showToast({
        icon: 'none',
        title: '该功能未开源'
    })
}

/**
 * 跳转搜索页
 */
const toSearchPage = () => {
    uni.navigateTo({
        url: '/pages/search-page/search-page'
    })
}

/**
 * 跳转商品活动页面
 * @param e
 */
const toClassifyPage = (e: any) => {
    let url = '/pages/prod-classify/prod-classify?sts=' + e.currentTarget.dataset.sts
    const id = e.currentTarget.dataset.id
    const title = e.currentTarget.dataset.title

    if (id) {
        url += '&tagid=' + id + '&title=' + title
    }

    uni.navigateTo({
        url
    })
}
/**
 * 跳转公告列表页面
 */
const onNewsPage = () => {
    uni.navigateTo({
        url: '/pages/recent-news/recent-news'
    })
}

/**
 * 加载轮播图
 */
const getIndexImgs = () => {
    http.request({
        url: '/indexImgs',
        method: 'GET',
        data: {}
    })
        .then(({
            data
        }) => {
            indexImgs.value = data
            seq.value = data
        })
}

const getNoticeList = () => {
    // 加载公告
    http.request({
        url: '/shop/notice/topNoticeList',
        method: 'GET',
        data: {}
    })
        .then(({
            data
        }) => {
            news.value = data.map((item: { title: string }) => item.title)
            // news.value = data
        })
}

/**
 * 加载商品标题分组列表
 */
const getTag = () => {
    http.request({
        url: '/prod/tag/prodTagList',
        method: 'GET',
        data: {}
    })
        .then(({
            data
        }) => {
            taglist.value = data
            for (let i = 0; i < data.length; i++) {
                updata.value = false
                updata.value = true
                getTagProd(data[i].id, i)
            }
        })
}

const getTagProd = (id: number, index: number) => {
    http.request({
        url: '/prod/prodListByTagId',
        method: 'GET',
        data: {
            tagId: id,
            size: 6
        }
    })
        .then(({
            data
        }) => {
            updata.value = false
            updata.value = true
            const taglistParam = taglist.value
            // Object.assign(taglistParam[index], {
            //     prods: data.records,
            // });
            taglistParam[index].prods = data.records
            taglist.value = taglistParam
        })
}
</script>

<style lang="scss" scoped>
@use './home.scss'
</style>
