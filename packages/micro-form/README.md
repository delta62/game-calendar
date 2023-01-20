# `forms`

A tiny form library for React

## Usage

Use the `<Form>` tag to create a React context, and embed `<FormItem>`s inside
of it:

```tsx
import { Form, FormItem } from '@delta62/micro-form'

let MyForm = () => (
  <Form
    onSubmit={fields => {
      console.log(fields)
    }}
  >
    <FormItem type="email" label="Email" name="email" />
    <FormItem type="password" label="Password" name="password" />
    <FormItem type="submit" label="Submit" />
  </Form>
)
```

The `Form` component takes an `onSubmit` prop which will be invoked when the
form is submitted. Form submission is automatically disabled when any of the
fields are invalid. All fields in the form are required, and basic validation is
done for email fields. Make sure to include a `submit` item!

## Validation

You can provide custom validation functions to form items:

```js
let isFoo = (field, fields) => {
  if (field === 'foo') {
    return false
  }

  return 'Must be "foo"'
}

;<FormItem name="pw" type="password" validate={isFoo} />
```

A validation function accepts two arguments - the value of the field being
validated, and a hash of all the form's current values keyed by their `name`. It
should return either a string containing the error that occurred, or `false` if
there was no validation error.

A form value contains the following data:

```ts
interface FormValue {
  error: string | false
  value: string
}
```
