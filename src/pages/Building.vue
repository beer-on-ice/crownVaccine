<template>
  <div></div>
</template>

<script>
export default {
  name: 'Building',
  methods: {
    setError () {
      sessionStorage.setItem('error', this.$consts.ERROR_NO_PAGE)
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
