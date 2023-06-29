<script setup>
  //import { useBackgroudColor, backgroundColorProps } from '../composables/backgroundColor.js';
  const props = defineProps({
    message:{
      required: true,
      type: String
    },
    show: {
      required: true,
      type: Boolean
    }
    //...backgroundColorProps
  });
  const emit = defineEmits(['close']);
  //const backgroundColor = useBackgroudColor(props);
  const closeAlert = () => {
    emit('close');
  }
</script>
<template>
  <div v-if="show" class="alert alert-primary d-flex align-items-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg>
    <div>{{ message }}</div>
    <div @click="closeAlert" class="alert-action">&times;</div>
  </div>
</template>
<style scoped>
/* .alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--danger-color);
  margin-bottom: 20px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
  font-size: 20px;
} */
.alert-action {
  font-size: 50px;
  cursor: pointer;
}
</style>