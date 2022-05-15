import axiosInstance from "./BaseRequest";


const getPage = (index = 0, size = 10) => {
    return axiosInstance.get("/intention", {
        params: {
            page: index,
            size: size
        }
    })
}

const getAll = () => {
    return axiosInstance.get("/intention/all")
}
const update = (data) => {
    return axiosInstance.put("/intention", data)
}
const create = (data) => {
    return axiosInstance.post("/intention", data)
}
const deleteApi = (apiId) => {
    return axiosInstance.delete("/intention", {
        params: {intentionId: apiId}
    })
}

export default {getPage, getAll, update, create, deleteApi}
