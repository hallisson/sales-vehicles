import React from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  TitlePge,
  Container,
  CardLst,
  SubGrid,
  GridFilter,
} from '../../components/Template';
import {
  TextField as MuiTextField,
} from "@material-ui/core";

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

function List() {
  return (
    <React.Fragment>
        <Container>
          <CardLst>
            <TitlePge>Meu Perfil</TitlePge>
            <GridFilter container >
              <SubGrid item xs={12} sm={6} md={4} lg={4} xl={4}>
                <TextField
                  id="name"
                  name="name"
                  label="Nome"
                  size="small"
                  fullWidth
                />
              </SubGrid>
              <SubGrid item xs={12} sm={6} md={4} lg={4} xl={4}>
                <TextField
                  name="email"
                  label="Email"
                  size="small"
                  fullWidth
                />
              </SubGrid>
            </GridFilter>
          </ CardLst>
        </Container>
    </React.Fragment >
  );
}

export default List;
