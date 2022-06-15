import React from "react";
import styled, { withTheme } from "styled-components/macro";
import {
  Grid,
  AppBar as MuiAppBar,
  Toolbar as MuiToolbar,
} from "@material-ui/core";
import NavbarUserDropdown from "./NavbarUserDropdown";

const Toolbar = styled(MuiToolbar)`min-height : 50px;`
const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
`;

type NavbarProps = {
  theme: {};
};

const Navbar: React.FC<NavbarProps> = () => {

  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs />
            <Grid item>
              <NavbarUserDropdown />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withTheme(Navbar);
