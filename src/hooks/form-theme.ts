import { FormClassNames } from '@delta62/micro-form'
import { useMemo } from 'react'
import styles from '../styles/form.scss'

export let useFormTheme = () =>
  useMemo<FormClassNames>(
    () => ({
      form: styles.form,
      item: styles.item,
      label: styles.label,
      field: styles.field,
      validation: styles.validationError,
    }),
    []
  )
