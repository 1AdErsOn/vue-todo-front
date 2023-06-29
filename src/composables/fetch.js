import { ref, watch } from "vue";

const useFetch = (url, options = { onError: null }) => {
  const data = ref([]);
  const error = ref(null);
  const isLoading = ref(true);
  let stopWatcher = null;
  if (options.onError !== null) {
    stopWatcher = watch(error, (e) => options.onError(e));
  }
  fetch(url)
    .then(resp => resp.json())
    .then(todos => {
      data.value = todos;
    })
    .catch(err => error.value = err)
    .finally(() => {
      isLoading.value = false;
      if (stopWatcher !== null) {
        stopWatcher();
      }
    });
  return {
    data,
    isLoading
  }
}

export { useFetch }