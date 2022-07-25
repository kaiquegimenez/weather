<template>
  <figure class="header">
    <img width="150px" src="../assets/logo.svg" alt="">
  </figure>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped lang="scss">
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    margin: 0;
    height: 55px;
    width: 100%;
    background-color: white;
  }
</style>
