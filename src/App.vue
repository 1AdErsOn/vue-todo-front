<script setup>
  import Alert from './components/Alert.vue';
  import Navbar from './components/Navbar.vue';
  import TodoForm from './components/TodoForm.vue';
  import Todos from './components/Todos.vue';
  import Spinner from './components/Spinner.vue';
  import EditTodoForm from './components/EditTodoForm.vue';
  import { ref, reactive } from 'vue';
  import { useFetch } from './composables/fetch.js';
  //import api from './api.js'
  //const todos = ref([]);
  //const isLoading = ref(false);
  const isPostingTodo = ref(false);
  const alert = reactive({
    show: false,
    message: "",
    variant: "warning"
  });
  const editTodoForm = reactive({
    show: false,
    todo: {
      id: 0,
      tittle: ""
    }
  });
  const showAlert = (message, type = "danger") => {
    alert.show = true;
    alert.message = message;
    alert.variant = type;
  }
  const seeTodo = (id) => {
    editTodoForm.show = true;
    const todo = todos.value.find(todo => todo.id === id);
    editTodoForm.todo = {...todo}
  }
  const { data:todos, isLoading } = useFetch('/api/todos', {
    onError: () =>showAlert('Failed loading Todos')
  });
  const addTodo = (tittle) => {
    if (tittle !== '') {
      alert.show = false;
      isPostingTodo.value = true;
      const todo = { tittle };
      fetch('/api/todos/', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json' // Indicates the content 
          },
          body: JSON.stringify(todo)
      }).then(resp => resp.json()) //console.log(result);
      .then(data => {
        isPostingTodo.value = false;
        todos.value.unshift(data);
      }) //this.fetchTodos();
      .catch(err => showAlert('Failing creating Todo...' + toString(err)));
    } else {
      showAlert('Tittle Field is Required','warning');
    }
    //this.todos = this.todos.concat([this.todoTitle]);
  }
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
  const updateTodo = (tittle) => {
    //this.isLoading = true;
    const { id } = editTodoForm.todo;
    /* const todo = this.todos.find(
      (todo) => todo.id === this.editTodoForm.todo.id
    ); */
    fetch('/api/todos/' + id, {
      method: "PUT",
      body: JSON.stringify({tittle}),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(resp => resp.json())
    .then(data => {
      //this.isLoading = false;
      const index = todos.value.findIndex(todo => todo.id === data.id);
      todos.value[index].tittle = data.tittle;
    })
    .catch(err => showAlert('Failing updating Todo...' + toString(err)));
    editTodoForm.show = false;
  }
  //fetchTodos();
</script>

<template>
  <Navbar />

  <main class="container">
    <EditTodoForm 
      :modalShow="editTodoForm.show"
      :modelValue="editTodoForm.todo.tittle"
      @close="editTodoForm.show = false"
      @submit="updateTodo"
    />
    <Alert 
      :message="alert.message"
      :variant="alert.variant"
      :show="alert.show" 
      @close="alert.show = false"
    />
    <section>
      <TodoForm 
        :isLoading="isPostingTodo"
        @submit="addTodo" 
      />
    </section>
    <section>
      <Spinner class="spinner" v-if="isLoading" />
      <Todos 
        :todos="todos"
        @delete="removeTodo"
        @edit="seeTodo"
      />
    </section>
  </main>
</template>

<style scoped>
.spinner {
  margin: auto;
  margin-top: 30px;
}
</style>
