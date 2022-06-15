import styled from "styled-components/macro";
import { useContext } from "react"
import { Flex1, FlexBoxRow } from "../../../components/Template";
import { DataContext } from "./DataContext";
import { Vehicle } from '../../../types/vehicle';
import {
  Grid,
  Button as MuiButton,
  Grid as MuiGrid,
  Typography as MuiTypography,
} from "@material-ui/core";

const Typography = styled(MuiTypography)`
  color: ${(props) => props.theme.palette.mode !== "dark" ? '#000000' : 'white'};
  font-size: 11px;
  font-weight: 700;
`;

const GridCard = styled(MuiGrid)`
  border-radius: 14px;
  padding: 7px;
  margin-bottom: 4px;
`;

const Button = styled(MuiButton)`width : 45%;`

const Image = styled.img`
  width: 100%;
  max-height: 125px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  display: block;
`;

type Props =  { 
 vehicle : Vehicle
}

function CardVehicle({ vehicle }: Props) {
  const { handleEdit, handleDelete } = useContext(DataContext)

  return (
    <GridCard item xs={12} sm={4} md={3} lg={3} xl={2} key={vehicle.id}>
      <Grid container>
        <Grid item xs={12}>
          <Image
            src={`${vehicle.image}`}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>{vehicle?.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Marca: { vehicle?.brand}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Cilindrada: {vehicle?.cilindradas}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Preço: R$ {vehicle?.price}</Typography>
        </Grid>
        <Grid item xs={12}>
          <FlexBoxRow>
            <Button 
              variant="contained"
              size="small"
              color="primary"
              onClick={() => handleEdit(vehicle)}
            >
              Destalhes
            </Button>
            <Flex1 />
            <Button 
              variant="contained"
              size="small"
              color="error"
              onClick={() => handleDelete(vehicle)}
            >
              Excluir
            </Button>
          </FlexBoxRow>
        </Grid>
      </Grid>
    </GridCard>
  );
};

export default CardVehicle;
