<script>
export default {
  props:{
    todo: {
      required: true,
      type: Array
    }
  },
  emits: ['delete'],
}
</script>
<template>
  <div v-for="data of todo" class="todo" :key="data.id">
    <p>{{ data.tittle }}</p>
    <dir>
      <button @click="$emit('delete', data.id)" class="remove-todo-btn">&times;</button>
    </dir>
  </div>
</template>
<style scoped>
.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--accent-color);
  margin-top: 30px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
}
.remove-todo-btn {
  border-radius: 50%;
  border: none;
  height: 40px;
  width: 40px;
  font-size: 30px;
  color: var(--text-color);
  background-color: var(--danger-color);
  cursor: pointer;
}
</style>