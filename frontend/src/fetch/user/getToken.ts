import { API_HOST } from "../../constants/API";

export type APIResponse =
  | {
      success: false;
    }
  | {
      success: true;
      data: {
        token: string;
        name: string;
      };
    };

type User = {
  email: string;
  password: string;
};

export default async function getToken(data: User): Promise<APIResponse> {
  return await fetch(`${API_HOST}/api/user/login`, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
