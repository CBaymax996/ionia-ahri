import axiosInstance from "./BaseRequest";


const getPage = (index = 0, size = 10) => {
    return axiosInstance.get("/template", {
        params: {
            page: index,
            size: size
        }
    })
}

const getAll = () => {
    return axiosInstance.get("/template/all")
}
const update = (data) => {
    return axiosInstance.put("/template", data)
}
const create = (data) => {
    return axiosInstance.post("/template", data)
}
const deleteApi = (id) => {
    return axiosInstance.delete("/template", {
        params: {templateId: id}
    })
}

export default {getPage, getAll, update, create, deleteApi}
