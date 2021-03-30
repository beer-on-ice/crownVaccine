<template>
  <div class="crown-list-check-wrapper full-screen-s">
    <ss-header title="检索受种者"
      :leftArrow="false">
      <template #right>
        <p @click="close">关闭</p>
      </template>
    </ss-header>
    <van-field class="input"
      border
      :maxlength="18"
      v-model.trim="searchKey"
      left-icon="idcard"
      placeholder="请输入受种者身份证号码">
      <template #left-icon>
        <img class="digital"
          src="@/assets/images/crown/sfz.png"
          alt="">
      </template>
    </van-field>
    <ss-button @click="search">查询</ss-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchKey: ''
    }
  },
  created () {
    if (this.$route.query.cid) {
      this.searchKey = this.$route.query.cid
    }
  },
  methods: {
    async search () {
      const {
        $api: {
          crown: { checkCidHasXG }
        }
      } = this
      const userName = sessionStorage.getItem('user')
      const params = { user_name: userName, cid: this.searchKey.toUpperCase() }
      if (!this.searchKey) {
        this.$toast('请输入身份证号码！')
        return
      }
      const cidHasXG = await checkCidHasXG(params)
      if (cidHasXG.code === 1) {
        this.$toast(cidHasXG.message)
      } else if (cidHasXG.data.showMsg) {
        this.$dialog.alert({
          title: '提示',
          message: cidHasXG.data.showMsg
        }).then(() => {
          this.searchKey = ''
        })
      } else {
        this.$router.replace({
          name: 'crownListAddFile',
          query: {
            cid: this.searchKey.toUpperCase()
          }
        })
      }
    },
    close () {
      this.searchKey = ''
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus">
.crown-list-check-wrapper
  width 100%;
  padding-bottom 150px;
  text-align center;
  background-color #efeff4;
  .input.van-cell
    margin 20px;
    box-sizing border-box;
    border-radius 20px;
    width auto;
  .van-field__left-icon
    display flex;
    align-items center;
  .digital
    width 40px;
  .van-button
    width 90%;
</style>
