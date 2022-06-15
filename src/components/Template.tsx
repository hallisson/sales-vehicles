import styled from "styled-components/macro";
import {
  Grid as MuiGrid,
  Button as MuiButton,
  Card as MuiCard,
  Typography as MuiTypography,
  DialogActions as MuiDialogActions,
} from "@material-ui/core";

export const SubGrid = styled(MuiGrid)`
    margin-top: 3px;
    padding: 2px 5px;
`;

export const GridFilter = styled(MuiGrid)`
	border: 1px solid ${(props) => props.theme.palette.secondary.main};
    border-radius: 8px;
    padding: 15px;
`;

export const LabelRadio = styled.span`
	font-size: 10px;
    font-weight: 400;
    line-height: 1.4375em;
    padding: 0;
`;

export const ButtonSearch = styled(MuiButton)`
	padding: 4px 10px;
	margin-top: 17px;
	font-size: 12px;
	font-weight: 300;
`;

export const TitlePge = styled(MuiTypography)`
    font-size: 16px;
    font-weight: 800;
    padding: 5px;
    margin-bottom: 12px;
    color: ${(props) => props.theme.palette.primary.main};
`;

export const SubGridLst = styled(MuiGrid)`
  margin-top: 12px;
  border-radius: 4px;
  padding : 0px;
`;

export const Container = styled.div`
	padding : 10px;
`;

export const CardLst = styled(MuiCard)`
	padding: 13px;
`;

export const DefaultButton = styled(MuiButton)`
	border-radius: 15px;
  padding: 3px 21px;
  font-weight: 300;
	box-shadow: 0px 3px 6px #69696929;
`;

export const DialogActions = styled(MuiDialogActions)`
	justify-content : rigth;
	margin-top: 20px;
`;

export const Flex1 = styled.div`
  flex: 1;
`;

export const FlexBoxRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
`;
