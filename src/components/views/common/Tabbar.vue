<template>
  <van-tabbar :value="active">
    <van-tabbar-item @click.native="$utils.goPage('/index')">
      <span>首页</span>
      <template #icon="props">
        <ss-icon :iconType="props.active ? 'index-selected' : 'index-unselected'"></ss-icon>
      </template>
    </van-tabbar-item>
    <van-tabbar-item @click.native="$utils.goPage('/station/index')">
      <span>接种门诊</span>
      <template #icon="props">
        <ss-icon :iconType="props.active ? 'station-selected' : 'station-unselected'"></ss-icon>
      </template>
    </van-tabbar-item>
    <van-tabbar-item @click.native="$utils.goPage('/mine/index')">
      <span>我的</span>
      <template #icon="props">
        <ss-icon :iconType="props.active ? 'mine-selected' : 'mine-unselected'"></ss-icon>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'Tabbar',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  props: {
    active: {
      default: 0
    }
  }
}
</script>

<style scoped lang="stylus"></style>
