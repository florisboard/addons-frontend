export interface IModel {
  id: number;
}

export interface IModelWithTimestamps extends IModel {
  created_at: string;
  updated_at: string;
}

export interface IPaginate<Model extends { id: number }> {
  meta: IMeta;
  data: Model[];
  links: {
    next: number | null;
    prev: number | null;
  };
}

export interface IMetaLink {
  label: string;
  url: null | string;
  active: boolean;
}

export interface IMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
  links: IMetaLink[];
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

export interface IProject extends IModelWithTimestamps {
  category_id: number;
  user_id: number;
  name: string;
  slug: string;
  package_name: string;
  description: string | null;
  home_page: string | null;
  support_site: string | null;
  support_email: string | null;
  donate_site: string | null;
  is_recommended: boolean;
}

export interface IUnprocessableEntity {
  errors: Record<string, string[]>;
  message: string;
}
