/** @format */

import { userService } from "../services/user.service.js";
import { userConstants } from "../constants/user.constants";
import { push } from "connected-react-router";
import swal from "sweetalert";
export const userActions = {
  login,
  logout,
  reclaimPasswordByEmail,
  resetPassword,
};

function login(email, password) {
  return (dispatch) => {
    userService
      .login(email, password)
      .then((token) => {
        dispatch(success(token));
        localStorage.setItem("token", JSON.stringify(token));

        if (token.status == 200) {
          dispatch(push("/"));
        } else {
          swal("Incorrect username and password", "success");
          swal("Login fails!", "Incorrect username and password", "error");
        }
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
      });
  };

  // function request(email) { return { type: userConstants.LOGIN_REQUEST, email } }
  function success(token) {
    return { type: userConstants.LOGIN_SUCCESS, token };
  }

  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  localStorage.removeItem("token");
  // return (dispatch) => {
  //   userService.logout().finally(() => {
  //     dispatch({ type: userConstants.LOGOUT });
  //     localStorage.removeItem("token");
  //   });
  // };
}

function reclaimPasswordByEmail(email) {
  return userService.reclaimPasswordByEmail(email);
}

function resetPassword(email, signature) {
  return userService.resetPassword(email, signature);
}
