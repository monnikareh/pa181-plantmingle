import BaseApi from "./baseApi";
import {Plant} from "../entities/Plant.ts";

const PLANTS_PREFIX = "/plants";

async function getSingle(id: number) {
    return BaseApi.getSingle<Plant>(`${PLANTS_PREFIX}/${id}`);
}

async function getAll(): Promise<Plant[]> {
    return BaseApi.getAll<Plant>(PLANTS_PREFIX);
}

async function getAllPaginated(page: number) {
    return BaseApi.getAllPaginated<Plant>(`${PLANTS_PREFIX}?page=${page}`);
}

async function createSingle(payload: any) {
    return BaseApi.postSingle<Plant>(PLANTS_PREFIX, payload);
}

async function updateSingle(id: number, payload: any) {
    return BaseApi.putSingle<Plant>(`${PLANTS_PREFIX}/${id}`, payload);
}

async function deleteSingle(id: number) {
    return BaseApi.deleteSingle<Plant>(`${PLANTS_PREFIX}/${id}`);
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
