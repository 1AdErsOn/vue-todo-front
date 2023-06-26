<script>
export default {
  props: {
    type: {
      required: true,
      dafault: 'success',
      validator(value) {
        const options =['danger', 'warning', 'info', 'success', 'secondary'];
        return options.includes(value)
      }
    },
    circle: {
      default: false,
      type: Boolean
    }
  },
  computed:{
    backgroundColor(){
      const options = {
        danger: 'var(--danger-color)',
        info: 'var(--info-color)',
        warning: 'var(--warning-color)',
        success: 'var(--accent-color)',
        secondary: 'var(--success-color)'
      };
      return options[this.type];
    },
    applyCircleClass() {
      return this.circle;
    }
  },
  emits: ['action']
}
</script>
<template>
  <Button 
    @click.prevent="$emit('action')" 
    :style="{ backgroundColor }"
    :class="{ circle:applyCircleClass }"
  >
    <slot />
  </Button>
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
</style>