<template>
  <div
    v-if="active"
    v-bind:class="[{ right: right}, 'dropdown-content']">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'dropdown-content',
  props: ['right'],
  inject: ['sharedState'],
  computed: {
    active () {
      return this.sharedState.active
    }
  }
}
</script>

<style scoped>

.dropdown-content{
    min-width: 10rem;
    padding: .5rem 0;
    margin: .125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: .25rem;
    display: flex;
    flex-direction: column;
    position: absolute;
    transform: translate3d(0px, 38px, 0px);
    top: 0px;
    will-change: transform;
}

.right{
    right: 0;
}
</style>
