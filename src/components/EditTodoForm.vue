<script>
import Modal from './Modal.vue';
import BTN from './SeptupButton.vue';
export default {
  components: { Modal, BTN },
  props:{
    modalShow:{
      default: false
    },
    modelValue: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      closeOnEscapeListener: (e) => {
        if (e.key === "Escape") {
          this.$emit('close');
        }
        /* if (e.key === "Enter") {
          e.preventDefault()
          this.$emit('submit', this.todoTitle);
        } */
      },
      todoTitle: ''
    };
  },
  emits: ['close', 'submit'],
  mounted() {
    //this.todoTitle = this.modelValue;
    window.addEventListener('keydown', this.closeOnEscapeListener);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.closeOnEscapeListener);
  }
}
</script>

<template>
  <Modal
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
          @input="todoTitle = $event.target.value"
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
        @click="$emit('submit', todoTitle)"
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