<template>
  <ss-page-simple backgound="transparent"
    title="绑定">
    <ss-card class="margin-item">
      <div class="title flex-space-between">
        <div class="flex-center">
          <ss-icon iconType="qrcode"
            size="48px"
            style="margin: 10px;margin-top: 20px;"></ss-icon>
          <div style="margin-top: -10px;">扫描</div>
        </div>
      </div>
      <div class="flex-space-between">
        <img :src="require('@/assets/images/bind/child.png')"
          class="cursor flex-grow"
          style="width: 45%;margin: 0 10px 10px 10px;" />
        <img :src="require('@/assets/images/bind/adult.png')"
          class="cursor flex-grow"
          style="width: 45%;margin: 0 10px 10px 10px;" />
      </div>
    </ss-card>
    <ss-card class="margin-item"
      style="margin-top: 40px;">
      <div class="title flex-space-between">
        <div class="flex-center">
          <ss-icon iconType="write"
            size="48px"
            style="margin: 10px;"></ss-icon>
          <div style="margin-top: -10px;">输入</div>
        </div>
        <div class="flex-center"
          style="margin-right: -15px;">
          <ss-switch-button @click.native="selected = 'child'"
            iconType="child"
            label="儿童"
            :selected="selected === 'child'"></ss-switch-button>
          <ss-switch-button @click.native="selected = 'adult'"
            iconType="adult"
            label="成人"
            :selected="selected === 'adult'"
            style="margin-left: 40px;"></ss-switch-button>
        </div>
      </div>
      <div class="flex-column flex-center"
        v-show="selected === 'child'">
        <ss-input-no-label placeholder="儿童姓名或儿童编码"
          v-model="childData.child_name"></ss-input-no-label>
        <ss-input-no-label placeholder="出生日期"
          v-model="childData.child_birth_date"
          :readonly="true"
          :disabled="true"
          @click.native="setChildBirth"
          style="cursor: pointer;"></ss-input-no-label>
        <ss-input-no-label placeholder="接种本条码或儿童编码后四位"
          v-model="childData.child_password"
          :disabled="childDisabled"></ss-input-no-label>
        <ss-button style="width:200px;margin:20px auto;"
          @click="confirmChild">提交</ss-button>
      </div>
      <div class="flex-column flex-center"
        v-show="selected === 'adult'">
        <ss-input-no-label placeholder="受种者姓名"
          v-model="adultData.child_name"></ss-input-no-label>
        <ss-input-no-label placeholder="出生日期"
          v-model="adultData.child_birth_date"
          :readonly="true"
          :disabled="true"
          @click.native="setAdultBirth"
          style="cursor: pointer;"></ss-input-no-label>
        <ss-input-no-label placeholder="绑定密码(登记成人信息时的移动电话号码)"
          v-model="adultData.child_password"></ss-input-no-label>
        <ss-button style="width:200px;margin:20px auto;"
          @click="confirmAdult">提交</ss-button>
      </div>
    </ss-card>
    <ss-date-picker :showFlag.sync="showChildDateSelector"
      v-model="childSelectDate"
      @confirm="confirmChildDate"></ss-date-picker>
    <ss-date-picker :showFlag.sync="showadultDataSelector"
      v-model="adultSelectDate"
      @confirm="confirmadultData"></ss-date-picker>
  </ss-page-simple>
</template>

<script>
import SwitchButton from '@/components/views/bind/SwitchButton'
export default {
  name: 'BindIndex',
  components: {
    'ss-switch-button': SwitchButton
  },
  data () {
    return {
      selected: 'child',
      childData: {},
      adultData: {},
      childSelectDate: new Date(),
      adultSelectDate: new Date(),
      showChildDateSelector: false,
      showadultDataSelector: false
    }
  },
  computed: {
    childDisabled () {
      return this.childData.child_name && this.childData.child_name.length === 18
    }
  },
  methods: {
    setChildBirth () {
      this.childSelectDate = this.$utils.parseDate(this.childData.child_birth_date)
      this.showChildDateSelector = true
    },
    confirmChildDate (val) {
      this.childData.child_birth_date = this.$utils.formatDate(val)
    },
    setAdultBirth () {
      this.adultSelectDate = this.$utils.parseDate(this.adultData.child_birth_date)
      this.showadultDataSelector = true
    },
    confirmadultData (val) {
      this.adultData.child_birth_date = this.$utils.formatDate(val)
    },
    confirmChild () { },
    confirmAdult () { }
  }
}
</script>

<style scoped lang="stylus"></style>
