import { ThemeProps } from "styled-components/macro";
import { Theme } from "@material-ui/core";

export type GlobalStyleProps = {
  theme: ThemeProps<Theme> & { palette: any };
};
