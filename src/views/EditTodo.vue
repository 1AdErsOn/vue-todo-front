<script setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Spinner from '@/components/Spinner.vue';
  import { useFetch } from '@/composables/fetch.js';

  const props = defineProps(['id']);
  const router = useRouter();
  const loading = ref(false);
  const alert = reactive({
    show: false,
    message: "",
  });

  const showAlert = (message) => {
    alert.show = true;
    alert.message = message;
  }
  const { data:todo, isLoading } = useFetch(`/api/todos/${props.id}`, {
    onError: () =>showAlert('Failed loading Todo')
  });
  const submit = () => {
    const send = {
      tittle: todo.value.tittle,
      description: todo.value.description,
      date: todo.value.date,
    }
    //console.log(send);
    loading.value = true;
    fetch(`/api/todos/${props.id}`, {
      method: "PUT",
      body: JSON.stringify(send),
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
  <div class="alert alert-danger alert-dismissible d-flex align-items-center" v-if="alert.show" role="alert">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg>
    <div>{{ alert.message }}</div>
    <button type="button" class="btn-close" @click="alert.show = false"></button>
  </div>
  <Spinner v-if="isLoading" />
  <form>
    <div class="input-group mt-3">
      <span class="input-group-text">Todo Tittle</span>
      <input type="text" class="form-control" v-model="todo.tittle"/>
    </div>
    <div class="input-group mt-3">
      <span class="input-group-text">Todo Descripcion</span>
      <input type="text" class="form-control" v-model="todo.description"/>
    </div>
    <div class="input-group mt-3">
      <span class="input-group-text">Todo Date</span>
      <input type="date" class="form-control" v-model="todo.date"/>
    </div>
      <!-- :value="modelValue"
      @input="todoTittle = $event.target.value" -->
      <button type="submit" class="btn btn-outline-success mt-3" @click.prevent="submit()">
        Submit
      </button>
  </form>
</template>

<style scoped>
/* .form {
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
} */
</style>