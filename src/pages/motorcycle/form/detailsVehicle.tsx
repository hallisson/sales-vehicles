import { useState } from "react";
import { Formik } from "formik";
import axios from "../../../utils/axios";
import styled from "styled-components/macro";
import { Close } from '@material-ui/icons';
import * as Yup from "yup";
import {
  Grid,
  DialogContent,
  Grid as MuiGrid,
  TextField,
} from "@material-ui/core";
import { 
  DefaultButton, 
  DialogActions as MuiDialogActions
} from '../../../components/Template';

const DialogActions = styled(MuiDialogActions)`
  margin-top: 30px;
`;

const SubGrid = styled(MuiGrid)`
  display : flex;
  padding: 5px;
`;

const Image = styled.img`
  width: 100%;
  max-height: 425px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  display: block;
`;

type Props = {
  handleClose: any,
  setSales: any,
  vehicle: any,
}

const validationSchema = Yup.object().shape({
  CLI_ID: Yup.number().typeError('Cliente é Obrigatório'),
  status: Yup.string().max(12),
  description: Yup.string().max(255).typeError('Descrição obrigatória'),
  code: Yup.string().max(100).typeError('Código Inválido'),
});

function DetailsVehicle({ handleClose, vehicle, setSales }: Props) {
  const [data, setData] = useState(vehicle)

  let initialValues = {
    'id': vehicle?.id ,
    'price': vehicle?.price,
    'name': vehicle?.name,
    'cilindradas': vehicle?.cilindradas,
    'brand': vehicle?.brand,
    'year':  vehicle?.year,
  };

  //Create e Update na Api
  const handleApi = async (values: any) => {
    if (data) {
      await axios.put('registration/points/' + data.id, values).then(
        function (response :  any) {
          const { message } = response.data;
          console.log(message)
        });
    } else {
      await axios.post('registration/points', values).then(
        function (response: any) {
          const { newPoint } = response.data;
          setData(newPoint)
          console.log(newPoint)
        });
    }
  };


  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleApi}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        values,
      }) => (
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container >
              <SubGrid item xs={12}>
                <Image src={`${vehicle.image}`} />
              </SubGrid>
              <SubGrid item xs={12}>
                <TextField
                  name="name"
                  disabled
                  label="Descrição*"
                  value={values.name}
                  size="small"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </SubGrid>
              <SubGrid item xs={6}>
                <TextField
                  name="price"
                  label="Preço"
                  disabled
                  value={values.price}
                  size="small"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </SubGrid>
              <SubGrid item xs={6}>
                  <TextField
                    name="cilindradas"
                    label="Cilindradas"
                    disabled
                    value={values.cilindradas}
                    size="small"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
              </SubGrid>
              <SubGrid item xs={6}>
                <TextField
                  name="brand"
                  disabled
                  label="Marca"
                  value={values.brand}
                  size="small"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </SubGrid>
              <SubGrid item xs={6}>
                <TextField
                  name="year"
                  label="Ano"
                  disabled
                  value={values.year}
                  size="small"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </SubGrid>
            </ Grid>
            <DialogActions>
              <DefaultButton onClick={handleClose} variant="outlined" >
                <Close />
                Cancelar
              </DefaultButton>
              <DefaultButton onClick={() => { setSales(true) }} variant="contained">
                Vender
              </DefaultButton>
            </DialogActions>
          </form>
        </DialogContent>
      )
      }
    </Formik >
  );
}

export default DetailsVehicle;
