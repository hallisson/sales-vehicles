import React, { useState } from "react";
import Filter from "./filter";
import { Grid, Stack, LinearProgress } from "@material-ui/core";
import CreateMotocycle from "../form";
import axios from "../../../utils/axios";
import ModalDelete from "../form/modalDelete";
import CardVehicle from './cardVehicle';
import { Vehicle } from '../../../types/vehicle';
import { DataContext } from './DataContext';
import {
  TitlePge,
  Container,
  CardLst,
} from '../../../components/Template';

interface filterForm {
  description ?: string
}

function List() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [openVehicle, setOpenVehicle] = useState<boolean>(false)
  const [remove, setRemove] = useState<boolean>(false);
  const [rows, setRows] = useState<Array<Vehicle>>([]);
  const [formValues, setFormValues] = useState<filterForm>({});
  const [page] = React.useState(1);

  async function handleSubmit(val?: filterForm){
    setIsLoading(true)
    if (val === undefined) val = formValues
    await axios.get('/api/vehicles', { params: { ...val, pages: page } }).then(
      function (response : any) {
        const { vehicles } = response.data;
        setRows(vehicles);
      });

    if (val !== undefined) setFormValues(val);
    setIsLoading(false)
  };

  async function handleEdit(vehicle: Vehicle){
    setVehicle(vehicle)
    setOpenVehicle(true)
  };

  async function handleDelete(vehicle: Vehicle){
    setVehicle(vehicle);
    setRemove(true);
  };

  return (
    <React.Fragment>
      <DataContext.Provider value={{ handleSubmit, handleEdit, handleDelete }}>
        <Container>
          <CardLst>
            <TitlePge>Lista de Motos</TitlePge>
            <Filter />
            {isLoading && (
              <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color="primary" />
              </Stack>
            )}
            <Grid container >
              {rows.map((vehicle : any) => { return (<CardVehicle vehicle={vehicle}/>)})}
            </ Grid>
          </ CardLst>
          { openVehicle && 
            (<CreateMotocycle
              setOpenCreate={setOpenVehicle}
              openCreate={openVehicle}
              vehicle={vehicle}
            />)
          }
          {remove && (
            <ModalDelete 
              open={remove}
              setOpen={setRemove}
              vehicle={vehicle}
            />
          )}
        </Container>
      </DataContext.Provider>
    </React.Fragment >
  );
}

export default List;
