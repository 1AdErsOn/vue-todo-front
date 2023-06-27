<script>
import Alert from './components/Alert.vue';
import Navbar from './components/Navbar.vue';
import Modal from './components/Modal.vue';
import TodoForm from './components/TodoForm.vue';
import Todos from './components/Todos.vue';
export default {
  components: {
    Alert,
    Navbar,
    TodoForm,
    Todos,
    Modal
},
  data() {
    return {
      todos: [],
      showAlert: false,
      editTodoForm: {
        show: false,
        todo: {
          id: 0,
          tittle: "",
        },
      }
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
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    updateTodo() {
      if(this.editTodoForm.todo.id !== 0){
        const index = this.todos.findIndex(todo => todo.id === this.editTodoForm.todo.id);
        this.todos[index].tittle = this.editTodoForm.todo.tittle;
        /* const todo = this.todos.find(
          (todo) => todo.id === this.editTodoForm.todo.id
        );
        todo.title = this.editTodoForm.todo.title; */
        this.editTodoForm.show = false;
      }
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
    <Modal
      :show="editTodoForm.show"
      @close="editTodoForm.show = false"
      @update="updateTodo"
    >
      <template v-slot:header>
        <h2>EDIT</h2>
      </template>
      <template v-slot:content>
        <form>
          <label>Todo Tittle:</label>
          <input type="text" v-model="editTodoForm.todo.tittle" />
        </form>
      </template>
    </Modal>
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
      :todos="todos"
      @delete="removeTodo"
      @edit="seeTodo"
      />
    </section>
  </main>
</template>

<style scoped>
form label {
  font-size: 20px;
  margin-right: 10px;
}
form input {
  width: 80%;
  border: solid 2px var(--accent-color);
  padding: 10px;
}
</style>
