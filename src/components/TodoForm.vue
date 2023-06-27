<script>
import BTN from './SeptupButton.vue';
import Spinner from "./Spinner.vue";
export default {
  components: { BTN, Spinner },
  props: {
    isLoading: {
      default: false,
      type: Boolean
    },
  },
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
        :disabled="isLoading"
        @click.prevent="$emit('submit', todoTitle)"
        variant="success"
        type="submit"
      >
        <Spinner v-if="isLoading" />
        <span v-else>Add Todo</span>
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