import { useContext } from "react";
import { DataContext } from './DataContext'
import { Formik } from "formik";
import styled from "styled-components/macro";
import * as Yup from "yup";
import {
  TextField as MuiTextField,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import {
  SubGrid,
  GridFilter,
  ButtonSearch,
} from '../../../components/Template';

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);
const initialValues = {
  description: '',
  brand: '',
};

const validationSchema = Yup.object().shape({
  description: Yup.string().max(255),
  brand: Yup.string().max(100),
});

const Filter = () => {
  const { handleSubmit } = useContext(DataContext)
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
        <form onSubmit={handleSubmit}>
          <GridFilter container >
            <SubGrid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <TextField
                id="description"
                name="description"
                label="Descrição"
                size="small"
                fullWidth
                variant="standard"
                value={values.description}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </SubGrid>
            <SubGrid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <TextField
                name="brand"
                label="Marca"
                size="small"
                fullWidth
                variant="standard"
                error={Boolean(touched.brand && errors.brand)}
                helperText={touched.brand && errors.brand}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </SubGrid>
            <SubGrid item xs={1}>
              <ButtonSearch
                variant="contained"
                size="small"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Pesquisar
              </ButtonSearch>
            </SubGrid>
          </GridFilter>
        </form>
      )}
    </Formik>
  );
}

export default Filter
