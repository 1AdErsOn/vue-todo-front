<script>
import Alert from './components/Alert.vue';
import Navbar from './components/Navbar.vue';
import TodoForm from './components/TodoForm.vue';
import Todos from './components/Todos.vue';
export default {
  components: {
    Alert, Navbar, TodoForm, Todos
  },
  data() {
    return {
      todos: [],
      showAlert: false
    }
  },
  methods: {
    addTodo(tittle){
      if (tittle !== '') {
        this.showAlert = false;
        const todo = {
          tittle,
          id: Math.floor(Math.random() * 1000)
        }
        this.todos.unshift(todo);
      } else {
        this.showAlert = true;
      }
      //this.todos = this.todos.concat([this.todoTitle]);
    },
    removeTodo(id){
      this.todos = this.todos.filter(todo => todo.id !== id);
    }
  }
};
</script>

<template>
  <Navbar />

  <main class="container">
    <Alert 
      message="Todo tittle is required"
      type="warning"
      :show="showAlert" 
      @close="showAlert = false"
    />
    <section>
      <TodoForm @submit="addTodo" />
    </section>
    <section>
      <Todos 
      :todo="todos"
      @delete="removeTodo" 
      />
    </section>
  </main>
</template>

<style scoped>

</style>
