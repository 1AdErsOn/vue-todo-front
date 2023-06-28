<script>
import { backgroundColor } from '../mixins/backgroundColor.js';
export default {
  mixins: [backgroundColor],
  props: {
    circle: {
      default: false,
      type: Boolean
    }
  },
  computed:{
    applyCircleClass() {
      return this.circle;
    }
  },
}
</script>
<template>
  <button  
    :style="{ backgroundColor }"
    :class="{ circle:applyCircleClass }"
  >
    <slot />
  </button>
</template>
<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-color);
  border: none;
  padding: 10px;
  font-size: 30px;
  cursor: pointer;
}
.circle {
  border-radius: 50%;
}
.btn:disabled {
  opacity: 80%;
}
</style>