<template>
  <div class="file">
    <van-tabs :class="{'switch':true,'topAdj':topAdj}"
      v-model="contentSwitchIdx"
      swipeable>
      <van-tab title="基本信息">
        <van-cell-group>
          <van-cell title="城乡居民健康档案编号"
            :value="info.fhealthrecordid" />
          <van-cell title="居民健康卡号"
            :value="info.fnethealthid" />
          <van-cell title="受种者姓名"
            :value="info.name" />
          <van-cell title="身份证号码"
            :value="info.cid" />
          <van-cell title="性别"
            :value="info.sex" />
          <van-cell title="出生日期"
            :value="info.birth" />
          <van-cell title="民族"
            :value="info.fnationCn" />
          <van-cell title="婚姻状况"
            :value="info.fmaritalstatusCn" />
          <van-cell title="职业类别"
            :value="info.fcareerCn" />
          <van-cell title="人群分类"
            :value="info.fcrowdkindCn" />
          <van-cell title="学历"
            :value="info.feducationdegreeCn" />
          <van-cell title="工作单位/学校名称/社区"
            :value="info.fchildunitname" />
          <van-cell title="户籍类型"
            :value="info.regtype" />
          <van-cell title="户籍地址"
            :value="info.regaddr" />
          <van-cell title=""
            :value="info.regaddrDetail" />
          <van-cell title="现居住地址"
            :value="info.dwelladdr" />
          <van-cell title=""
            :value="info.dwelladdrDetail" />
          <van-cell title="家庭电话"
            :value="info.otherphone" />
          <van-cell title="移动电话"
            :value="info.mobphone" />
        </van-cell-group>
      </van-tab>
      <!-- <van-tab title="亲属信息">
        <van-cell-group>
          <van-cell title="母亲姓名"
            :value="info.mothername" />
          <van-cell title="母亲身份证号"
            :value="info.motherid" />
          <van-cell title="母亲电话"
            :value="info.fmothermobile" />
          <van-cell title="母亲乙肝表面抗原"
            :value="info.mhbsag" />
          <van-cell title="父亲姓名"
            :value="info.fathername" />
          <van-cell title="父亲身份证号"
            :value="info.fatherid" />
          <van-cell title="父亲电话"
            :value="info.ffathermobile" />
        </van-cell-group>
      </van-tab> -->
      <van-tab title="相关健康信息">
        <van-cell-group>
          <van-cell title="受种者乙肝表面抗原检测结果"
            :value="info.fadulthbsag" />
          <van-cell title="受种者乙肝表面抗体检测结果"
            :value="info.fadulthbsab" />
          <van-cell title="禁忌证"
            :value="info.ftabuCn" />
          <van-cell title="过敏史"
            :value="info.fallergyhistCn" />
          <van-cell title="既往传染病史"
            :value="info.fdiseaseCn" />
          <van-cell title="既往预防接种异常反应"
            :value="info.freactionCn" />
        </van-cell-group>

      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      contentSwitchIdx: 0
    }
  },
  props: {
    info: {
      type: Object,
      required: true
    },
    topAdj: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus">
.crownDetailWrapper
  .file
    background rgb(245, 245, 245);
    height 100%;
    .van-tabs
      height calc(100% - 300px);
      &.topAdj
        height calc(100% - 200px);
    .van-cell__title
      color #969799;
    .van-cell__value
      color #323233;
    .van-tab--active
      color rgb(29, 176, 255);
    .van-tabs__line
      background-color rgb(29, 176, 255);
    .van-tabs__content
      margin 0 20px;
      height calc(100% - 150px);
      overflow-y auto;
</style>
