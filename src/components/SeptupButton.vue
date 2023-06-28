<script setup>
  import { computed } from 'vue';
  const prop = defineProps({
    circle: {
      default: false,
      type: Boolean
    },
    variant: {
      required: false,
      dafault: 'success',
      validator(value) {
        const options =['danger', 'warning', 'info', 'success', 'secondary'];
        return options.includes(value)
      }
    }
  })
  const backgroundColor = computed(() => {
    const options = {
      danger: 'var(--danger-color)',
      info: 'var(--info-color)',
      warning: 'var(--warning-color)',
      success: 'var(--accent-color)',
      secondary: 'var(--success-color)'
    };
    return options[prop.variant];
  });
  const applyCircleClass = computed(() =>{
    return prop.circle;
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