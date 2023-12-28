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

export interface IRelease extends IModelWithTimestamps {
  version: string;
}

export interface IReleaseFull extends IRelease {
  project_id: number;
  user_id: number;
  description: string;
  downloads_count: number;
  user?: IUser;
  project?: IProject;
}

export interface IProject extends IModelWithTimestamps {
  category_id: number;
  short_description: string;
  user_id: number;
  name: string;
  slug: string;
  package_name: string;
  is_recommended: boolean;
  reviews_count: number;
  reviews_avg_score: number;
  releases_sum_downloads_count: number;
  latest_release: IRelease;
}

export interface IProjectFull extends IProject {
  description: string | null;
  home_page: string | null;
  support_site: string | null;
  support_email: string | null;
  donate_site: string | null;
  user: IUser;
  category: ICategory;
  maintainers: IUser[];
  one_reviews_count: number;
  two_reviews_count: number;
  three_reviews_count: number;
  four_reviews_count: number;
  five_reviews_count: number;
}

export interface ICategory extends IModel {
  name: string;
  slug: string;
  is_top: boolean;
  circle_bg: string;
  circle_fg: string;
}

export interface IHome {
  top_categories: ICategory[];
  picks_of_the_day: IProject[];
  latest_releases: IProject[];
  latest_projects: IProject[];
  recommended: IProject[];
}

export interface IUnprocessableEntity {
  errors: Record<string, string[]>;
  message: string;
}
