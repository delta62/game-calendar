import { Validator } from "./validation";
import { createContext } from 'preact';

export type Fields = Record<string, FormItem>;

export interface FormItem {
  error: string | false;
  validator: Validator;
  value: string;
}

interface Context {
  fields: Fields;
  onSubmit(): void;
  addField(name: string, validator?: Validator): void;
  setField(name: string, value: string): void;
}

let FormContext = createContext<Context>({
    fields: {},
    onSubmit() { },
    addField() { },
    setField() { },
});
FormContext.displayName = 'Form';

export default FormContext;
