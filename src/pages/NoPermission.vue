<template>
  <div></div>
</template>

<script>
export default {
  name: 'NoPermission',
  methods: {
    setError () {
      sessionStorage.setItem('error', this.$consts.ERROR_NO_PERMISSION)
      this.$router.replace('/errorPage')
    }
  },
  mounted () {
    this.setError()
  },
  activated () {
    this.setError()
  }
}
</script>
