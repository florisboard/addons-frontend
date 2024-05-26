/* eslint-disable */

/* tslint:disable */

/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from 'axios';
import axios from 'axios';

/** AuthResource */
export interface AuthResource {
  created_at: string;
  id: number;
  updated_at: string;
  username: string;
  username_changed_at: string | null;
}

export interface CategoriesIndexParams {
  filter?: {
    title?: string | null;
  };
  page?: number | null;
}

/** CategoryResource */
export interface CategoryResource {
  circle_bg: string;
  circle_fg: string;
  id: number;
  is_top: boolean;
  title: string;
}

/** CollectionResource */
export interface CollectionResource {
  created_at: string;
  id: number;
  is_public: boolean;
  projects_count?: number;
  title: string;
  updated_at: string;
  user?: UserResource;
  user_id: number;
}

export type CollectionsDestroyPayload = object;

export interface CollectionsIndexParams {
  filter?: {
    title?: string | null;
    user_id?: number | null;
  };
  page?: number | null;
}

export type CollectionsStorePayload = object;

export type CollectionsUpdatePayload = object;

/** DomainResource */
export interface DomainResource {
  id: number;
  is_reserved: boolean;
  name: string;
  verification_text: string;
  verified_at: string | null;
}

export type DomainsDestroyPayload = object;

export interface DomainsIndexParams {
  filter?: {
    name?: string | null;
  };
  page?: number | null;
  sort?: 'name' | '-name';
}

export interface DomainsStorePayload {
  name: string;
}

export type DomainsVerifyStorePayload = object;

/** ImageResource */
export interface ImageResource {
  id: string;
  url: string;
}

export type LogoutPayload = object;

/** ProjectFullResource */
export interface ProjectFullResource {
  category: CategoryResource;
  category_id: number;
  created_at: string;
  description: string;
  donate_site: string;
  five_reviews_count: number;
  four_reviews_count: number;
  home_page: string;
  id: number;
  image: ImageResource | null;
  is_active: string;
  is_recommended: string;
  latest_release: ReleaseFullResource | null;
  maintainers: UserResource[];
  one_reviews_count: number;
  package_name: string;
  releases_sum_downloads_count: number;
  reviews: ReviewResource[];
  reviews_avg_score: number;
  reviews_count: number;
  screenshots: ImageResource[];
  short_description: string;
  support_email: string;
  support_site: string;
  three_reviews_count: number;
  title: string;
  two_reviews_count: number;
  type: ProjectTypeEnum;
  updated_at: string;
  user: UserResource;
  user_id: number;
  user_review?: ReviewResource;
}

/** ProjectResource */
export interface ProjectResource {
  category_id: number | null;
  created_at: string;
  id: number;
  image: ImageResource | null;
  is_active: boolean;
  is_recommended: boolean;
  latest_release: ReleaseResource | null;
  package_name: string;
  releases_sum_downloads_count: number;
  reviews_avg_score: number;
  reviews_count: number;
  short_description: string;
  title: string;
  type: ProjectTypeEnum;
  updated_at: string;
  user_id: number | null;
}

/** ProjectTypeEnum */
export enum ProjectTypeEnum {
  EXTENSION = 'EXTENSION',
}

export type ProjectsDestroyPayload = object;

export type ProjectsImageDestroyPayload = object;

export interface ProjectsImageStorePayload {
  image_path: string;
}

export interface ProjectsIndexParams {
  filter?: {
    category_id?: number | null;
    is_recommended?: boolean | null;
    package_name?: string | null;
    title?: string | null;
    user_id?: number | null;
  };
  include?: 'user' | 'category';
  page?: number | null;
  sort?: 'package_name' | '-package_name' | 'name' | '-name' | 'id' | '-id';
}

export interface ProjectsReleasesStorePayload {
  description: string;
  file: string;
  version_name: string;
}

export interface ProjectsReviewsStorePayload {
  description: string;
  score: number;
  title: string;
}

export type ProjectsScreenshotsDestroyPayload = object;

export interface ProjectsScreenshotsStorePayload {
  /** @maxItems 5 */
  screenshots_path: string[];
}

export interface ProjectsStorePayload {
  category_id: number;
  description: string;
  donate_site?: string | null;
  home_page?: string | null;
  maintainers?: number[];
  package_name: string;
  short_description: string;
  /** @format email */
  support_email?: string | null;
  support_site?: string | null;
  title: string;
  type: ProjectTypeEnum;
}

export interface ProjectsUpdatePayload {
  category_id: number;
  description: string;
  donate_site?: string | null;
  home_page?: string | null;
  maintainers?: number[];
  package_name: string;
  short_description: string;
  /** @format email */
  support_email?: string | null;
  support_site?: string | null;
  title: string;
  type: ProjectTypeEnum;
}

/** ReleaseFullResource */
export interface ReleaseFullResource {
  created_at: string;
  description: string;
  downloads_count: number;
  id: number;
  project_id: number;
  updated_at: string;
  user: UserResource;
  user_id: string;
  version_code: number;
  version_name: string;
}

/** ReleaseResource */
export interface ReleaseResource {
  created_at: string;
  id: number;
  updated_at: string;
  version_code: number;
  version_name: string;
}

export interface ReleasesIndexParams {
  filter?: {
    project_id?: number | null;
  };
  page?: number | null;
  sort?: 'id' | '-id';
}

export interface ReleasesUpdatePayload {
  description: string;
}

/** ReviewResource */
export interface ReviewResource {
  created_at: string;
  description: string;
  id: number;
  project_id: number;
  score: number;
  title: string;
  updated_at: string;
  user: UserResource;
}

export type ReviewsDestroyPayload = object;

export interface ReviewsIndexParams {
  filter?: {
    project_id?: number | null;
    score?: number | null;
    user_id?: number | null;
  };
  page?: number | null;
  sort?: 'id' | '-id';
}

export interface ReviewsUpdatePayload {
  description: string;
  score: number;
  title: string;
}

export interface UploadsProcessPayload {
  file: string;
}

/** UserResource */
export interface UserResource {
  id: number;
  username: string;
}

export interface UsersIndexParams {
  filter?: {
    username?: string | null;
  };
  page?: number | null;
}

export interface UsersMeDestroyPayload {
  username: string;
}

export interface UsersMeUpdatePayload {
  username: string;
}

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || 'http://localhost/api',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title FlorisBoard Addons
 * @version 0.0.1
 * @baseUrl http://localhost/api
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  auth = {
    /**
     * No description
     *
     * @tags Github
     * @name GithubCallback
     * @request GET:/auth/github/callback
     */
    githubCallback: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/auth/github/callback`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Github
     * @name GithubRedirect
     * @request GET:/auth/github/redirect
     */
    githubRedirect: (params: RequestParams = {}) =>
      this.http.request<
        {
          url: string;
        },
        any
      >({
        path: `/auth/github/redirect`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name Logout
     * @request POST:/auth/logout
     */
    logout: (data: LogoutPayload, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/auth/logout`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  categories = {
    /**
     * No description
     *
     * @tags Category
     * @name CategoriesIndex
     * @request GET:/categories
     */
    categoriesIndex: (query: CategoriesIndexParams, params: RequestParams = {}) =>
      this.http.request<
        {
          data: CategoryResource[];
          links: {
            first: string | null;
            last: string | null;
            next: string | null;
            prev: string | null;
          };
          meta: {
            current_page: number;
            from: number | null;
            last_page: number;
            /** Generated paginator links. */
            links: {
              active: boolean;
              label: string;
              url: string | null;
            }[];
            /** Base path for paginator generated URLs. */
            path: string | null;
            /** Number of items shown per page. */
            per_page: number;
            /** Number of the last item in the slice. */
            to: number | null;
            /** Total number of items being paginated. */
            total: number;
          };
        },
        {
          /** A detailed description of each field that failed validation. */
          errors: Record<string, string[]>;
          /** Errors overview. */
          message: string;
        }
      >({
        path: `/categories`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Category
     * @name CategoriesShow
     * @request GET:/categories/{category}
     */
    categoriesShow: (category: number, params: RequestParams = {}) =>
      this.http.request<
        CategoryResource,
        {
          /** Error overview. */
          message: string;
        }
      >({
        path: `/categories/${category}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  collections = {
    /**
     * No description
     *
     * @tags Collection
     * @name CollectionsDestroy
     * @request DELETE:/collections/{collection}
     */
    collectionsDestroy: (
      collection: number,
      data: CollectionsDestroyPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<
        object,
        {
          /** Error overview. */
          message: string;
        }
      >({
        path: `/collections/${collection}`,
        method: 'DELETE',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collection
     * @name CollectionsIndex
     * @request GET:/collections
     */
    collectionsIndex: (query: CollectionsIndexParams, params: RequestParams = {}) =>
      this.http.request<
        {
          data: CollectionResource[];
          links: {
            first: string | null;
            last: string | null;
            next: string | null;
            prev: string | null;
          };
          meta: {
            current_page: number;
            from: number | null;
            last_page: number;
            /** Generated paginator links. */
            links: {
              active: boolean;
              label: string;
              url: string | null;
            }[];
            /** Base path for paginator generated URLs. */
            path: string | null;
            /** Number of items shown per page. */
            per_page: number;
            /** Number of the last item in the slice. */
            to: number | null;
            /** Total number of items being paginated. */
            total: number;
          };
        },
        {
          /** A detailed description of each field that failed validation. */
          errors: Record<string, string[]>;
          /** Errors overview. */
          message: string;
        }
      >({
        path: `/collections`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collection
     * @name CollectionsShow
     * @request GET:/collections/{collection}
     */
    collectionsShow: (collection: number, params: RequestParams = {}) =>
      this.http.request<
        object,
        {
          /** Error overview. */
          message: string;
        }
      >({
        path: `/collections/${collection}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collection
     * @name CollectionsStore
     * @request POST:/collections
     */
    collectionsStore: (data: CollectionsStorePayload, params: RequestParams = {}) =>
      this.http.request<object, any>({
        path: `/collections`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collection
     * @name CollectionsUpdate
     * @request PUT:/collections/{collection}
     */
    collectionsUpdate: (
      collection: number,
      data: CollectionsUpdatePayload,
      params: RequestParams = {},
    ) =>
      this.http.request<
        object,
        {
          /** Error overview. */
          message: string;
        }
      >({
        path: `/collections/${collection}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  domains = {
    /**
     * No description
     *
     * @tags Domain
     * @name DomainsDestroy
     * @request DELETE:/domains/{domain}
     */
    domainsDestroy: (domain: number, data: DomainsDestroyPayload, params: RequestParams = {}) =>
      this.http.request<
        {
          /** @example "Domain has been deleted successfully." */
          message: string;
        },
        {
          /** Error overview. */
          message: string;
        }
      >({
        path: `/domains/${domain}`,
        method: 'DELETE',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Domain
     * @name DomainsIndex
     * @request GET:/domains
     */
    domainsIndex: (query: DomainsIndexParams, params: RequestParams = {}) =>
      this.http.request<
        {
          data: DomainResource[];
          links: {
            first: string | null;
            last: string | null;
            next: string | null;
            prev: string | null;
          };
          meta: {
            current_page: number;
            from: number | null;
            last_page: number;
            /** Generated paginator links. */
            links: {
              active: boolean;
              label: string;
              url: string | null;
            }[];
            /** Base path for paginator generated URLs. */
            path: string | null;
            /** Number of items shown per page. */
            per_page: number;
            /** Number of the last item in the slice. */
            to: number | null;
            /** Total number of items being paginated. */
            total: number;
          };
        },
        | {
            /** Error overview. */
            message: string;
          }
        | {
            /** A detailed description of each field that failed validation. */
            errors: Record<string, string[]>;
            /** Errors overview. */
            message: string;
          }
      >({
        path: `/domains`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Domain
     * @name DomainsStore
     * @request POST:/domains
     */
    domainsStore: (data: DomainsStorePayload, params: RequestParams = {}) =>
      this.http.request<
        DomainResource,
        | {
            /** Error overview. */
            message: string;
          }
        | {
            /** A detailed description of each field that failed validation. */
            errors: Record<string, string[]>;
            /** Errors overview. */
            message: string;
          }
      >({
        path: `/domains`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags DomainVerify
     * @name DomainsVerifyStore
     * @request POST:/domains/{domain}/verify
     */
    domainsVerifyStore: (
      domain: number,
      data: DomainsVerifyStorePayload,
      params: RequestParams = {},
    ) =>
      this.http.request<
        {
          /** @example "Domain verified successfully." */
          message: string;
        },
        | {
            /** Error overview. */
            message: string;
          }
        | {
            /** A detailed description of each field that failed validation. */
            errors: Record<string, string[]>;
            /** Errors overview. */
            message: string;
          }
      >({
        path: `/domains/${domain}/verify`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  uploads = {
    /**
     * No description
     *
     * @tags FileUpload
     * @name UploadsProcess
     * @request POST:/uploads/process
     */
    uploadsProcess: (data: UploadsProcessPayload, params: RequestParams = {}) =>
      this.http.request<
        string,
        {
          /** A detailed description of each field that failed validation. */
          errors: Record<string, string[]>;
          /** Errors overview. */
          message: string;
        }
      >({
        path: `/uploads/process`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  home = {
    /**
     * No description
     *
     * @tags Home
     * @name Home
     * @request GET:/home
     */
    home: (params: RequestParams = {}) =>
      this.http.request<
        {
          latest_projects: ProjectResource[];
          latest_releases: ProjectResource[];
          picks_of_the_day: ProjectResource[];
          recommended: ProjectResource[];
          top_categories: CategoryResource[];
        },
        any
      >({
        path: `/home`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  projects = {
    /**
     * No description
     *
     * @tags Project
     * @name ProjectsDestroy
     * @request DELETE:/projects/{project}
     */
    projectsDestroy: (project: number, data: ProjectsDestroyPayload, params: RequestParams = {}) =>
      this.http.request<
        {
          /** @example "Project has been deleted successfully." */
          message: string;
        },
        {
          /** Error overview. */
          message: string;
        }
      >({
        path: `/projects/${project}`,
        method: 'DELETE',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Image
     * @name ProjectsImageDestroy
     * @request DELETE:/projects/{project}/image
     */
    projectsImageDestroy: (
      project: number,
      data: ProjectsImageDestroyPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<
        {
          /** @example "Image has been deleted successfully." */
          message: string;
        },
        {
          /** Error overview. */
          message: string;
        }
      >({
        path: `/projects/${project}/image`,
        method: 'DELETE',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Image
     * @name ProjectsImageStore
     * @request POST:/projects/{project}/image
     */
    projectsImageStore: (
      project: number,
      data: ProjectsImageStorePayload,
      params: RequestParams = {},
    ) =>
      this.http.request<
        {
          /** @example "Image has been saved successfully." */
          message: string;
        },
        | {
            /** Error overview. */
            message: string;
          }
        | {
            /** A detailed description of each field that failed validation. */
            errors: Record<string, string[]>;
            /** Errors overview. */
            message: string;
          }
      >({
        path: `/projects/${project}/image`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Project
     * @name ProjectsIndex
     * @request GET:/projects
     */
    projectsIndex: (query: ProjectsIndexParams, params: RequestParams = {}) =>
      this.http.request<
        {
          data: ProjectResource[];
          links: {
            first: string | null;
            last: string | null;
            next: string | null;
            prev: string | null;
          };
          meta: {
            current_page: number;
            from: number | null;
            last_page: number;
            /** Generated paginator links. */
            links: {
              active: boolean;
              label: string;
              url: string | null;
            }[];
            /** Base path for paginator generated URLs. */
            path: string | null;
            /** Number of items shown per page. */
            per_page: number;
            /** Number of the last item in the slice. */
            to: number | null;
            /** Total number of items being paginated. */
            total: number;
          };
        },
        | {
            /** Error overview. */
            message: string;
          }
        | {
            /** A detailed description of each field that failed validation. */
            errors: Record<string, string[]>;
            /** Errors overview. */
            message: string;
          }
      >({
        path: `/projects`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Release
     * @name ProjectsReleasesStore
     * @request POST:/projects/{project}/releases
     */
    projectsReleasesStore: (
      project: number,
      data: ProjectsReleasesStorePayload,
      params: RequestParams = {},
    ) =>
      this.http.request<
        ReleaseFullResource,
        | {
            /** Error overview. */
            message: string;
          }
        | {
            /** A detailed description of each field that failed validation. */
            errors: Record<string, string[]>;
            /** Errors overview. */
            message: string;
          }
      >({
        path: `/projects/${project}/releases`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Review
     * @name ProjectsReviewsStore
     * @request POST:/projects/{project}/reviews
     */
    projectsReviewsStore: (
      project: number,
      data: ProjectsReviewsStorePayload,
      params: RequestParams = {},
    ) =>
      this.http.request<
        ReviewResource,
        | {
            /** Error overview. */
            message: string;
          }
        | {
            /** A detailed description of each field that failed validation. */
            errors: Record<string, string[]>;
            /** Errors overview. */
            message: string;
          }
      >({
        path: `/projects/${project}/reviews`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Screenshot
     * @name ProjectsScreenshotsDestroy
     * @request DELETE:/projects/{project}/screenshots/{media}
     */
    projectsScreenshotsDestroy: (
      project: number,
      media: number,
      data: ProjectsScreenshotsDestroyPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<
        {
          /** @example "Screenshot has been deleted successfully." */
          message: string;
        },
        {
          /** Error overview. */
          message: string;
        }
      >({
        path: `/projects/${project}/screenshots/${media}`,
        method: 'DELETE',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Screenshot
     * @name ProjectsScreenshotsStore
     * @request POST:/projects/{project}/screenshots
     */
    projectsScreenshotsStore: (
      project: number,
      data: ProjectsScreenshotsStorePayload,
      params: RequestParams = {},
    ) =>
      this.http.request<
        {
          /** @example "Screenshots has been saved successfully." */
          message: string;
        },
        | {
            /** Error overview. */
            message: string;
          }
        | {
            /** A detailed description of each field that failed validation. */
            errors: Record<string, string[]>;
            /** Errors overview. */
            message: string;
          }
      >({
        path: `/projects/${project}/screenshots`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Project
     * @name ProjectsShow
     * @request GET:/projects/{project}
     */
    projectsShow: (project: number, params: RequestParams = {}) =>
      this.http.request<
        ProjectFullResource,
        {
          /** Error overview. */
          message: string;
        }
      >({
        path: `/projects/${project}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Project
     * @name ProjectsStore
     * @request POST:/projects
     */
    projectsStore: (data: ProjectsStorePayload, params: RequestParams = {}) =>
      this.http.request<
        ProjectFullResource,
        | {
            /** Error overview. */
            message: string;
          }
        | {
            /** A detailed description of each field that failed validation. */
            errors: Record<string, string[]>;
            /** Errors overview. */
            message: string;
          }
      >({
        path: `/projects`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Project
     * @name ProjectsUpdate
     * @request PUT:/projects/{project}
     */
    projectsUpdate: (project: number, data: ProjectsUpdatePayload, params: RequestParams = {}) =>
      this.http.request<
        ProjectFullResource,
        | {
            /** Error overview. */
            message: string;
          }
        | {
            /** A detailed description of each field that failed validation. */
            errors: Record<string, string[]>;
            /** Errors overview. */
            message: string;
          }
      >({
        path: `/projects/${project}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  releases = {
    /**
     * No description
     *
     * @tags Release
     * @name ReleasesDownload
     * @request GET:/releases/{release}/download
     */
    releasesDownload: (release: number, params: RequestParams = {}) =>
      this.http.request<
        {
          link: string;
        },
        {
          /** Error overview. */
          message: string;
        }
      >({
        path: `/releases/${release}/download`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Release
     * @name ReleasesIndex
     * @request GET:/releases
     */
    releasesIndex: (query: ReleasesIndexParams, params: RequestParams = {}) =>
      this.http.request<
        {
          data: ReleaseFullResource[];
          links: {
            first: string | null;
            last: string | null;
            next: string | null;
            prev: string | null;
          };
          meta: {
            current_page: number;
            from: number | null;
            last_page: number;
            /** Generated paginator links. */
            links: {
              active: boolean;
              label: string;
              url: string | null;
            }[];
            /** Base path for paginator generated URLs. */
            path: string | null;
            /** Number of items shown per page. */
            per_page: number;
            /** Number of the last item in the slice. */
            to: number | null;
            /** Total number of items being paginated. */
            total: number;
          };
        },
        | {
            /** Error overview. */
            message: string;
          }
        | {
            /** A detailed description of each field that failed validation. */
            errors: Record<string, string[]>;
            /** Errors overview. */
            message: string;
          }
      >({
        path: `/releases`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Release
     * @name ReleasesUpdate
     * @request PUT:/releases/{release}
     */
    releasesUpdate: (release: number, data: ReleasesUpdatePayload, params: RequestParams = {}) =>
      this.http.request<
        ReleaseFullResource,
        | {
            /** Error overview. */
            message: string;
          }
        | {
            /** A detailed description of each field that failed validation. */
            errors: Record<string, string[]>;
            /** Errors overview. */
            message: string;
          }
      >({
        path: `/releases/${release}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  reviews = {
    /**
     * No description
     *
     * @tags Review
     * @name ReviewsDestroy
     * @request DELETE:/reviews/{review}
     */
    reviewsDestroy: (review: number, data: ReviewsDestroyPayload, params: RequestParams = {}) =>
      this.http.request<
        {
          /** @example "Review deleted successfully." */
          message: string;
        },
        {
          /** Error overview. */
          message: string;
        }
      >({
        path: `/reviews/${review}`,
        method: 'DELETE',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Review
     * @name ReviewsIndex
     * @request GET:/reviews
     */
    reviewsIndex: (query: ReviewsIndexParams, params: RequestParams = {}) =>
      this.http.request<
        {
          data: ReviewResource[];
          links: {
            first: string | null;
            last: string | null;
            next: string | null;
            prev: string | null;
          };
          meta: {
            current_page: number;
            from: number | null;
            last_page: number;
            /** Generated paginator links. */
            links: {
              active: boolean;
              label: string;
              url: string | null;
            }[];
            /** Base path for paginator generated URLs. */
            path: string | null;
            /** Number of items shown per page. */
            per_page: number;
            /** Number of the last item in the slice. */
            to: number | null;
            /** Total number of items being paginated. */
            total: number;
          };
        },
        | {
            /** Error overview. */
            message: string;
          }
        | {
            /** A detailed description of each field that failed validation. */
            errors: Record<string, string[]>;
            /** Errors overview. */
            message: string;
          }
      >({
        path: `/reviews`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Review
     * @name ReviewsShow
     * @request GET:/reviews/{review}
     */
    reviewsShow: (review: number, params: RequestParams = {}) =>
      this.http.request<
        ReviewResource,
        {
          /** Error overview. */
          message: string;
        }
      >({
        path: `/reviews/${review}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Review
     * @name ReviewsUpdate
     * @request PUT:/reviews/{review}
     */
    reviewsUpdate: (review: number, data: ReviewsUpdatePayload, params: RequestParams = {}) =>
      this.http.request<
        ReviewResource,
        | {
            /** Error overview. */
            message: string;
          }
        | {
            /** A detailed description of each field that failed validation. */
            errors: Record<string, string[]>;
            /** Errors overview. */
            message: string;
          }
      >({
        path: `/reviews/${review}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags User
     * @name UsersIndex
     * @request GET:/users
     */
    usersIndex: (query: UsersIndexParams, params: RequestParams = {}) =>
      this.http.request<
        {
          data: UserResource[];
          links: {
            first: string | null;
            last: string | null;
            next: string | null;
            prev: string | null;
          };
          meta: {
            current_page: number;
            from: number | null;
            last_page: number;
            /** Generated paginator links. */
            links: {
              active: boolean;
              label: string;
              url: string | null;
            }[];
            /** Base path for paginator generated URLs. */
            path: string | null;
            /** Number of items shown per page. */
            per_page: number;
            /** Number of the last item in the slice. */
            to: number | null;
            /** Total number of items being paginated. */
            total: number;
          };
        },
        {
          /** A detailed description of each field that failed validation. */
          errors: Record<string, string[]>;
          /** Errors overview. */
          message: string;
        }
      >({
        path: `/users`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UsersMe
     * @request GET:/users/me
     */
    usersMe: (params: RequestParams = {}) =>
      this.http.request<AuthResource, any>({
        path: `/users/me`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UsersMeDestroy
     * @request POST:/users/me/delete
     */
    usersMeDestroy: (data: UsersMeDestroyPayload, params: RequestParams = {}) =>
      this.http.request<
        {
          /** @example "You've deleted your account successfully." */
          message: string;
        },
        {
          /** A detailed description of each field that failed validation. */
          errors: Record<string, string[]>;
          /** Errors overview. */
          message: string;
        }
      >({
        path: `/users/me/delete`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UsersMeUpdate
     * @request PUT:/users/me
     */
    usersMeUpdate: (data: UsersMeUpdatePayload, params: RequestParams = {}) =>
      this.http.request<
        AuthResource,
        {
          /** A detailed description of each field that failed validation. */
          errors: Record<string, string[]>;
          /** Errors overview. */
          message: string;
        }
      >({
        path: `/users/me`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UsersShow
     * @request GET:/users/{user}
     */
    usersShow: (user: string, params: RequestParams = {}) =>
      this.http.request<
        UserResource,
        {
          /** Error overview. */
          message: string;
        }
      >({
        path: `/users/${user}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
}
