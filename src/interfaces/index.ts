export interface IModel {
  id: number;
}

export interface IModelWithTimestamps {
  created_at: string;
  updated_at: string;
}

export interface IUser extends IModelWithTimestamps {
  username: string;
}

export interface IAuthUser extends IUser {
  email: string;
  email_verified_at: string;
  username_changed_at: string;
}

export interface IUnprocessableEntity {
  errors: Record<string, string[]>;
  message: string;
}
