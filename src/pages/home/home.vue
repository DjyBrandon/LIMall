<template>
    <view style="background-color: #F8F7F8;">
        <!-- 搜索栏 + 轮播图 -->
        <view class="tn-pl-sm tn-pr-sm">
            <TnSearchBox shape="round" border-color="tn-blue" placeholder-color="＃696969" size="sm" placeholder="请输入搜索关键词"
                @search="toSearchPage" />
            <view class="swiper-container tn-mt-sm tn-mb-xs">
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
        <view class="tn-ml-sm tn-mr-sm tn-pt-sm tn-pb-sm tn-pl-xs tn-pr-xs tn-radius tn-flex justify-evenly items-center"
            style="background-color: #fff;">
            <view class="tn-flex-column" data-sts="1" @tap="toClassifyPage">
                <image src="/static/images/function/new.svg" mode="widthFix" class="fun-img" />
            </view>
            <view class="tn-flex-column" data-sts="2" @tap="toClassifyPage">
                <image src="/static/images/function/bargin.svg" mode="widthFix" class="fun-img" />
            </view>
            <view class="tn-flex-column" data-sts="3" @tap="toClassifyPage">
                <image src="/static/images/function/today.svg" mode="widthFix" class="fun-img" />
            </view>
            <view class="tn-flex-column" @tap="toCouponCenter">
                <image src="/static/images/function/coupon.svg" mode="widthFix" class="fun-img" />
            </view>
        </view>

        <!-- 消息播放 -->
        <view class="tn-red_bg tn-m-sm">
            <TnNoticeBar @click="onNewsPage" bg-color="#fff" text-color="#000" font-size="24" :data="news" left-icon="sound"
                left-icon-color="tn-grey" right-icon="right" right-icon-color="right" direction="vertical" auto-hidden />
        </view>

        <!-- 商品分类 -->
        <view style="background-color: #fff;">
            <TnScrollList>
                <view class="tn-pt item-container">
                    <view v-for="(item, index) in categoryList" :key="index"
                        class="scroll-item tn-flex-center tn-flex-column">
                        <image :src="item.pic" mode="aspectFill" class="empty"></image>
                        <view class="title">{{ item.categoryName }}</view>
                    </view>
                </view>
            </TnScrollList>
        </view>

        <!-- 商品展示 -->
        <view v-if="updata">
            <view v-for="(item, index) in tagList" :key="index">

                <!-- 每行三列内容（每日上新） -->
                <view class="tn-m-xs tn-border-none-bottom tn-radius tn-gray-light_border"
                    v-if="item.style === '2' && item.prods && item.prods.length">
                    <view class="tn-flex-center-between">
                        <TnTitle class="tn-m-sm tn-text-bold" :title="item.title" size="50rpx" mode="vLine"
                            color="tn-orangered" assist-color="tn-orangered" />
                        <view class="tn-mt-sm tn-text-sm tn-gray_text" data-sts="0" :data-id="item.id"
                            :data-title="item.title" @tap="toClassifyPage">
                            <view class="tn-mr">查看更多
                                <TnIcon name="right-circle-simple-fill" />
                            </view>
                        </view>
                    </view>
                    <view class="tn-flex-wrap">
                        <view class="tn-p-xs tn-w-1-3" v-for="(prod, index) in item.prods" :key="index">
                            <view class="tn-radius tn-shadow tn-h-full" :data-prodid="prod.prodId" @click="toProdPage"
                                style="background-color: white; overflow: hidden;">
                                <image :src="prod.pic" mode="aspectFill"
                                    style="border-radius: 0; width: 100%; height: 223rpx" />
                                <view class="tn-h-full">
                                    <view class="tn-m-xs tn-text-lg tn-text-ellipsis-2">{{ prod.prodName }}</view>
                                    <view class="tn-m-xs">
                                        <text class="tn-text-lg tn-red_text tn-mr-xs">¥</text>
                                        <text class="tn-red_text tn-text-xl">{{
                                            wxs.parsePrice(prod.price)[0] }}</text>
                                        <text class="tn-text-sm tn-red_text">.{{
                                            wxs.parsePrice(prod.price)[1] }}</text>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>

                <!-- 每行两列内容（商城热卖） -->
                <view v-if="item.style === '1' && item.prods && item.prods.length">
                    <view class="tn-flex-center-between">
                        <TnTitle class="tn-m-sm tn-text-bold" :title="item.title" size="50rpx" mode="vLine"
                            color="tn-orangered" assist-color="tn-orangered" />
                        <view class="tn-mt-sm tn-text-sm tn-gray_text" data-sts="0" :data-id="item.id"
                            :data-title="item.title" @tap="toClassifyPage">
                            <view class="tn-mr">更多
                                <TnIcon name="right-circle-simple-fill" />
                            </view>
                        </view>
                    </view>
                    <TnWaterFall :data="item.prods">
                        <template #left="{ item }">
                            <view class="image-data tn-shadow" :data-prodid="item.prodId" @click="toProdPage">
                                <image class="image" :src="item.pic" mode="widthFix" />
                                <view class="tn-m-xs tn-text-lg tn-text-ellipsis-1">{{ item.prodName }}</view>
                                <view class="tn-m-xs tn-text-sm tn-gray_text tn-text-ellipsis-1">{{ item.brief }}</view>
                                <view class="tn-flex justify-between">
                                    <view class="tn-ml-sm tn-mb-xs">
                                        <text class="tn-text-lg tn-red_text tn-mr-xs">¥</text>
                                        <text class="tn-red_text tn-text-xl">{{ wxs.parsePrice(item.price)[0] }}</text>
                                        <text class="tn-text-sm tn-red_text">.{{ wxs.parsePrice(item.price)[1] }}</text>
                                    </view>
                                    <view class="tn-mr-sm">
                                        <TnIcon name="cart-fill" size="40" color="tn-blue-dark" />
                                    </view>
                                </view>
                            </view>
                        </template>
                        <template #right="{ item }">
                            <view class="image-data tn-shadow" :data-prodid="item.prodId" @click="toProdPage">
                                <image class="image" :src="item.pic" mode="widthFix" />
                                <view class="tn-m-xs tn-text-lg tn-text-ellipsis-1">{{ item.prodName }}</view>
                                <view class="tn-m-xs tn-text-sm tn-gray_text tn-text-ellipsis-1">{{ item.brief }}</view>
                                <view class="tn-flex justify-between">
                                    <view class="tn-ml-sm tn-mb-xs">
                                        <text class="tn-text-lg tn-red_text tn-mr-xs">¥</text>
                                        <text class="tn-red_text tn-text-xl">{{ wxs.parsePrice(item.price)[0] }}</text>
                                        <text class="tn-text-sm tn-red_text">.{{ wxs.parsePrice(item.price)[1] }}</text>
                                    </view>
                                    <view class="tn-mr-lg">
                                        <TnIcon name="cart-fill" size="40" color="tn-blue-dark" />
                                    </view>
                                </view>
                            </view>
                        </template>
                    </TnWaterFall>
                </view>

                <!-- 每行一列内容（更多宝贝） -->
                <view v-if="item.style === '0' && item.prods && item.prods.length">
                    <view class="tn-flex-center-between">
                        <TnTitle class="tn-m-sm tn-text-bold" :title="item.title" size="50rpx" mode="hLine"
                            color="tn-orangered" assist-color="tn-orangered" />
                    </view>
                    <view class="tn-flex-wrap">
                        <view class="tn-p-xs tn-w-full" v-for="(prod, index) in item.prods" :key="index">
                            <view class="tn-flex tn-radius tn-shadow" style="background-color: white;">
                                <view class="tn-m-xs tn-radius">
                                    <image :src="prod.pic" mode="aspectFill" style="width: 223rpx; height: 223rpx" />
                                </view>
                                <view class="tn-w-full">
                                    <view class="tn-m-xs tn-text-lg tn-text-ellipsis-2">{{ prod.prodName }}</view>
                                    <view class="tn-m-xs tn-text-sm tn-gray_text tn-text-ellipsis-1">{{ prod.brief }}</view>
                                    <view class="tn-mt-sm tn-flex justify-between">
                                        <view class="tn-m-xs">
                                            <text class="tn-text-xl tn-red_text tn-mr-xs">¥</text>
                                            <text class="tn-red_text tn-text-2xl">{{ wxs.parsePrice(prod.price)[0] }}</text>
                                            <text class="tn-text-lg tn-red_text">.{{ wxs.parsePrice(prod.price)[1] }}</text>
                                        </view>
                                        <view class="tn-mt-xs tn-mr-lg">
                                            <TnIcon name="cart-fill" size="40" color="tn-blue-dark"
                                                @tap.stop="addToCart(item)" />
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

    </view>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import TnSearchBox from '@tuniao/tnui-vue3-uniapp/components/search-box/src/search-box.vue'
import TnSwiper from '@tuniao/tnui-vue3-uniapp/components/swiper/src/swiper.vue'
import TnNoticeBar from '@tuniao/tnui-vue3-uniapp/components/notice-bar/src/notice-bar.vue'
import TnScrollList from '@tuniao/tnui-vue3-uniapp/components/scroll-list/src/scroll-list.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnWaterFall from '@tuniao/tnui-vue3-uniapp/components/water-fall/src/water-fall.vue'
import TnTitle from '@tuniao/tnui-vue3-uniapp/components/title/src/title.vue'

const wxs = number()
const indexImgs = ref([])
const seq = ref(0)
const news = ref([])
const updata = ref(true)

// 商品分类数据初始化
type CategoryList = {
    categoryId: number,
    categoryName: string,
    pic: string
}
const categoryList = ref<Array<CategoryList>>([])

// 按标签分组读取数据初始化
type TagList = {
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
const tagList = ref<Array<TagList>>([])

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

// 模拟加载
onPullDownRefresh(() => {
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
    getCategory()
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

// 加载公告
const getNoticeList = () => {
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

// 加载分类
const getCategory = () => {
    http.request({
        url: '/category/categoryInfo',
        method: 'GET',
        data: {
            parentId: ''
        }
    })
        .then(({ data }) => {
            console.log(data)
            categoryList.value = data.map((item: { categoryId: number, categoryName: string, pic: string }) => ({ categoryId: item.categoryId, categoryName: item.categoryName, pic: item.pic }))
            console.log(categoryList.value)
            // categoryImg.value = data[0].pic
            // categoryList.value = data
            // console.log(categoryList.value)
            // getProdList(data[0].categoryId)
            // parentId.value = categoryList.value[0].categoryId
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
            console.log(data)
            tagList.value = data
            for (let i = 0; i < data.length; i++) {
                updata.value = false
                updata.value = true
                // data[i].style = Number(data[i].style)
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
            const tagListParam = tagList.value
            // Object.assign(taglistParam[index], {
            //     prods: data.records,
            // });
            tagListParam[index].prods = data.records
            tagList.value = tagListParam
        })
}
</script>

<style lang="scss" scoped>
@use './home.scss'
</style>
