<script>
import { backgroundColor } from '../mixins/backgroundColor.js';
export default {
  mixins: [backgroundColor],
  props: {
    message:{
      required: true,
      type: String
    },
    show: {
      required: true,
      type: Boolean
    },
  },
  emits: ['close'],
  /* methods: {
    closeAlert() {
      this.$emit('close');
    }
  } */
}
</script>
<template>
  <div v-if="show" class="alert" :style="{ backgroundColor }">
    <div>{{ message }}</div>
    <div @click="$emit('close')" class="alert-action">&times;</div>
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