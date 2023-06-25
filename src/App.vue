<script>
import Alert from './components/Alert.vue';
export default {
  components: {
    Alert,
  },
  data() {
    return {
      todoTitle: '',
      todos: [],
      showAlert: false
    }
  },
  methods: {
    addTodo(){
      const tittle = this.todoTitle;
      if (tittle !== '') {
        const todo = {
          tittle: tittle,
          id: Math.floor(Math.random() * 1000)
        }
        this.todos.unshift(todo);
      } else {
        this.showAlert = true;
      }
      //this.todos = this.todos.concat([this.todoTitle]);
    },
    removeTodo(tittle){
      this.todos = this.todos.filter(todo => todo.tittle !== tittle);
    }
  }
};
</script>

<template>
  <nav class="navbar">
    <img src="./assets/logo.svg" alt="Logo" width="50">
    <div class="brand">Todo List App</div>
  </nav>
  <main class="container">
    <Alert 
      message="Todo tittle is required"
      type="warning"
      :show="showAlert" 
      @close="showAlert = false"
    />
    <section>
      <form class="add-todo-form">
        <input v-model="todoTitle" type="text" placeholder="Todo tittle"><!--so important-->
        <div>
          <button @click.prevent="addTodo">Add Todo</button>
        </div>
      </form>
    </section>
    <section>
      <div v-for="todo of todos" class="todo" :key="todo.id">
        <p>{{ todo.tittle }}</p>
        <dir>
          <button @click="removeTodo(todo.tittle)" class="remove-todo-btn">&times;</button>
        </dir>
      </div>
    </section>
  </main>
</template>

<style scoped>
.navbar{
  display: flex;
  align-items: center;
  background: var(--navbar-color);
  padding: 20px;
  margin-bottom: 30px;
}
.brand {
  font-size: 2rem;
}
.add-todo-form {
  display: flex;
  justify-content: space-between;
}
.add-todo-form input {
  width: 80%;
  border: solid 2px var(--accent-color);
  padding: 10px;
}
.add-todo-form button {
  background-color: var(--accent-color);
  color: var(--text-color);
  border: none;
  height: 50px;
}
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
