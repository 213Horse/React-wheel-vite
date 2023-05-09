import useUsers from "../hooks/useUsers";

export default function UserList() {
    const users = useUsers();
    return (
        <>
            <h3 className="text-2xl text-center font-extrabold text-yellow-200">Danh sách trúng thưởng</h3>
            <section className="mt-4 w-96 md-e-140 px-3 divide-y-2 rounded-md max-h-100 bg-white">
            {
                users && users.map(user => 
                    <div className="w-full h-12 px-2 items-center grid grid-cols-4">
                        <span className="col-span-1">{user.phone}</span>
                        <span className="col-span-1">{user.fullName}</span>
                        <span className="col-span-1">{user.gift}</span>
                        <span className="col-span-1">{user.spinnedDate.slice(0,10)}</span>
                    </div>    
                )
            }
            </section>
        </>
    )
}

 