<script>
import BTN from './SeptupButton.vue';
export default {
  components: { BTN },
  data() {
    return {
      todoTitle: ''
    }
  },
  emits : ['submit']
}
</script>
<template>
  <form class="add-todo-form">
    <input v-model="todoTitle" type="text" placeholder="Todo tittle"><!--so important-->
    <div>
      <BTN 
        @click.prevent="$emit('submit', todoTitle)"
        type="success"
      >
        Add Todo
      </BTN>
    </div>
  </form>
</template>
<style scoped>
form {
  display: flex;
  justify-content: space-between;
}
form input {
  width: 80%;
  border: solid 2px var(--accent-color);
  padding: 10px;
}
</style>