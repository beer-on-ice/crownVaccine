<template>
  <van-image round
    :width="size"
    :height="size"
    :src="img"
    :error-icon="require('@/assets/images/common/default_avatar.png')"
    :show-loading="false" />
</template>

<script>
import { Image } from 'vant'
export default {
  name: 'Avatar',
  components: {
    [Image.name]: Image
  },
  props: {
    size: {
      default: '64px'
    },
    img: {
      default: require('@/assets/images/common/default_avatar.png')
    }
  }
}
</script>

<style scoped lang="stylus"></style>
