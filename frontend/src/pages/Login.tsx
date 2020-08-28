import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { COLOR } from "../constants/style";
import { MESSAGE } from "../constants/message";

import { getToken } from "../fetch/user";
import { PopUpContext } from "../contexts";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.YELLOW_1};
  padding: 20px;
`;

const Image = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.div`
  margin-top: 70px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  padding: 0 10px;
  background: #ffffff63;
  border: 0;
  outline: none;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  background-color: ${COLOR.GREEN_1};
  color: ${COLOR.WHITE};
  border-radius: 5px;
  border: 0;
  margin-top: 20px;
  font-size: 1rem;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
`;

const Bottom = styled.div`
  width: 100%;
  margin-top: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > button {
    margin-bottom: 10px;
    border: 0;
    background-color: transparent;
    padding: 5px;
    color: ${COLOR.GREEN_1};
    font-weight: 600;
    font-size: 1rem;
  }
`;

const Login = (): JSX.Element => {
  const history = useHistory();
  const popupDispatch = PopUpContext.usePopUpDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.persist();
    // console.log(e, user);
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const loginActions = (): void => {
    // 이메일, 비밀번호 확인
    if (!user.email) {
      popupDispatch({
        type: "POPUP_OPEN",
        payload: {
          content: MESSAGE.USER_EMAIL_EMPTY,
          confirmAction: (): void =>
            popupDispatch({
              type: "POPUP_CLOSE",
            }),
        },
      });
      return;
    }
    if (!user.password) {
      popupDispatch({
        type: "POPUP_OPEN",
        payload: {
          content: MESSAGE.USER_PASSWORD_EMPTY,
          confirmAction: (): void =>
            popupDispatch({
              type: "POPUP_CLOSE",
            }),
        },
      });
      return;
    }

    getToken(user).then((res) => {
      if (res.success) {
        // TODO: 사용자 정보 저장?
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("token", res.data.token);
        history.push("/");
      } else {
        // 로그인 실패
        popupDispatch({
          type: "POPUP_OPEN",
          payload: {
            content: MESSAGE.USER_LOGIN_ERROR,
            confirmAction: (): void =>
              popupDispatch({
                type: "POPUP_CLOSE",
              }),
          },
        });
      }
    });
  };

  const goRegister = (): void => {
    history.push("/register");
  };

  const goMain = (): void => {
    history.push("/");
  };

  return (
    <Wrapper>
      <Image>
        <img src="/asset/images/gom.png" width={"50%"} />
        <img src="/asset/images/logo_horizon.png" width={"50%"} />
      </Image>
      <Form>
        <Input
          name="email"
          type="text"
          onChange={onChange}
          placeholder="이메일"
        />
        <Input
          name="password"
          type="password"
          onChange={onChange}
          placeholder="비밀번호"
        />
        <Button onClick={loginActions}>로그인</Button>
      </Form>
      <Bottom>
        <button onClick={goRegister}>회원가입</button>
        <button onClick={goMain}>메인으로</button>
      </Bottom>
    </Wrapper>
  );
};

export default Login;
