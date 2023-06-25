<script>
export default {
  props: {
    message:{
      required: true,
      type: String
    },
    show: {
      required: true,
      type: Boolean
    },
    type: {
      dafault: 'danger',
      validator(value) {
        return ['danger', 'warning', 'info'].includes(value);
      }
    }
  },
  computed:{
    backgroundColor(){
      const options = {
        danger: 'var(--danger-color)',
        info: 'var(--info-color)',
        warning: 'var(--warning-color)'
      };
      return options[this.type];
    }
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