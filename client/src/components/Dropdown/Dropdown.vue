<template>
  <div @click="toggle" class="dropdown">
    <slot name="toggler">
      <button class="btn">
          {{text}}
          <font-awesome-icon icon="chevron-down" />
      </button>
    </slot>
    <slot/>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
export default {
  name: 'dropdown',
  props: ['text'],
  mixins: [ clickaway ],
  provide () {
    return {
      sharedState: this.sharedState
    }
  },
  data () {
    return {
      sharedState: {
        active: false
      }
    }
  },
  methods: {
    toggle () {
      this.sharedState.active = !this.sharedState.active
    },
    away () {
      this.sharedState.active = false
    }
  }
}
</script>
<style scoped>
.dropdown {
    position: relative;
    display: inline-flex;
    vertical-align: middle;
}
.btn{
    color: #fff;
    background-color: #16d2aa;
    border-color: #16d2aa;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
}
</style>
