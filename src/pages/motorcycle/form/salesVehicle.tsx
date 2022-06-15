import { Formik } from "formik";
import axios from "../../../utils/axios";
import { useContext } from 'react'
import styled from "styled-components/macro";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import ptBR from 'date-fns/locale/pt-BR';
import { Close } from '@material-ui/icons';
import DatePicker from '@material-ui/lab/DatePicker';
import NotificationContext from "../../../contexts/NotificationContext";
import { DataContext } from "../list/DataContext";
import * as Yup from "yup";
import {
  Grid,
  DialogContent,
  TextField,
} from "@material-ui/core";
import { 
  DefaultButton,
  SubGrid, 
  DialogActions  
} from '../../../components/Template';

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
  data_sales: Yup.date().typeError('Data é obrigatória').required('Data é obrigatória'),
  price: Yup.number().required('Preço da moto é obrigatória'),
  price_sales: Yup.number().required('Preço da venda é obrigatória'),
});

function SalesVehicle({ handleClose, vehicle , setSales}: Props) {
  const { openNotification } = useContext(NotificationContext);
  const { handleSubmit } = useContext(DataContext);

  let initialValues = {
    'id': vehicle?.id,
    'data_sales': null,
    'price': vehicle?.price,
    'price_sales': vehicle?.price,
  };

  //Create e Update na Api
  const handleApi = async (values: any) => {
      console.log('chamou aqui');  
      await axios.put('registration/vehicles', values).then(
        function (response: any) {
          const { message } = response.data;
          handleClose();
          handleSubmit();
          openNotification(message, true, 'success');
        });
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
        touched,
        errors,
      }) => (
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container >
              <SubGrid item xs={12}>
                <Image src={`${vehicle.image}`} />
              </SubGrid>
              <SubGrid item xs={4}>
                <TextField
                  name="price"
                  label="Preço*"
                  value={values.price}
                  size="small"
                  fullWidth
                  disabled
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                />
              </SubGrid>
              <SubGrid item xs={4}>
                <TextField
                  name="price_sales"
                  label="Preço Venda*"
                  value={values.price_sales}
                  size="small"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.price_sales && errors.price_sales)}
                  helperText={touched.price_sales && errors.price_sales}
                />
              </SubGrid>
              <SubGrid item xs={4}>
                {/* @ts-ignore */}
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                  <DatePicker
                    value={values.data_sales}
                    onChange={(val) => { setFieldValue("data_sales", val) }}
                    renderInput={(props) =>
                      <TextField {...props}
                        fullWidth
                        size="small"
                        id="data_sales"
                        name="data_sales"
                        label="Data Venda"
                        error={Boolean(touched.data_sales && errors.data_sales)}
                        helperText={touched.data_sales && errors.data_sales}
                      />
                    }
                  />
                </LocalizationProvider>
              </SubGrid>
            </ Grid>
            <DialogActions>
              <DefaultButton onClick={handleClose} variant="outlined" >
                <Close />
                Cancelar
              </DefaultButton>
              <DefaultButton onClick={() => { setSales(false) }} variant="contained">
                Voltar
              </DefaultButton>
              <DefaultButton type="submit" variant="contained">
                Finalizar Compra
              </DefaultButton>
            </DialogActions>
          </form>
        </DialogContent>
      )
      }
    </Formik >
  );
}

export default SalesVehicle;
