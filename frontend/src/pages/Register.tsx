import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { COLOR, SVG_ICON } from "../constants/style";
import { MESSAGE } from "../constants/message";
import { SVG } from "../components/common";

import { PopUpContext } from "../contexts";
import { emailCheck, userRegister } from "../fetch/user";

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
  margin-top: 20px;
  width: 100%;
`;

const Input = styled.input`
  outline: none;
  background: transparent;
  border: 0;
  margin-left: 10px;
  height: 100%;
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  background-color: ${COLOR.GREEN_1};
  color: ${COLOR.WHITE};
  border-radius: 5px;
  border: 0;
  margin-top: 70px;
  font-size: 1rem;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
`;

const Bottom = styled.div`
  width: 100%;
  margin-top: 70px;
  text-align: center;
  color: ${COLOR.GREEN_1};
  font-weight: 600;
  outline: none;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  padding: 0 10px;
  background: #ffffff63;
  border: 0;
  display: flex;
  align-items: center;
`;

type Item = {
  name: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  svg: string;
};

const InputComp = (item: Item): JSX.Element => {
  const { name, type, svg, onChange, placeholder } = item;
  return (
    <InputWrapper>
      <SVG path={svg} fill={COLOR.GREY_2} size={24}></SVG>
      <Input
        name={name}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
    </InputWrapper>
  );
};

const Register = (): JSX.Element => {
  const history = useHistory();
  const popupDispatch = PopUpContext.usePopUpDispatch();
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    passwordCheck: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.persist();
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const openPopUp = (message: string): void => {
    popupDispatch({
      type: "POPUP_OPEN",
      payload: {
        content: message,
        confirmAction: (): void =>
          popupDispatch({
            type: "POPUP_CLOSE",
          }),
      },
    });
  };

  const registerActions = (): void => {
    // 이메일, 비밀번호 확인
    if (!user.email) {
      openPopUp(MESSAGE.USER_EMAIL_EMPTY);
      return;
    }
    if (!user.name) {
      openPopUp(MESSAGE.USER_NAME_EMPTY);
      return;
    }
    if (!user.password) {
      openPopUp(MESSAGE.USER_PASSWORD_EMPTY);
      return;
    }
    if (user.password.length < 8) {
      openPopUp(MESSAGE.USER_PASSWORD_LENGTH);
      return;
    }
    if (!user.passwordCheck) {
      openPopUp(MESSAGE.USER_PASSWORD_CHECK_EMPTY);
      return;
    }
    if (user.password !== user.passwordCheck) {
      openPopUp(MESSAGE.USER_PASSWORD_CHECK_CORRECT);
      return;
    }

    emailCheck(user.email).then((res) => {
      if (res.success) {
        if (res.isUserEmail) {
          openPopUp(MESSAGE.USER_EMAIL_EXIST);
          return;
        } else {
          const data = {
            email: user.email,
            name: user.name,
            password: user.password,
          };
          userRegister(data).then((res) => {
            if (res.success) {
              popupDispatch({
                type: "POPUP_OPEN",
                payload: {
                  content: MESSAGE.USER_REGISTER_SUCCESS,
                  confirmAction: (): void => {
                    popupDispatch({ type: "POPUP_CLOSE" });
                    history.push("/login");
                  },
                },
              });
            } else {
              openPopUp(MESSAGE.USER_EMAIL_EXIST);
            }
          });
        }
      }
    });
  };

  const goLogin = (): void => {
    history.push("/login");
  };

  return (
    <Wrapper>
      <Image>
        <img src="/asset/images/logo.png" width={"50%"} />
      </Image>
      <Form>
        <InputComp
          name="email"
          type="text"
          onChange={onChange}
          placeholder="이메일"
          svg={SVG_ICON.EMAIL}
        />
        <InputComp
          name="name"
          type="text"
          onChange={onChange}
          placeholder="이름"
          svg={SVG_ICON.USER_NAME}
        />
        <InputComp
          name="password"
          type="password"
          onChange={onChange}
          placeholder="비밀번호"
          svg={SVG_ICON.PASSWORD}
        />
        <InputComp
          name="passwordCheck"
          type="password"
          onChange={onChange}
          placeholder="비밀번호 확인"
          svg={SVG_ICON.PASSWORD_CHECK}
        />
        <Button onClick={registerActions}>가입하기</Button>
      </Form>
      <Bottom>
        <p onClick={goLogin}>돌아가기</p>
      </Bottom>
    </Wrapper>
  );
};

export default Register;
