<script>
import Alert from './components/Alert.vue';
import Navbar from './components/Navbar.vue';
import TodoForm from './components/TodoForm.vue';
import Todos from './components/Todos.vue';
import Spinner from './components/Spinner.vue';
import EditTodoForm from './components/EditTodoForm.vue';
//import api from './api.js'
export default {
  components: {
    Alert,
    Navbar,
    TodoForm,
    Todos,
    EditTodoForm,
    Spinner
},
  data() {
    return {
      todos: [],
      alert: {
        show: false,
        message: "",
        variant: "warning"
      },
      isLoading: false,
      isPostingTodo: false,
      editTodoForm: {
        show: false,
        todo: {
          id: 0,
          tittle: ""
        }
      }
    }
  },
  created() {
    //console.log(import.meta.env.VITE_API_URL);
    this.fetchTodos();
  },
  methods: {
    showAlert(message, type = "danger") {
      this.alert.message = message;
      this.alert.variant = type;
      this.alert.show = true;
    },
    fetchTodos() {
      this.isLoading = true;
      fetch('/api/todos/')
      .then(resp => resp.json())
      .then(data => {
        this.isLoading = false;
        this.todos = data;
      })
      .catch(err => this.showAlert('Failing loading Todos...'));
      //console.log(todos);
    },
    addTodo(tittle){
      if (tittle !== '') {
        this.alert.show = false;
        this.isPostingTodo = true;
        const todo = { tittle };
        fetch('/api/todos/', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json' // Indicates the content 
            },
            body: JSON.stringify(todo)
        }).then(resp => resp.json()) //console.log(result);
        .then(data => {
          this.isPostingTodo = false;
          this.todos.unshift(data);
        }) //this.fetchTodos();
        .catch(err => this.showAlert('Failing creating Todo...'));
      } else {
        this.showAlert('Tittle Field is Required','warning');
      }
      //this.todos = this.todos.concat([this.todoTitle]);
    },
    removeTodo(id) {
      //this.isLoading = true;
      fetch('/api/todos/' + id, {
        method: 'DELETE',
      }).then(() => {
        //this.isLoading = false;
        this.todos = this.todos.filter(todo => todo.id !== id)
      })
      .catch(err => this.showAlert('Failing removing Todo...'));
    },
    updateTodo(tittle) {
      //this.isLoading = true;
      const { id } = this.editTodoForm.todo;
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
        const index = this.todos.findIndex(todo => todo.id === data.id);
        this.todos[index].tittle = tittle;
      })
      .catch(err => this.showAlert('Failing updating Todo...'));
      this.editTodoForm.show = false;
    },
    seeTodo(id) {
      this.editTodoForm.show = true;
      const todo = this.todos.find(todo => todo.id === id);
      //console.log(todo);
      this.editTodoForm.todo = {...todo}
    }
  }
};
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
