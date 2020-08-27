import { API_HOST } from "../../constants/API";

export type APIResponse =
  | {
      success: false;
    }
  | {
      success: true;
    };

type User = {
  email: string;
  password: string;
};

export default async function userRegister(data: User): Promise<APIResponse> {
  return await fetch(`${API_HOST}/api/user/register`, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
