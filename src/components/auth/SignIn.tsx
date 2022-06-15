import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import * as Yup from "yup";
import { Formik } from "formik";
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import {
  Alert as MuiAlert,
  Button as MuiButton,
  TextField,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

import useAuth from "../../hooks/useAuth";

const Alert = styled(MuiAlert)(spacing);
const ButtonStart = styled(MuiButton)`
  margin-top: 20px;
  font-size: 14px;
  font-weight: 500;
`;

function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  
  const [stateInfor, setStateInfor] = useState();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email não é válido").max(255).required("Email é obrigatório"),
    password: Yup.string().max(255).required("Senha é obrigatória"),
  });

  useEffect(() => {
    setStateInfor(stateInfor)
  }, [stateInfor]);

  return (
    <Formik
      initialValues={{
        email: "",
        resetEmail: "",
        password: "",
        conpany: "",
        submit: false,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await signIn(values.email, values.password);
          navigate(`/dashboard`);
        } catch (error: any) {
          const message = error.message || "Usuário ou senha Incorretos";
          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <>
            {errors.submit && (
              <Alert mt={1} mb={1} severity="warning">
                {errors.submit}
              </Alert>
            )}
            <TextField
              type="email"
              name="email"
              label="Email"
              value={values.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              style={{marginTop: '20px'}}
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <TextField
              type="password"
              name="password"
              label="Senha"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              fullWidth
              style={{marginTop: '20px'}}
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
            />
            <ButtonStart
              type="submit"
              fullWidth
              variant="contained"
              style={{marginTop: '20px'}}
              disabled={isSubmitting}
            >
              Entrar
            </ButtonStart>
          </>
        </form>
      )}
    </Formik>
  );
}

export default SignIn;
