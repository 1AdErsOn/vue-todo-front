<script setup>
  import { computed } from 'vue';
  //import { useBackgroudColor, backgroundColorProps } from '../composables/backgroundColor.js';
  const props = defineProps({
    circle: {
      default: false,
      type: Boolean
    }
    //...backgroundColorProps
  })
  //const backgroundColor = useBackgroudColor(props);
  const applyCircleClass = computed(() =>{
    return props.circle;
  });
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
/* button {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-color);
  border: none;
  padding: 10px;
  font-size: 30px;
  cursor: pointer;
} */
.circle {
  border-radius: 50%;
}
.btn:disabled {
  opacity: 80%;
}
</style>