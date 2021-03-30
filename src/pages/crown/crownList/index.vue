<template>
  <div class="crownListWrapper full-screen-s">
    <ss-header title="新冠受种者"
      @backClick="goBack" />
    <div class="list"
      v-if="info.childCode">
      <ul>
        <li class="people"
          @click="goDetail(info)">
          <van-swipe-cell>
            <van-card :title="info.name"
              :thumb="info.avatar">
              <template #thumb>
                <img src="@/assets/images/crown/man.png"
                  alt="">
              </template>
              <template #tags>
                <van-tag plain
                  type="danger">新冠接种</van-tag>
              </template>
              <template #price
                v-if="info.qrCodeValue">
                <img class="codebtn"
                  @click.stop="showCode"
                  :src="require('@/assets/images/common/codebtn.png')"
                  alt="">
              </template>
            </van-card>
            <template v-if="info.canDelete&&info.canDelete !== '0' "
              #right>
              <van-icon @click="deleteInfo"
                name="delete-o" />
            </template>
          </van-swipe-cell>
        </li>
      </ul>
    </div>
    <div class="tipTime"
      v-if="JSON.stringify(info) !== '{}'">
      <div v-show="countDownTime>0"
        class="countdown fl-c-c">
        <img class="star"
          :src="require('@/assets/images/common/star.png')" />
        <h3 class="fl-c-c">留观倒计时
          <van-count-down :time="countDownTime"
            format="mm" />分钟
        </h3>
      </div>
      <ul class="tipList">
        <li v-for="item in adultDirectList"
          :key="item.messageCode">
          <p>{{item.messageTime}}</p>
          <div>
            {{item.messageTitle}}
          </div>
        </li>
      </ul>
    </div>
    <ss-no-data v-if="!info.childCode && showFlag">
      <div class="tip fl-c-c">
        <span>当前无新冠受种者，去 </span>
        <van-button @click="goReg"
          type="info"
          round><i class="iconfont icon-dengji"></i>登记接种</van-button>
      </div>
    </ss-no-data>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showFlag: false,
      info: {},
      adultDirectList: [],
      countDownTime: 0,
      userName: sessionStorage.getItem('user')
    }
  },
  methods: {
    async getUserXG () {
      const res = await this.$api.crown.getUserXG({ user_name: this.userName })
      console.log('用户新冠受种者信息:', res)
      this.showFlag = true
      if (res.code === 1) {
        this.$toast(res.message || '暂无受种者信息！')
        this.info = {}
      } else {
        this.info = res.data
        if (res.data.childCode) {
          await this.getAdultDirect()
        }
      }
    },
    async getAdultDirect () {
      const params = { user_name: this.userName, scanInfo: 'index' }
      const res = await this.$api.crown.getAdultDirect(params)
      console.log('获取新冠指引:', res)
      if (res.code === 1) {
        this.$toast(res.message || '暂无新冠指引！')
      } else {
        this.countDownTime = (res.data && res.data.stayTime * 60 * 1000) || 0
        this.adultDirectList = (res.data && res.data.directList) || []
      }
    },
    deleteInfo () {
      if (this.info.canDelete === '1') {
        this.$dialog.confirm({
          title: '提示',
          message: this.info.deleteShowMsg || '确定要删除吗?',
          confirmButtonText: '确定'
        }).then(async () => {
          const params = {
            user_name: this.userName,
            child_code: this.info.childCode
          }
          const res = await this.$api.crown.delAdultUserInfo(params)
          if (res.code === 1) {
            this.$toast(res.message)
          } else {
            this.$toast.success('删除成功！')
            setTimeout(() => {
              this.goBack()
            }, 1000)
          }
        })
      } else {
        this.$dialog.alert({
          title: '提示',
          message: this.info.deleteShowMsg
        })
      }
    },
    goDetail (info) {
      sessionStorage.setItem('crownDetailInfo', JSON.stringify(info))
      this.$router.push({
        name: 'crownDetail'
      })
    },
    goReg () {
      const cid = sessionStorage.getItem('cid')
      if (cid && cid !== 'null') {
        this.$router.push({
          name: 'crownListAddFile'
        })
      } else {
        this.$router.push({
          name: 'crownListCheck'
        })
      }
    },
    showCode () {
      this.$router.push({
        name: 'crownVaccinationCode',
        query: {
          from: 'crownList'
        }
      })
    },
    goBack () {
      sessionStorage.setItem('backBarId', 'minehtml')
      window.location.href = '/HAINANZHYYJMBWeb/main.html'
      // window.location.href = '/main.html'
    }
  },
  async created () {
    await this.getUserXG()
  }
}
</script>

<style lang="stylus" >
.crownListWrapper
  background-color #efeff4;
  padding-bottom 100px;
  .van-pull-refresh
    overflow visible;
  .tipTime
    margin 30px 20px 0;
    .countdown
      background #fff;
      padding 20px;
      text-align center;
      border-radius 10px;
      img.star
        height 100px;
        width 100px;
      .van-count-down
        font-size 34px;
        line-height 1;
      h3
        margin 0;
        margin-top -12px;
        font-size 34px;
        line-height 1;
        color #000;
        font-weight 500;
    .tipList
      li
        background #fff;
        margin-top 30px;
        border-radius 10px;
        padding 20px;
        p
          margin 0;
          color #777891;
        div
          color #4d4d4d;
          margin-top 20px;
  .tip
    .van-button
      margin-left 10px;
      height 60px;
    i.iconfont
      font-size 32px;
      margin-right 10px;
  .list
    .people
      .van-swipe-cell
        margin 10px 0;
        height 150px;
        overflow inherit;
      .van-card
        background #fff;
        margin 0 20px;
        border-radius 10px;
        height 150px;
        display flex;
        align-items center;
      .van-card__header
        display flex;
        width 100%;
        img
          border-radius 50%;
      .van-card__thumb
        width 40px;
        height 40px;
      .van-card__content
        display flex;
        justify-content center;
        width 100%;
        // min-height 150px;
        height auto;
        min-height auto;
      .van-card__title
        font-weight bold;
        font-size 28px;
      .van-tag
        background-image linear-gradient(
          271deg,
          #6d68ff 0%,
          #9b77ff 100%
        );
        color #fff;
        border none;
        padding 5px 10px;
        font-size 24px;
        font-style italic;
        border-radius 10px;
      .van-swipe-cell__right
        width 100px;
        display flex;
        align-items center;
        justify-content center;
        background rgb(255, 88, 88);
        i
          color #fff;
          font-size 44px;
      .van-tag
        margin-top 20px;
      .van-card__bottom
        position absolute;
        right 0;
        // .van-button
        // height 60px;
        // border-radius 100px;
        .van-card__price
          .codebtn
            width 200px;
            border-radius 0;
</style>
