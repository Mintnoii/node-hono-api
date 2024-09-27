import type { FormInst } from 'naive-ui'

const useMintForm = () => {
  const formRef = ref<FormInst | null>(null)

  async function validate() {
    await formRef.value?.validate()
  }

  async function restoreValidation() {
    formRef.value?.restoreValidation()
  }

  return {
    formRef,
    validate,
    restoreValidation
  }
}
export default useMintForm
