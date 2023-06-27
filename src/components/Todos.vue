<script>
import BTN from './SeptupButton.vue';
export default {
  components: { BTN },
  props:{
    todos: {
      required: true,
      type: Array
    }
  },
  emits: ['delete', 'edit']
}
</script>
<template>
  <div v-for="data of todos" class="todo" :key="data.id">
    <p>{{ data.tittle }}</p>
    <div>
      <BTN 
        circle
        @click="$emit('edit', data.id)"
        variant="info"
      >
        <img src="../assets/pensil.svg" alt="Logo" width="20">
      </BTN>
      <BTN 
        circle
        @click="$emit('delete', data.id)"
        variant="danger"
      >
        <img src="../assets/trash.svg" alt="Logo" width="20">
      </BTN>
    </div>
  </div>
</template>
<style scoped>
.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--accent-color);
  margin-top: 30px;
  padding: 0 20px;
  border-radius: 10px;
}
.todo > div {
  display: flex;
}
</style>