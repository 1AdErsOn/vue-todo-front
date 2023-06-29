<script setup>
  import BTN from './SeptupButton.vue';
  import Spinner from "./Spinner.vue";
  import { ref } from 'vue';
  const todoTitle = ref('');
  const props = defineProps({
    isLoading: {
      default: false,
      type: Boolean
    },
  });
  const emit = defineEmits(['submit']);
</script>
<template>
  <form>
    <div class="input-group mb-3 mt-3">
      <input class="form-control" v-model="todoTitle" type="text" placeholder="Todo tittle"><!--so important-->
      <BTN 
        class="btn btn-outline-primary"
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
/* form {
  display: flex;
  justify-content: space-between;
}
form input {
  width: 80%;
  border: solid 2px var(--accent-color);
  padding: 10px;
} */
</style>