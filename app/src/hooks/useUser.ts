import UserApi from '../api/userApi';
import {User} from "../entities/User.ts"
import {useEffect, useState} from "react";

export const useAllUsers = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState<User[] | undefined>(undefined);

    const fetchUsers = async () => {
        setIsFetching(true);
        try {
            const usersData: User[] = await UserApi.getAll();
            setData(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        setIsFetching(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    console.log('Data:', data);
    return { data, isFetching };
};

