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
      alert: {
        show: false,
        message: "",
        type: "warning"
      },
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
    this.fetchTodos();
  },
  methods: {
    showAlert(message, type = "danger") {
      this.alert.message = message;
      this.alert.type = type;
      this.alert.show = true;
    },
    fetchTodos() {
      fetch('http://localhost:8080/todos/')
      .then(resp => resp.json())
      .then(data => this.todos = data)
      .catch(err => this.showAlert('Failing loading Todos...'));
      //console.log(todos);
    },
    addTodo(tittle){
      if (tittle !== '') {
        this.alert.show = false;
        const todo = { tittle };
        fetch('http://localhost:8080/todos/', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json' // Indicates the content 
            },
            body: JSON.stringify(todo)
        }).then(resp => resp.json()) //console.log(result);
        .then(data => this.todos.unshift(data)) //this.fetchTodos();
        .catch(err => this.showAlert('Failing creating Todo...'));
      } else {
        this.showAlert('Tittle Field is Required','warning');
      }
      //this.todos = this.todos.concat([this.todoTitle]);
    },
    removeTodo(id) {
      fetch('http://localhost:8080/todos/' + id, {
        method: 'DELETE',
      }).then(() => this.todos = this.todos.filter(todo => todo.id !== id))
      .catch(err => this.showAlert('Failing removing Todo...'));
    },
    updateTodo() {
      const todo = this.editTodoForm.todo;
      const id = this.editTodoForm.todo.id;
      /* const index = this.todos.findIndex(todo => todo.id === this.editTodoForm.todo.id);
      this.todos[index].tittle = this.editTodoForm.todo.tittle; */
      /* const todo = this.todos.find(
        (todo) => todo.id === this.editTodoForm.todo.id
      ); */
      fetch('http://localhost:8080/todos/' + id, {
        method: "PUT",
        body: JSON.stringify(todo),
        headers: {
            "Content-Type": "application/json",
        }
      }).then(resp => resp.json())
      .then(data => {
        const index = this.todos.findIndex(todo => todo.id === data.id);
        this.todos[index] = todo;
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
      :message="alert.message"
      :type="alert.type"
      :show="alert.show" 
      @close="alert.show = false"
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
