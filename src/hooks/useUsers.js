import { useEffect, useState } from "react";
import fetchClosestUsers from '../services/fetchTwentyClosestUsers';

export default function useUsers({
    state,
}) {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        let ignore = false;

        async function fetchUsers() { 
            const data = await fetchClosestUsers();

            if (!ignore)
                setUsers(data); 
        }

        fetchUsers();


        return () => ignore = true;
    }, [state]);

    return users;
}