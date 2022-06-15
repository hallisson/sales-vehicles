import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components/macro";

import { CssBaseline } from "@material-ui/core";

import GlobalStyle from "../components/GlobalStyle";

const Root = styled.div`
  max-width: 520px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const Auth: React.FC = ({children}) => {
  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      {children}
      <Outlet />
    </Root>
  );
};

export default Auth;
