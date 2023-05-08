export default function UserList({
    users
}) {
    return (
        <>
            <h3 className="text-2xl text-center font-extrabold text-yellow-200">Danh sách trúng thưởng</h3>
            <section className="mt-4 w-180 px-3 divide-y-2 rounded-md max-h-100">
            {
                users.map(user => 
                    <div className=" grid grid-cols-4 gap-y-2 bg-white">
                        <Cell text={user.phone} />
                        <Cell text={user.fullName} />
                        <Cell text={user.gift} />
                        <Cell text={user.spinnedDate.slice(0, 19)} />
                    </div>    
                )
                
            }
            
            </section>
        </>
    )
}

function Cell({
    text
}) {
    return (
        <div className="col-span-1 h-12 px-2 flex items-center">
            {text}
        </div>
    )
}