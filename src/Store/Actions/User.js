import { FETCH_USER_LOGIN } from "./Type";
import UserService from "../../Services/User";
import { restConnector } from "../../Connectors/Axios";

export const Signup = (values, replace) => {
  return dispatch => {
    UserService.Login(values)
      .then(res => {
        localStorage.setItem("loginUser", JSON.stringify(res.data));
        restConnector.defaults.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
        dispatch(actFetchLoginUser(res.data));
        replace("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
};   
export const actFetchLoginUser = user => ({
  type: FETCH_USER_LOGIN,
  payload:user
});