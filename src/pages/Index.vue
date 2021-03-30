<template>
  <ss-page-index>
    <div class="flex-column flex-center"
      slot="left">
      <ss-badge :showFlag="!!messageCount"
        :text="messageCount">
        <ss-icon iconType="message"
          size="40px"></ss-icon>
      </ss-badge>
      <div>消息</div>
    </div>
    <div class="flex-column flex-center"
      slot="title">
      <div class="header-title selected-title">儿童</div>
    </div>
    <div class="flex-column flex-center"
      slot="right"
      @click="$utils.goPage('/bind/index')">
      <ss-icon iconType="bind"
        size="40px"></ss-icon>
      <div>绑定</div>
    </div>
    <ss-card-group></ss-card-group>
    <div class="flex-column"
      style="background-color: white;">
      <ss-menu-group></ss-menu-group>
      <div class="margin-item flex-space-between">
        <img class="img-button"
          :src="require('@/assets/images/index/inform.png')"
          style="margin-top: -16px;" />
        <div class="info-tip">
          <span class="van-multi-ellipsis--l2">
            很长很长的文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
          </span>
        </div>
      </div>
      <ss-index-swipe></ss-index-swipe>
      <div class="margin-item flex-space-between">
        <img style="height: 48px;"
          class="img-button"
          :src="require('@/assets/images/index/news_today.png')" />
        <img style="height: 48px;"
          class="img-button"
          :src="require('@/assets/images/index/to_more.png')"
          @click="$utils.goPage('/newsToday/index')" />
      </div>
      <ss-news-today-item :key="index"
        v-for="(item, index) in newsTodayList"
        :data="item"></ss-news-today-item>
      <div class="bottom-margin"></div>
    </div>
    <ss-tabbar :index="0"></ss-tabbar>
  </ss-page-index>
</template>

<script>
import CardGroup from '@/components/views/index/CardGroup'
import MenuGroup from '@/components/views/index/MenuGroup'
import IndexSwipe from '@/components/views/index/IndexSwipe'
import NewsTodayItem from '@/components/views/index/NewsTodayItem'
import Tabbar from '@/components/views/common/Tabbar'
export default {
  name: 'Index',
  components: {
    'ss-card-group': CardGroup,
    'ss-menu-group': MenuGroup,
    'ss-index-swipe': IndexSwipe,
    'ss-news-today-item': NewsTodayItem,
    'ss-tabbar': Tabbar
  },
  data () {
    return {
      messageCount: 12,
      newsTodayList: []
    }
  },
  methods: {
    getNewsToday () {
      this.newsTodayList = [
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01', isRecommend: '1' },
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01', isRecommend: '1' },
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01' },
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01' },
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01' },
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01' },
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01' },
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01' },
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01' },
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01' }
      ]
    }
  },
  created () {
    this.getNewsToday()
  },
  activated () {
    this.$store.commit(this.$types.SET_TIMESTAMP)
  }
}
</script>

<style lang="stylus">
.header-title
  font-size 32px;
.selected-title
  @extend .flex-column;
  @extend .flex-center;
.selected-title::after
  content '';
  margin-top 10px;
  width 75%;
  height 8px;
  border-radius 4px;
  background-color white;
.info-tip
  position relative;
  border 1px solid $colorBorder;
  border-radius 10px;
  font-size $fontSizeS;
  padding 4px 10px;
  overflow visible;
  color $colorMainLight;
.info-tip::after
  content '';
  position absolute;
  left 0;
  top 0;
  width 10px;
  height 10px;
  transform rotate(-45deg) translate(-24px, calc(50% + 8px));
  border 1px solid $colorBorder;
  border-right none;
  border-bottom none;
  z-index 99;
  background-color white;
</style>
