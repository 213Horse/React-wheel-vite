import useUsers from '../hooks/useUsers';
import PopupFrame from "./popup/PopupFrame";

export default function UserList({
    handleTurnOffPopup
}) {
    const users = useUsers();
    function dateFormatter(data) {
        const arr = data.slice(0,10).split('-').reverse();

        return arr.join('-')
    }
    return (
        <PopupFrame size="lg" handleTurnOffPopup={handleTurnOffPopup}>
            <h4 className="text-yellow-300 text-xl sm:text-2xl text-center font-extrabold">Danh sách trúng thưởng</h4>
            <section className='mt-3 w-full   text-xs sm:text-sm'>
                <div className='w-full h-10 bg-yellow-300 grid grid-cols-3 justify-items-center items-center rounded-tl-md rounded-tr-md shadow-lg'>
                    <div>Thời gian</div>
                    <div>Họ và tên</div>
                    <div>Số điện thoại</div>
                </div>
                <div className='max-h-96 overflow-y-scroll'>
                {
                    users &&
                    users.map(user =>
                        <div className='w-full h-10 grid grid-cols-3 justify-items-center items-center bg-white'>
                            <div>{dateFormatter(user.spinnedDate)}</div>
                            <div>{user.fullName}</div>
                            <div>{user.phone}</div>
                        </div>
                    )
                }
                </div>
            </section>
        </PopupFrame>
    )
}