import { Validator } from "./validation";
export declare type Fields = Record<string, FormItem>;
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
declare let FormContext: import("preact").Context<Context>;
export default FormContext;
