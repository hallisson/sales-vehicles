import styled from "styled-components/macro";
import { useContext } from "react";
import { Close } from '@material-ui/icons';
import axios from "../../../utils/axios";
import { DataContext } from "../list/DataContext";
import {
  Dialog,
  Grid,
  Grid as MuiGrid,
  DialogContent,
  Button as MuiButton,
  DialogActions as MuiDialogActions,
  Typography as MuiTypography,
} from "@material-ui/core";

type Props = {
  open: boolean,
  setOpen: any,
  vehicle: any,
}

const SubGrid = styled(MuiGrid)`padding: 5px;`;

const DefaultButton = styled(MuiButton)`
	border-radius: 15px;
  	padding: 3px 21px;
  	font-weight: 300;
	box-shadow: 0px 3px 6px #69696929;
`;
const Typography = styled(MuiTypography)`
 	font-size: 16px;
 	font-weight: 500;
 	padding: 5px;
 	color: ${(props) => props.theme.palette.primary.main};
`;
const DialogActions = styled(MuiDialogActions)`
	justify-content : center;
	margin: 20px 0px;
`;

const ModalDelete = ({ vehicle, open, setOpen }: Props) => {
  const { handleSubmit } = useContext(DataContext)

  const handleDelete = async () => {
    await axios.post('registration/vehicles/delete', {id : vehicle.id}).then(
      function (response) {
        handleClose();
        handleSubmit();
      })
      .catch(async (error) => {
        console.log('não excluiu')
      });
  };

  const handleClose = () => {setOpen(false)}

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={'md'}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Grid container>
          <SubGrid item xs={12}>
            <Typography variant="h4">
              Deseja realmente excluir essa Moto?
            </Typography>
          </SubGrid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <DefaultButton onClick={handleClose} variant="outlined" >
          <Close />
          Cancelar
        </DefaultButton>
        <DefaultButton onClick={handleDelete} variant="contained">
          Deletar
        </DefaultButton>
      </DialogActions>
    </Dialog>
  );
}
export default ModalDelete
