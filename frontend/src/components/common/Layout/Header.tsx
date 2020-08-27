import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { COLOR, SVG_ICON } from "../../../constants/style";
import { HEADER } from "../../../constants/layout";
import SVG from "../Svg";
import { fetchGet } from "../../../fetch";
import { format } from "util";

type CategoryType = {
  mainCategory: string;
  subCategory?: string;
};

type APIResponse = { success: boolean; data?: { no: string; name: string } };

const Layer = styled.div`
  z-index: 3000;
  position: fixed;
  top: 0;

  width: 100%;
  height: ${HEADER.SIZE}px;
  background-color: ${COLOR.GREEN_1};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Item = styled.div`
  width: 36px;
`;

const Title = styled.h2`
  color: #fff;
`;

const Header = ({ mainCategory, subCategory }: CategoryType): JSX.Element => {
  const token = localStorage.getItem("token");
  const userIcon = token ? "logout" : "login";
  const [categoryName, setCategoryName] = useState(mainCategory || "");
  useEffect(() => {
    if (subCategory) {
      fetchGet<APIResponse>(
        `/api/category/info/subcategory/${subCategory}`
      ).then((res: APIResponse) => setCategoryName(res.data?.name || ""));
    }
    return (): void => setCategoryName(mainCategory);
  }, [mainCategory, subCategory]);
  const history = useHistory();
  const goLogin = (): void => {
    history.push("/login");
  };
  const goLogout = (): void => {
    localStorage.removeItem("token");
    history.push("/");
  };
  return (
    <Layer>
      {history.location.pathname !== "/" ? (
        <Item onClick={(): void => history.goBack()}>
          <SVG size={36} fill={COLOR.WHITE} path={SVG_ICON.ARROW_BACK} />
        </Item>
      ) : (
        <Item></Item>
      )}
      <div>
        {categoryName ? (
          <Title>{categoryName}</Title>
        ) : (
          <img src="/asset/images/logo.png" width={"60px"} />
        )}
      </div>
      <Item onClick={userIcon === "login" ? goLogin : goLogout}>
        <img src={`/asset/icon/${userIcon}.svg`} width={"32px"} />
      </Item>
    </Layer>
  );
};

export default Header;
