import axiosInstance from "./BaseRequest";
import {useCookies} from '@vueuse/integrations/useCookies';
import {LoginCookieKey, UserInfoCookieKey} from "../config/LoginConfig";

const cookies = useCookies();
const login = (username, password) => {
    return axiosInstance.post("/login", {username, password})
}

const logout = () => {
    cookies.remove(UserInfoCookieKey)
    cookies.remove(LoginCookieKey)
}
const get = username => axiosInstance.get("/user", {params: {username}})

export default {login, logout, get}