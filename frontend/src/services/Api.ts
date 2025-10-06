import { Resource } from "@/types/api";
import axios, { Axios, AxiosResponse } from "axios";
import { setCookie } from "cookies-next";

export class Api {
  public httpClient: Axios;

  constructor(baseURL: string) {
    const isServer = typeof window === "undefined";
    const resolvedBaseURL = isServer
      ? process.env.NEXT_PUBLIC_API_SERVER_URL
      : baseURL || process.env.NEXT_PUBLIC_API_CLIENT_URL;

    this.httpClient = axios.create({
      baseURL: resolvedBaseURL,
      responseType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  get<T>(url: string) {
    return this.httpClient
      .get<Resource<T>>(url)
      .then((axiosRes) => axiosRes.data)
      .then((resource) => resource.data);
  }

  getMyPosts<T>(url: string, token: string) {
    return this.httpClient
      .get<Resource<T>>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((axiosRes) => axiosRes.data)
      .then((resource) => resource.data);
  }

  auth<T>(url: string, email: string, password: string) {
    return this.httpClient
      .post<Resource<T>>(url, { email: email, password: password })
      .then((axiosRes) => axiosRes.data)
      .then((resource) => {
        const data = resource as any;
        if (data.access_token) {
          setCookie("token", data.access_token, {
            httpOnly: false,
            secure: true,
            sameSite: "strict",
            maxAge: data.expires_in,
            path: "/",
          });
        }

        return data as T;
      });
  }

  authMe<T>(url: string, token: string) {
    return this.httpClient
      .post<Resource<T>>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((axiosRes) => axiosRes.data)
      .then((resource) => resource.data);
  }

  delete<T>(url: string, token: string) {
    return this.httpClient
      .delete<Resource<T>>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((axiosRes) => axiosRes.data)
      .then((resource) => resource.data);
  }

  updatePost<T>(url: string, body: Object, token: string) {
    return this.httpClient
      .put<Resource<T>>(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((axiosRes) => axiosRes.data)
      .then((resource) => resource.data);
  }

  logout<T>(url: string, token: string) {
    return this.httpClient
      .post<Resource<T>>(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((axiosRes) => axiosRes.data)
      .then((resource) => resource.data);
  }
}

export const apiService = new Api(process.env.NEXT_PUBLIC_API_URL ?? '');
