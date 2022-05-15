import axiosInstance from "./BaseRequest";


const getPage = (index = 0, size = 10) => {
    return axiosInstance.get("/remote_service", {
        params: {
            page: index,
            size: size
        }
    })
}

const getAll = () => {
    return axiosInstance.get("/remote_service/all")
}
const update = (data) => {
    return axiosInstance.put("/remote_service", data)
}
const create = (data) => {
    return axiosInstance.post("/remote_service", data)
}
const deleteApi = (apiId) => {
    return axiosInstance.delete("/remote_service", {
        params: {remoteServiceId: apiId}
    })
}

export default {getPage, getAll, update, create, deleteApi}
