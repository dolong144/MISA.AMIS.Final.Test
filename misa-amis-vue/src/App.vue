<template>
  <div class="main-layout">
    <Menu/>
    <div class="right-layout">
      <Header/>
      <Content/>
    </div>
  </div>
</template>

<script>
import Content from './components/layout/TheContent.vue'
import Header from './components/layout/TheHeader.vue'
import Menu from './components/layout/TheMenu.vue'
export default {
  name: 'App',
  components: {
    Content,Header,Menu
  }
}
</script>

<style>
@import url('./assets/css/main.css');
.main-layout{
  display:flex;
  width:100%;
  height:100%;
}
.right-layout{
  width: 100%;
}
</style>
