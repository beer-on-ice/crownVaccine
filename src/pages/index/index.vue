<template>
  <div class="crown-index-wrapper full-screen-s">
    <ss-header :leftArrow="false"
      title="新冠接种">
      <!-- <template #right>
        <div @click="wxScan">
          <i class="iconfont icon-saoma"></i>
          <p>扫码</p>
        </div>
      </template> -->
    </ss-header>
    <div class="content">
      <div class="top fl-c-s">
        <ss-avatar :size="'50px'"></ss-avatar>
        <h3>大宝</h3>
      </div>
      <div class="menu fl-c-b">
        <div class="menu-item"
          @click="goPage('building')">
          <ss-avatar :size="'50px'"></ss-avatar>
          <p>新冠接种</p>
        </div>
        <div class="menu-item"
          @click="goPage('crownAppointList')">
          <ss-avatar :size="'50px'"></ss-avatar>
          <p>新冠预订单</p>
        </div>
        <div class="menu-item"
          @click="goPage('crownList')">
          <ss-avatar :size="'50px'"></ss-avatar>
          <p>新冠受种者</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created () {
    // const type = this.$route.query.type
    // if (type === '1') {
    //   this.goPage('crownVaccination')
    // } else if (type === '2') {
    //   this.goPage('crownAppointList')
    // } else if (type === '3') {
    //   this.goPage('crownList')
    // }
  },
  methods: {
    goPage (name) {
      this.$router.replace({ name })
    }
  }
}
</script>

<style lang="stylus" scoped>
.crown-index-wrapper
  .van-nav-bar__right
    .iconfont
      font-size 28px;
    p
      margin 0;
      font-size 24px;
      line-height 1;
  .content
    .top
      padding 30px;
      background #1db0fe;
      h3
        color #fff;
        margin-left 20px;
    .menu
      background #fff;
      margin 0 40px;
      padding 20px;
      border-radius 10px;
      margin-top -15px;
      .menu-item
        text-align center;
</style>
