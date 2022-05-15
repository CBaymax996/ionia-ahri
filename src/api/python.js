import axiosInstance from "./BaseRequest";


const cut = (text) => {
    return axiosInstance.get("/python/cut", {
        params: {text: text}
    })
}
const chat = (question) => {
    return axiosInstance.get("/python/chat", {
        params: {question: question}
    })
}


export default {cut, chat}
