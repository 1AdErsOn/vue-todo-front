import { computed } from "vue";

function useBackgroudColor(props){
  return computed(() => {
    const options = {
      danger: 'var(--danger-color)',
      info: 'var(--info-color)',
      warning: 'var(--warning-color)',
      success: 'var(--accent-color)',
      secondary: 'var(--success-color)'
    };
    return options[props.variant];
  })
}
const backgroundColorProps = {
  variant: {
    required: false,
    dafault: 'success',
    validator(value) {
      const options =['danger', 'warning', 'info', 'success', 'secondary'];
      return options.includes(value)
    }
  }
}
export { useBackgroudColor, backgroundColorProps }