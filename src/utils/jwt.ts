import { verify, sign } from "jsonwebtoken";
import axios from "./axios";

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

export { verify, sign, setSession };
