<template>
  <div class="main-class flex-center flex-column">
    <img :src="require('@/assets/images/fail.png')" />
    <div style="margin-top: 40px;">{{ errorMsg }}</div>
    <ss-button @click="$utils.exit()"
      style="margin: 40px;">退出</ss-button>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  data () {
    return {
      errorMsg: sessionStorage.getItem('error')
    }
  }
}
</script>

<style scoped lang="stylus"></style>
