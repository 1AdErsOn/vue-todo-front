<script setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import BTN from '@/components/SeptupButton.vue';
  import Spinner from '@/components/Spinner.vue';
  import Alert from '@/components/Alert.vue';
  import { useFetch } from '@/composables/fetch.js';

  const props = defineProps(['id']);
  const router = useRouter();
  const loading = ref(false);
  const alert = reactive({
    show: false,
    message: "",
    variant: "warning"
  });

  const showAlert = (message, type = "danger") => {
    alert.show = true;
    alert.message = message;
    alert.variant = type;
  }
  const { data:todo, isLoading } = useFetch(`/api/todos/${props.id}`, {
    onError: () =>showAlert('Failed loading Todo')
  });
  const submit = (tittle) => {
    loading.value = true;
    fetch(`/api/todos/${props.id}`, {
      method: "PUT",
      body: JSON.stringify({tittle}),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(resp => resp.json())
    .then(data => {
      //this.isLoading = false;
      if (props.id == data.id) {
        router.push('/');
      }
    })
    .catch(err => showAlert('Failing updating Todo...' + err))
    .finally(() => loading.value = false);
  }
</script>

<template>
  <h1>Edit Todo</h1>
  <Spinner class="spinner" v-if="isLoading" />
  <Alert 
    :message="alert.message"
    :variant="alert.variant"
    :show="alert.show" 
    @close="alert.show = false"
  />
  <div class="form">
    <form>
      <label>Todo Tittle:</label>
      <input 
        type="text" v-model="todo.tittle"
      />
      <!-- :value="modelValue"
      @input="todoTittle = $event.target.value" -->
      <div class="submit">
        <BTN :disabled="loading" type="submit" @click.prevent="submit(todo.tittle)" variant="success" >
          <Spinner v-if="loading" />
          <span v-else>Submit</span>
        </BTN>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form {
  background-color: var(--navbar-color);
  padding: 20px;
  border-radius: 10px;
}
form label {
  font-size: 20px;
  margin-right: 10px;
}
form input {
  width: 80%;
  border: solid 2px var(--accent-color);
  padding: 10px;
}
.submit {
  display: flex;
  justify-content: end;
}
</style>