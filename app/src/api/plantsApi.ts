import BaseApi from "./baseApi";

const PLANTS_PREFIX = "/plants";

async function getSingle(id: number) {
    return BaseApi.getSingle<any>(`${PLANTS_PREFIX}/${id}`);
}

async function getAll() {
    return BaseApi.getAll<any>(`${PLANTS_PREFIX}`);
}

async function getAllPaginated(page: number) {
    return BaseApi.getAllPaginated<any>(`${PLANTS_PREFIX}?page=${page}`);
}

async function createSingle(payload: any) {
    return BaseApi.postSingle<any>(PLANTS_PREFIX, payload);
}

async function updateSingle(id: number, payload: any) {
    return BaseApi.putSingle<any>(`${PLANTS_PREFIX}/${id}`, payload);
}

async function deleteSingle(id: number) {
    return BaseApi.deleteSingle<any>(`${PLANTS_PREFIX}/${id}`);
}

const PlantsApi = {
    getAll,
    getAllPaginated,
    getSingle,
    createSingle,
    deleteSingle,
    updateSingle
};

export default PlantsApi;
