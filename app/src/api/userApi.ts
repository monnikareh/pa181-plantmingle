import BaseApi from "./baseApi";
import {User} from "../../../backend/src/entities/User.ts";

const USER_PREFIX = "/users";

async function getAll(): Promise<User[]> {
    return BaseApi.getAll<User>(USER_PREFIX);
}

const UsersApi = {
    getAll,
};

export default UsersApi;
