import * as React from "react";
import styled from "styled-components/macro";
import { Menu as MenuIcon } from "react-feather";
import { useNavigate } from "react-router-dom";

import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from "@material-ui/core";

import useAuth from "../hooks/useAuth";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

function NavbarUserDropdown() {
  const [anchorMenu, setAnchorMenu] = React.useState<any>(null);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const toggleMenu = (event: React.SyntheticEvent) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleDashBoard = async () => { navigate("/dashboard") };

  const handleperfil = async () => { navigate("/perfil") };

  return (
    <React.Fragment>
      <Tooltip title="Menu">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
          size="large"
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={handleDashBoard}>Lista Motos</MenuItem>
        <MenuItem onClick={handleperfil}>Perfil</MenuItem>
        <MenuItem onClick={handleSignOut}>Sair</MenuItem>

      </Menu>
    </React.Fragment>
  );
}

export default NavbarUserDropdown;
