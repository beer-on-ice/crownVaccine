<template>
  <div class="crownAppointListWrapper full-screen-s">
    <ss-header title="新冠预订单"
      @backClick="goBack"></ss-header>
    <div class="list"
      v-if="list.length">
      <ss-list :list="list"
        :refreshing="refreshing"
        :loading="false"
        :finished="finished"
        @loadData="getXGReservationList"
        @onRefresh="refreshList">
        <div class="listItem"
          v-for="item in list"
          :key="item.reservationCode">
          <div class="card">
            <div class="top fl-c-b">
              <div class="left fl-c-c">
                <img :src="item.cirleUrl"
                  alt="">
                <span :style="{color:item.color}">{{item.status}}</span>
              </div>
              <div class="right">
                <van-button v-if="item.canCancel === '1'"
                  type="info"
                  round
                  @click="cancelAppoint(item)">取消预订</van-button>
                <van-button class="icons"
                  type="info"
                  plain
                  round
                  @click="goDetail(item)">
                  <i class="iconfont icon-record-full"></i>
                  <span>查看</span>
                </van-button>
              </div>
            </div>
            <div class="center">
              <p style="font-weight:bold">{{item.productName}}</p>
              <p>【{{item.factoryName}}】</p>
            </div>
            <div class="bottom">
              <p class="fl-c-b"><span class="spec">受种者姓名</span><span>{{item.name}}</span></p>
              <p class="fl-c-b"><span class="spec">预订门诊</span><span>{{item.stationName}}</span></p>
              <p class="fl-c-b"><span class="spec specc">预订时间</span><span>{{item.reservationTime}}</span></p>
            </div>
          </div>
        </div>
      </ss-list>
    </div>
    <ss-no-data v-if="!list.length &&showFlag">
      <p>暂无数据</p>
    </ss-no-data>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      list: [],
      refreshing: false,
      loading: false,
      finished: false,
      showFlag: false
    }
  },
  methods: {
    ...mapMutations(['setFrom']),
    async getXGReservationList (page = 0) {
      if (this.refreshing) {
        this.list = []
        this.refreshing = false
      }
      const userName = sessionStorage.getItem('user')
      const params = {
        user_name: userName
      }
      const res = await this.$api.crownAppoint.getXGReservationList(params)
      this.showFlag = true
      this.loading = false
      this.finished = true
      console.log('预订单列表', res)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        this.list = res.data || []
        res.data.map(item => {
          switch (item.statusType) {
            case '0':
              item.color = 'rgb(39,178,66)'
              item.cirleUrl = require('@/assets/images/common/circle_green.png')
              break
            case '1':
              item.color = 'red'
              item.cirleUrl = require('@/assets/images/common/circle_red.png')
              break
            case '2':
              item.color = 'rgb(19,161,255)'
              item.cirleUrl = require('@/assets/images/common/circle_blue.png')
              break
            case '3':
              item.color = 'gray'
              item.cirleUrl = require('@/assets/images/common/circle_gray.png')
              break
            case '4':
              item.color = 'rgb(172,171,220)'
              item.cirleUrl = require('@/assets/images/common/circle_purple.png')
              break
            default:
              item.color = 'rgb(19,161,255)'
              item.cirleUrl = require('@/assets/images/common/circle_blue.png')
              break
          }
        })
      }
    },
    refreshList () {
      this.refreshing = true
      this.finished = false
      this.loading = true
      this.list = []
      this.getXGReservationList(0)
    },
    cancelAppoint (item) {
      const userName = sessionStorage.getItem('user')
      const params = {
        user_name: userName,
        reservationCode: item.reservationCode
      }
      this.$dialog.confirm({
        title: '提示',
        message: '确定要取消预订吗？',
        confirmButtonText: '确定'
      }).then(async () => {
        const res = await this.$api.crownAppoint.cancelXGReservation(params)
        if (res.code === 1) {
          this.$toast(res.message)
        } else {
          this.$toast.success('取消预订成功！')
          this.refreshList()
        }
      })
    },
    goDetail ({ reservationCode }) {
      this.setFrom('list')
      this.$router.push({
        name: 'crownAppointDetail',
        query: {
          reservationCode
        }
      })
    },
    goBack () {
      sessionStorage.setItem('backBarId', 'minehtml')
      this.$router.go(-1)
    }
  },
  created () {
    this.getXGReservationList()
  }
}
</script>

<style lang="stylus">
.crownAppointListWrapper
  padding 30px 20px 50px;
  background-color #efeff4;
  .listItem
    padding 20px 30px;
    border 1px solid rgb(224, 255, 227);
    margin-top 20px;
    border-radius 20px;
    background #fff;
    .top
      width 100%;
      .left
        img
          width 30px;
          height 30px;
          margin-right 10px;
        span
          color red;
      .right
        .van-button
          height 65px;
          margin-left 20px;
          &.icons
            i
              margin-right 10px;
              font-size 26px;
    .center
      width 100%;
      border-left 2px solid rgb(93, 194, 250);
      p
        padding-left 20px;
        margin 10px 0;
        color #000;
        &:nth-of-type(2)
          color rgb(82, 92, 142);
    .bottom
      width 100%;
      p
        span
          color #000;
          &.spec
            color #6e6d72;
          &.specc
            font-weight bold;
          &:nth-of-type(2)
            width 75%;
            text-align right;
</style>
