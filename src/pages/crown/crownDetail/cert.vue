<template>
  <div class="cert-wrapper full-screen-s">
    <ss-header title="预防接种凭证"
      @backClick="goBack">
      <template #right>
        <span class="down"
          @click="showShare = true">· · ·</span>
      </template>
    </ss-header>
    <file-pdf :pdfUrl='pdfUrl'
      :markText="markText"></file-pdf>
    <van-share-sheet v-model="showShare"
      title="下载接种凭证"
      :options="options"
      @select="onSelect" />
  </div>
</template>

<script>
import FilePdf from '@/components/common/FilePdf'
export default {
  components: {
    FilePdf
  },
  data () {
    return {
      pdfUrl: '',
      markText: '',
      showShare: false,
      options: [
        { name: '复制链接', icon: 'link' }
      ]
    }
  },
  created () {
    this.pdfUrl = this.$route.query.pdfUrl
  },
  methods: {
    onSelect (option) {
      if (option.name === '复制链接') {
        this.copyData()
      }
      this.showShare = false
    },
    copyData () {
      console.log(this.pdfUrl)
      this.$copyText(this.pdfUrl).then(e => {
        this.$toast({ type: 'success', message: '已复制' })
      }, function (e) {
        this.$toast({ type: 'danger', message: '复制失败' })
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="stylus">
.cert-wrapper
  width 100%;
  height 100%;
  .down
    font-size 24px;
    font-weight bold;
</style>
