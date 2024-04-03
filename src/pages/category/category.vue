<template>
    <view class="container">
        <view class="tn-pl-sm tn-pr-sm">
            <TnSearchBox shape="round" search-button="false" border-color="tn-blue" placeholder-color="＃696969" size="sm"
                placeholder="请输入搜索关键词" @search="toSearchPage" />
        </view>
        <!-- 滚动内容区 -->
        <view class="main">
            <!-- 左侧菜单start -->
            <scroll-view scroll-y="true" class="leftmenu">
                <block v-for="(item, index) in categoryList" :key="index">
                    <view :class="'menu-item ' + (selIndex == index ? 'active' : '') + ' '" :data-index="index"
                        :data-id="item.categoryId" @tap="onMenuTab">
                        {{ item.categoryName }}
                    </view>
                </block>
                <view v-if="!categoryList || !categoryList.length" class="ca-empty">
                    {{ categoryList && categoryList.length ? '该分类下暂无商品' : '暂无商品' }}
                </view>
            </scroll-view>
            <!-- 左侧菜单end -->

            <!-- 右侧内容start -->
            <scroll-view scroll-y="true" class="rightcontent">
                <view class="adver-map">
                    <view class="item-a">
                        <image :src="categoryImg" mode="widthFix" />
                    </view>
                </view>
                <!-- 子分类 -->
                <view v-if="subCategoryList.length" class="th-cate-con">
                    <block v-for="(thCateItem, index) in subCategoryList" :key="index">
                        <view class="sub-category">
                            <view class="sub-category-item" :data-categoryid="thCateItem.categoryId"
                                :data-parentid="thCateItem.parentId" @tap="toCatePage">
                                <image :src="thCateItem.pic" class="more-pic" mode="widthFix" />
                                <text>{{ thCateItem.categoryName }}</text>
                            </view>
                        </view>
                    </block>
                </view>
                <view v-else class="cont-item empty">
                    该分类下暂无子分类~
                </view>
            </scroll-view>
            <!-- 右侧内容end -->
        </view>
    </view>
</template>
  
<script setup>
import TnSearchBox from '@tuniao/tnui-vue3-uniapp/components/search-box/src/search-box.vue'

const categoryList = ref([])
const subCategoryList = ref([])
const categoryImg = ref('')
const parentId = ref('')
/**
 * 生命周期函数--监听页面加载
 */
onMounted(() => {
    // 加载分类列表
    http.request({
        url: '/category/categoryInfo',
        method: 'GET',
        data: {
            parentId: ''
        }
    })
        .then(({ data }) => {
            categoryImg.value = data[0].pic
            categoryList.value = data
            console.log(categoryList.value)
            getProdList(data[0].categoryId)
            parentId.value = categoryList.value[0].categoryId
        })
})

const selIndex = ref(0)
/**
 * 分类点击事件
 */
const onMenuTab = (e) => {
    const index = e.currentTarget.dataset.index
    getProdList(categoryList.value[index].categoryId)
    parentId.value = categoryList.value[index].categoryId
    categoryImg.value = categoryList.value[index].pic
    selIndex.value = index
}

/**
 * 跳转搜索页
 */
const toSearchPage = () => {
    uni.navigateTo({
        url: '/pages/search-page/search-page'
    })
}

const getProdList = (categoryId) => {
    // 加载分类列表
    http.request({
        url: '/category/categoryInfo',
        method: 'GET',
        data: {
            parentId: categoryId
        }
    })
        .then(({ data }) => {
            subCategoryList.value = data
        })
}

/**
 * 跳转子分类商品页面
 */
const toCatePage = (e) => {
    const { categoryid } = e.currentTarget.dataset
    uni.navigateTo({
        url: `/pages/sub-category/sub-category?parentId=${parentId.value}&categoryId=${categoryid}`
    })
}

</script>
  
<style scoped lang="scss">
@import "./category.scss";
</style>
  