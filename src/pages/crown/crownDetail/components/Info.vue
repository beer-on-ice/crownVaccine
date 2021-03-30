<template>
  <div class="info">
    <div class="main"
      v-if="list.length">
      <ul class="outerUl">
        <li class="outerLi"
          v-for="item in list"
          :key="item.bact_id">
          <h3 class="fl-c-b outerH3">
            <p class="fl-c-c">
              <img v-if="item.bact_name==='新型冠状疫苗'"
                src="@/assets/images/crown/love.png"
                alt="">
              <img v-else
                src="@/assets/images/crown/loveP.png"
                alt="">
              <span>{{item.bact_name}}</span>
            </p>
            <van-button v-show="item.pdfUrl"
              size="small"
              type="info"
              round
              class="fl-c-c"
              @click="goCert(item)">
              <i class="iconfont icon-print"></i>
              <span>预防接种凭证</span>
            </van-button>
          </h3>
          <ul class="innerUl">
            <li class="fl-c-b innerLi"
              v-for="el in item.vaccine_list"
              :key="el.vaccine_code">
              <h3 class="innerH3 fl-c-c">
                <img src="@/assets/images/crown/circle.png"
                  alt="">
                <span>第{{el.vaccine_count}}剂次</span>
              </h3>
              <p>
                {{el.vaccine_product_name}}
              </p>
              <p>
                {{el.vaccine_time}}
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ss-no-data v-else>暂无接种记录</ss-no-data>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getAdultJzjlList()
  },
  methods: {
    async getAdultJzjlList () {
      const userName = sessionStorage.getItem('user')
      const crownDetailInfo = JSON.parse(sessionStorage.getItem('crownDetailInfo'))
      const params = {
        user_name: userName,
        child_code: crownDetailInfo.jmFchildno
      }
      const res = await this.$api.crown.getAdultJzjlList(params)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        console.log('接种记录', res.data)
        this.list = res.data
      }
    },
    goCert (item) {
      this.$router.push({
        name: 'crownDetailCert',
        query: {
          pdfUrl: item.pdfUrl
        }
      })
    }
  }
}
</script>
<style lang="stylus">
.crownDetailWrapper
  .info
    height 100%;
    .main
      height calc(100% - 350px);
      overflow-y auto;
      padding 0 30px 0;
      .outerUl
        .outerLi
          padding 20px 30px 30px;
          padding-top 0px;
          margin-top 30px;
          background #fff;
          border-radius 10px;
          .outerH3
            margin 0;
            color #000;
            font-size 30px;
            img
              width 50px;
              margin-right 10px;
            .van-button
              margin 0;
              i.iconfont
                font-size 28px;
                margin-right 10px;
          .innerUl
            background rgb(238, 245, 245);
            padding 20px;
            border-radius 10px;
            .innerLi
              .innerH3
                margin 0;
                img
                  width 30px;
                  margin-right 10px;
                span
                  font-size 28px;
                  margin 0;
              p
                max-width 30%;
                font-size 28px;
                word-break break-all;
</style>
