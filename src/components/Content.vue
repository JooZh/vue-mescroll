<template>
  <div class="page">
      <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style>
/*以fixed的方式固定mescroll的高度*/
.page {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: auto;
    overflow-y: auto;
}
</style>