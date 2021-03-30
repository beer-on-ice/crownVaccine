<template>
  <div class="news-today-item-wrap">
    <div class="news-today-item flex-space-between">
      <van-image width="200px"
        height="120px"
        fit="contain"
        :src="data.coverUrl"></van-image>
      <div class="flex-column"
        style="margin-left: 40px;">
        <div class="title word-wrap">{{ data.title }}</div>
        <div class="flex-space-between"
          style="margin-left: -10px;">
          <div class="title-note flex-center">
            <ss-icon iconType="message"></ss-icon>
            <span>{{ data.readNum }}</span>
          </div>
          <div class="title-note">{{ data.createTime }}</div>
        </div>
      </div>
    </div>
    <img class="recommend"
      :src="require('@/assets/images/index/recommend.png')"
      v-if="data.isRecommend == '1'" />
  </div>
</template>

<script>
import { Image } from 'vant'
export default {
  name: 'NewsToday',
  components: {
    [Image.name]: Image
  },
  props: {
    data: {
      required: true
    }
  }
}
</script>

<style scoped lang="stylus">
.news-today-item-wrap
  position relative;
  margin 10px 40px;
.news-today-item
  padding 20px;
  border 1px solid $colorBorder;
  border-radius 10px;
.recommend
  position absolute;
  top 0;
  right 12px;
  height 36px;
</style>
