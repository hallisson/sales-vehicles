import React, { useState } from "react";
import styled from "styled-components/macro";
import DetailsVehicle from "./detailsVehicle";
import SalesVehicle from "./salesVehicle";
import { FlexBoxRow, Flex1 } from '../../../components/Template';
import {
  Dialog,
  DialogTitle,
  Typography as MuiTypography,
} from "@material-ui/core";

const Typography = styled(MuiTypography)`
 font-size: 16px;
 font-weight: 500;
 padding: 5px;
 color: ${(props) => props.theme.palette.primary.main};
`;

type Props = {
  openCreate: boolean,
  setOpenCreate: any,
  vehicle: any,
}

function CreateMotocycle({ openCreate, setOpenCreate, vehicle }: Props) {
  const [sales , setSales ] = useState<boolean>(false)
  const handleClose = () => {
    setOpenCreate(false)
  }

  return (
    <React.Fragment>
      <Dialog
        maxWidth={'md'}
        open={openCreate}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          <FlexBoxRow>
            <Typography color="inherit">
              Detalhes da Moto
            </Typography>
            <Flex1 />
          </FlexBoxRow>
        </DialogTitle>
        {sales ? 
            (<SalesVehicle handleClose={handleClose} vehicle={vehicle} setSales={setSales}/>)
            : (<DetailsVehicle handleClose={handleClose} vehicle={vehicle} setSales={setSales}/>)
        }
      </Dialog>
    </React.Fragment >
  );
}

export default CreateMotocycle;
