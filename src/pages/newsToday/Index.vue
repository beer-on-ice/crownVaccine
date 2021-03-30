<template>
  <ss-page-simple title="今日看点">
    <van-pull-refresh v-model="refreshing"
      @refresh="onRefresh">
      <van-list v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <ss-news-today-item :key="index"
          v-for="(item, index) in list"
          :data="item"></ss-news-today-item>
      </van-list>
    </van-pull-refresh>
  </ss-page-simple>
</template>

<script>
import NewsTodayItem from '@/components/views/index/NewsTodayItem'
import { PullRefresh, List } from 'vant'
export default {
  name: 'cacheNewsToday',
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    'ss-news-today-item': NewsTodayItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      pagenum: 1
    }
  },
  methods: {
    onLoad () {
      let res = [
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01' },
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01' },
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01' },
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01' },
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01' },
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01' },
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01' },
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01' },
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01' },
        { title: '123111111111322222222223221111', readNum: 777, createTime: '2020-01-01' }
      ]
      this.pagenum++
      this.list = this.list.concat(res)
      this.loading = false
      if (res.length < this.$store.state.pageSize) {
        this.finished = true
      }
    },
    onRefresh () {
      this.finished = false
      this.loading = true
      this.list = []
      this.pagenum = 1
      this.onLoad()
    }
  }
}
</script>

<style scoped lang="stylus"></style>
