import { API_HOST } from "../constants/API";

export type APIResponse =
  | {
      success: false;
    }
  | {
      success: true;
      data: Array<{ [key: string]: any }>;
    };

export async function get(url: string) {
  return await fetch(`${API_HOST}${url}`, {
    mode: "cors",
    method: "GET",
  }).then((res) => {
    const r = res.json();
    return r;
  });
}

export async function post(url: string, data: { [key: string]: any }) {
  return await fetch(`${API_HOST}${url}`, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
