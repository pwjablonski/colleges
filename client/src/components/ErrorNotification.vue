<template>
  <div class="error-notification">
    <span>There has been an error: </span>
    <span>{{ error['error'] }}</span>
  </div>
</template>

<script>
export default {
  name: 'error-notification',
  props: ['error']
}
</script>

<style scoped>
  .error-notification {
    display: flex;
    justify-content: center;
    color:red;
    margin-top: 15rem;
  }
</style>
