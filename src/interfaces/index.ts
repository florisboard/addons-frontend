export interface IUnprocessableEntity {
  errors: Record<string, string[]>;
  message: string;
}
