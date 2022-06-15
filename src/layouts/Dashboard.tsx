import styled from "styled-components/macro";
import { useState } from 'react'
import { Outlet } from "react-router-dom";
import { CssBaseline, Paper as MuiPaper } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import NotificationContext from "../contexts/NotificationContext";
import { Snackbar, Alert, AlertColor } from '@material-ui/core';
import GlobalStyle from "../components/GlobalStyle";
import Navbar from "../components/Navbar";
import { TypeNotific } from "../types/notification"

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

//@ts-ignore
const Dashboard = ({ children }) => {
  const [notific, setNotific] = useState<TypeNotific>({ message: '', severity: "success" })
  const [open, setOpen] = useState<boolean>(false);


  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function openNotification(message: string, open: boolean, severity: AlertColor) {
    setNotific({ message: message, severity: severity })
    setOpen(open);
  }

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <NotificationContext.Provider value={{ openNotification }}>
        <AppContent>
          <Navbar />
          <MainContent p={1}>
            {children}
            <Outlet />
          </MainContent>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message="Note archived"
          >
            <Alert severity={notific.severity} variant="filled" onClose={handleClose}>{notific.message}</Alert>
          </Snackbar>
        </AppContent>
      </ NotificationContext.Provider>
    </Root>
  );
};

export default Dashboard;
