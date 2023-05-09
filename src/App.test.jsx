import './css/App.css'
import Image from "./components/Image"
import Gift from './components/Gift.test'
import PopupWrapper from './components/PopupWrapper.test'
import { useState } from 'react';

export default function App() {
    const [popup, setPopup] = useState(null);

    return (
        <div className="w-screen">
            { popup && <PopupWrapper handleTurnOff={() => setPopup(null)}>{popup}</PopupWrapper>}

            <main className="w-full max-w-160 mx-auto pt-6 pb-8 sm:pb-12 bg-blue-300">
                {/* Gift boxes here  */}
                <Image className="w-10/12" src="dau-qua.png" />
                <section className="w-9/12 mx-auto p-1 sm:p-2 bg-white">
                    <div className='w-full flex flex-wrap'>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9].map(item =>
                                <Gift key={item} />
                            ) 
                        }
                    </div>
                </section>



                {/* App bottom  */}
                <section>
                    <Image className="mt-12 w-1/3" src="danh-sach.png" />
                    <Image className="w-full" src="voucher-01.png" />
                    <Image className="mt-5 w-2/5" src="theo-doi.png" />
                    <section className='mt-5 sm:mt-8 w-full flex justify-center items-center gap-4'>
                        <a href="" className='flex justify-center items-center w-1/6 aspect-square bg-white rounded-full transition-4 text-blue-800 text-5xl sm:text-7xl hover:scale-110 transition-4'><i className="fa-brands fa-facebook"></i></a>
                        <a href="" className='flex justify-center items-center w-1/6 aspect-square bg-white rounded-full transition-4 text-red-600 text-5xl  sm:text-7xl hover:scale-110 transition-4'><i className="fa-brands fa-youtube"></i></a>
                        <a href="" className='flex justify-center items-center w-1/6 aspect-square bg-white rounded-full transition-4 text-linkedin-color text-5xl sm:text-7xl hover:scale-110 transition-4'><i className="fa-brands fa-linkedin"></i></a>
                    </section>
                </section>
            </main>
        </div>
    )
}