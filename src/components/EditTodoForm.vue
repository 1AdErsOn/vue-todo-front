<script setup>
  import Modal from './Modal.vue';
  import BTN from './SeptupButton.vue';
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  const todoTittle = ref('');
  const modal = ref(null);
  const closeOnEscapeListener = (e) =>{
    if (e.key === "Escape") {
      emit('close');
    }
    /* if (e.key === "Enter") {
      e.preventDefault()
      this.$emit('submit', this.todoTitle);
    } */
  }
  /* const clickListener = (e) => {
    console.log(e.target);
    console.log(modal.value);
    if (e.target === modal.value) {
      emit('close');
    }
  } */
  const props = defineProps({
    modalShow:{
      default: false
    },
    modelValue: {
      default: '',
      type: String
    }
  });
  const emit = defineEmits(['close', 'submit']);
  onMounted(() => {
    window.addEventListener('keydown', closeOnEscapeListener);
    //window.addEventListener('click', clickListener);
  })
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', closeOnEscapeListener);
    //window.removeEventListener('click', clickListener);
  })
</script>

<template>
  <Modal ref="modal"
    v-show="modalShow"
  >
    <template v-slot:header>
      <h2>EDIT</h2>
    </template>
    <template v-slot:content>
      <form>
        <label>Todo Tittle:</label>
        <input 
          type="text"
          :value="modelValue"
          @input="todoTittle = $event.target.value"
        />
      </form>
    </template>
    <template #footer>
      <BTN
        variant="warning"
        @click="$emit('close')"
      >
        CLOSE
      </BTN>
      <BTN
        variant="success"
        @click="$emit('submit', todoTittle)"
      >
        UPDATE
      </BTN>
    </template>
  </Modal>
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