import { createContext, ReactNode, useEffect, useReducer } from "react";

import { JWTContextType, ActionMap, AuthState, AuthUser } from "../types/auth";

import axios from "../utils/axios";
import { setSession } from "../utils/jwt"

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const SIGN_UP = "SIGN_UP";

type AuthActionTypes = {
  [INITIALIZE]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [SIGN_IN]: {
    user: AuthUser;
  };
  [SIGN_OUT]: undefined;
  [SIGN_UP]: {
    user: AuthUser;
  };
};

const initialState: AuthState = {
  isAuthenticated: true,
  isInitialized: false,
  user: null,
};

const JWTReducer = (
  state: AuthState,
  action: ActionMap<AuthActionTypes>[keyof ActionMap<AuthActionTypes>]
) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case "SIGN_IN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        tenant: 'corpvs',
      };
    case "SIGN_OUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        tenant: '',
      };

    case "SIGN_UP":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        tenant: '',
      };

    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken) {
          setSession(accessToken);
        } else {
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await axios.post("/api/auth/sign-in", {
      email,
      password,
    });
    const { token, data } = response.data;
    let user = data;
    setSession(token);
    dispatch({
      type: SIGN_IN,
      payload: {
        user,
      },
    });
  };

  const signOut = async () => {
    setSession(null);
    dispatch({ type: SIGN_OUT });
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    const response = await axios.post("/login", {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem("accessToken", accessToken);
    dispatch({
      type: SIGN_UP,
      payload: {
        user,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
