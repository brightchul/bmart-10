import { API_HOST } from "../constants/API";

export type APIResponse = {
  success: boolean;
  data?: Array<{ [key: string]: string }>;
};

export async function fetchGet<T>(url: string): Promise<T> {
  return await fetch(`${API_HOST}${url}`, {
    mode: "cors",
    method: "GET",
  }).then((res) => {
    const r = res.json();
    return r;
  });
}

export async function fetchPost<T>(
  url: string,
  data: { [key: string]: string }
): Promise<T> {
  return await fetch(`${API_HOST}${url}`, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
