export interface IModel {
  id: number;
}

export interface IModelWithTimestamps extends IModel {
  created_at: string;
  updated_at: string;
}

export interface IUser extends IModel {
  username: string;
}

export interface IAuthUser extends IModelWithTimestamps {
  email: string;
  username: string;
  email_verified_at: string;
  username_changed_at: string;
}

export interface IUnprocessableEntity {
  errors: Record<string, string[]>;
  message: string;
}
