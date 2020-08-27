import { API_HOST } from "../../constants/API";

export type APIResponse =
  | {
      success: false;
    }
  | {
      success: true;
      isUserEmail: boolean;
    };

type User = {
  email: string;
  password: string;
};

export default async function emailCheck(email: string): Promise<APIResponse> {
  return await fetch(`${API_HOST}/api/user/email/${email}`, {
    mode: "cors",
    method: "GET",
  }).then((res) => res.json());
}
