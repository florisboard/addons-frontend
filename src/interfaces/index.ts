export interface IUnprocessableEntity {
  errors: Record<string, string[]>;
  message: string;
}

export interface IOption {
  label: string;
  value: string | number;
}
