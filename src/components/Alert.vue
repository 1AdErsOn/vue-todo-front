<script setup>
//import { backgroundColor } from '../mixins/backgroundColor.js';
  import { computed } from 'vue';
  const prop = defineProps({
    message:{
      required: true,
      type: String
    },
    show: {
      required: true,
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
  });
  const emit = defineEmits(['close']);
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
  const closeAlert = () => {
    emit('close');
  }
</script>
<template>
  <div v-if="show" class="alert" :style="{ backgroundColor }">
    <div>{{ message }}</div>
    <div @click="closeAlert" class="alert-action">&times;</div>
  </div>
</template>
<style scoped>
.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--danger-color);
  margin-bottom: 20px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
  font-size: 20px;
}
.alert-action {
  font-size: 50px;
  cursor: pointer;
}
</style>