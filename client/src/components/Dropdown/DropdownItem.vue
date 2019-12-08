<template>
  <span
    class="dropdown-item"
    @click="$emit('click')"
  >
    <slot/>
  </span>
</template>

<script>
export default {
  name: 'dropdown-item'
}
</script>

<style scoped>
.dropdown-item{
    color: #000;
    margin-left: 1rem;
    cursor: pointer;
}
.dropdown-item:hover{
    color: #16d2aa;
}
</style>
