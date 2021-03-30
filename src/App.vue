<template>
  <div id="app"
    class="full-screen">
    <transition name="slide">
      <router-view />
    </transition>
  </div>
</template>

<style >
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100%);
}
</style>
