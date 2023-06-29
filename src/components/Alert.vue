<script setup>
import { useBackgroudColor, backgroundColorProps } from '../composables/backgroundColor.js';
  const props = defineProps({
    message:{
      required: true,
      type: String
    },
    show: {
      required: true,
      type: Boolean
    },
    ...backgroundColorProps
  });
  const emit = defineEmits(['close']);
  const backgroundColor = useBackgroudColor(props);
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