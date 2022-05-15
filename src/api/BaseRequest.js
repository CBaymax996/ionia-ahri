import axios from "axios";
import {baseUrl} from "../config/ApiConfig";
import {useCookies} from '@vueuse/integrations/useCookies';
import {LoginCookieKey, LoginHeaderKey} from "../config/LoginConfig";

const cookies = useCookies();
const axiosInstance = axios.create({
    baseURL: baseUrl
})

axiosInstance.interceptors.request.use(config => {
    let token = cookies.get(LoginCookieKey);
    if (token !== undefined) {
        config.headers[LoginHeaderKey] = token
    }
    return config;
})

export default axiosInstance;
