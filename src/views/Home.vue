<script setup>
  import Todos from '@/components/Todos.vue';
  import Spinner from '@/components/Spinner.vue';
  import { reactive } from 'vue';
  import { useFetch } from '@/composables/fetch.js';
  //import api from './api.js'
  const alert = reactive({
    show: false,
    message: "",
  });
  const showAlert = (message) => {
    alert.show = true;
    alert.message = message;
  }
  /* const seeTodo = (id) => {
    editTodoForm.show = true;
    const todo = todos.value.find(todo => todo.id === id);
    editTodoForm.todo = {...todo}
  } */
  const { data:todos, isLoading } = useFetch('/api/todos', {
    onError: () =>showAlert('Failed loading Todos')
  });
  const removeTodo = (id) => {
    //this.isLoading = true;
    fetch('/api/todos/' + id, {
      method: 'DELETE',
    }).then(() => {
      //this.isLoading = false;
      todos.value = todos.value.filter(todo => todo.id !== id);
    })
    .catch(err => showAlert('Failing removing Todo...' + toString(err)));
  }
  //fetchTodos();
</script>

<template>

  <!-- <EditTodoForm 
    :modalShow="editTodoForm.show"
    :modelValue="editTodoForm.todo.tittle"
    @close="editTodoForm.show = false"
    @submit="updateTodo"
  /> -->
  <div class="alert alert-danger alert-dismissible d-flex align-items-center" v-if="alert.show" role="alert">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg>
    <div>{{ alert.message }}</div>
    <button type="button" class="btn-close" @click="alert.show = false"></button>
  </div>
  <table class="table table-success mt-3">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Todo Tittle</th>
        <th scope="col">Descripcion</th>
        <th scope="col">Fecha</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <Spinner v-if="isLoading" />
      <Todos 
        :todos="todos"
        @delete="removeTodo"
      />
    </tbody>
  </table>
</template>

<style scoped>

</style>
