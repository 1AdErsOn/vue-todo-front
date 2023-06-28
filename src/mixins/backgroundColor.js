const backgroundColor = {
  props:{
    variant: {
      required: false,
      dafault: 'success',
      validator(value) {
        const options =['danger', 'warning', 'info', 'success', 'secondary'];
        return options.includes(value)
      }
    }
  },
  computed:{
    backgroundColor(){
      const options = {
        danger: 'var(--danger-color)',
        info: 'var(--info-color)',
        warning: 'var(--warning-color)',
        success: 'var(--accent-color)',
        secondary: 'var(--success-color)'
      };
      return options[this.variant];
    }
  }
}
export { backgroundColor }