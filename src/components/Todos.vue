<script setup>
  const props = defineProps({
    todos: {
      required: true,
      type: Array
    }
  });
  const emit = defineEmits(['delete'])
</script>

<template>
  <tr v-for="data of todos" class="todo" :key="data.id">
    <th scope="row">{{ data.id }}</th>
    <td>{{ data.tittle }}</td>
    <td>{{ data.description }}</td>
    <td>{{ data.date }}</td>
    <td>
      <div class="btn-group">
        <button type="button" class="btn btn-info" @click="$router.push(`/edit/${data.id}`)">
          <img src="../assets/pensil.svg" alt="Logo" width="20">
        </button>
        <button type="button" class="btn btn-danger" @click="$emit('delete', data.id)">
          <img src="../assets/trash.svg" alt="Logo" width="20">
        </button>
      </div>
    </td>
  </tr>
</template>

<style scoped>
/* .todo {
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
} */
</style>