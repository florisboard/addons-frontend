export interface IUnprocessableEntity {
  errors: Record<string, string[]>;
  message: string;
}

export interface IOption<T> {
  label: string;
  value: T;
}
