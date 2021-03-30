<template>
  <van-swipe class="index-swipe"
    :autoplay="3000"
    :show-indicators="false"
    @click="gotoPage"
    :radius="8">
    <van-swipe-item :key="index"
      v-for="(item, index) in barList">
      <div class="flex-center">
        <van-image width="80vw"
          height="15vw"
          fit="contain"
          :src="item.pic_url"></van-image>
      </div>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { Swipe, SwipeItem, Image } from 'vant'
export default {
  name: 'IndexSwipe',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image
  },
  data () {
    return {
      barList: []
    }
  },
  methods: {
    gotoPage (index) {
      let item = this.barList[index]
      if (item.pic_link_url) {
        window.location.href = item.pic_link_url
      }
    }
  },
  created () {
    this.barList = [{ pic_url: '1111' }]
  }
}
</script>

<style scoped lang="stylus">
.index-swipe
  margin 20px 0;
</style>
