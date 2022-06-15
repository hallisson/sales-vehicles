import React from "react";
import styled from "styled-components/macro";
import {
  Paper,
  Typography as MuiTypography,
} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import SignInComponent from "../../components/auth/SignIn";
import Container from '@material-ui/core/Container';
const Wrapper = styled(Paper)`
  background-color: #0000006B;
  position: absolute;
  width: 550px;
`;

const Typography = styled(MuiTypography)`
  font-size: 14px;
  font-weight: bold;
  color: black;
`;

const ContainerForm = styled(Container)`
  background-color: #DEDEDE;
  text-align: center;
  padding: 23px 30px 30px ;
  height: 100%
`;

const Image = styled.img`
  width: 155px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  display: block;
`;

const ImageFundo = styled.img`
  text-align: center;
`;

const ContainerLogo = styled(Container)`
  height: 300px;
  text-align: center;
  padding-top:45px;
  position: relative
`;

function Login() {
  return (
    <React.Fragment>
      <ImageFundo style={{ position: 'fixed' }} src={`/static/fundo.jpeg`} />
      <Wrapper>
        <Grid container>
          <Grid item xs={5}>
            <ContainerLogo maxWidth="sm">
              <Image
                src={`/static/logoLogin.png`}
              />
            </ContainerLogo>
          </Grid>
          <Grid item xs={7}>
            <ContainerForm >
              <Typography color="inherit">
                Venda de Motos
              </Typography>
              <SignInComponent />
            </ContainerForm>
          </Grid>
        </Grid>
      </Wrapper>
    </React.Fragment>
  );
}

export default Login;
