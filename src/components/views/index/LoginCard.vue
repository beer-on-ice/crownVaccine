<template>
  <ss-index-card class="background-card"
    width="80vw">
    <div class="title">未登录</div>
    <div class="title-note">快来登录试试，更多定制功能等着你</div>
    <div><img :src="require('@/assets/images/index/button_login.png')"
        class="img-button" /></div>
  </ss-index-card>
</template>

<script>
import IndexCard from './IndexCard'
export default {
  name: 'LoginCard',
  components: {
    'ss-index-card': IndexCard
  }
}
</script>

<style scoped lang="stylus"></style>
