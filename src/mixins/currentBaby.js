import store from '@/store/'

export default {
  computed: {
    currentBaby() {
      return store.state.currentBaby
    }
  }
}
