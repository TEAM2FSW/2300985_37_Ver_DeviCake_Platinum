import { deleteUser, getUsers } from "@/rest/api";
import React, { useEffect, useState } from "react";

const User = () => {
    const [users, setUsers] = useState([])
    const [refreshUsers, setRefreshUsers] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                console.log('Fetched Users:', data);
                setUsers(data);
            } catch (error) {
                console.error('Error fetching Users:', error);
            }
        };

        fetchUsers();
    }, [refreshUsers]);

    const handleUser = async (user_id) => {
        try {
            await deleteUser({user_id : user_id});
            // Perbarui state atau dapatkan ulang data pengguna setelah penghapusan berhasil jika diperlukan
                        
        } catch (error) {
            console.error('Error deleting user:', error);
        }
        setRefreshUsers(prevState => !prevState)
    };





    return (
        <div className="text-gray-900 bg-gray-200">
            <div className="p-4 flex">
                <h1 className="text-3xl">Users</h1>
            </div>
            <div className="px-3 py-4 flex justify-center">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-md bg-white shadow-md rounded mb-4">
                        <tbody>
                            <tr className="border-b">

                                <th className="text-left p-3 px-5">Name</th>
                                <th className="text-left p-3 px-5">Email</th>
                                <th className="text-left p-3 px-5">Role</th>
                                <th></th>
                            </tr>

                            {users.map((user) => (
                                <tr className="border-b hover:bg-orange-100 bg-gray-100" key={user.user_id}>
                                    <td className="p-3 px-5" >
                                        <input type="text" value={user.full_name} className="bg-transparent w-full sm:w-auto" />
                                    </td>
                                    <td className="p-3 px-5">
                                        <input type="text" value={user.email} className="bg-transparent w-full sm:w-auto" />
                                    </td>

                                    <td className="p-3 px-5">{user.role}</td>
                                    <td className="p-3 px-5 flex justify-end">
                                        {/* <button type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" >Save</button> */}
                                        <button
                                            type="button"
                                            className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                            onClick={() => handleUser(user.user_id)}
                                       
                                       >
                                        
                                            Hapus
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default User;
