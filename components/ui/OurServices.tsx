import React from 'react'
import { Phone, BadgeCheck, Truck } from "lucide-react";
import { Poppins } from "next/font/google";
import WaveDivider from './WaveDivider';

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    style: ["normal", "italic"], // optional if you want italic support
    display: "swap",
})


const OurServices = () => {
    return (
        <section className={`${poppins.className} z-10  mx-auto relative gap-10 `}>
            <WaveDivider bgColor="#e5fef0" className="-mt-24"  flip />
            {/* <div className="bg-[#e5fef0] md:flex md:justify-evenly py-16 flex flex-col md:flex-row gap-6"> */}
            <div className="bg-[#e5fef0]  -mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-6  py-16">                            
                <div className='flex  justify-center items-center gap-8'>
                    <div className='relative bg-[#00b8a2] h-14 w-14 sm:h-20 sm:w-20 xl:w-25 xl:h-25 rounded-full flex justify-center items-center '>
                        <BadgeCheck className="absolute w-8 h-8 sm:h-10 sm:w-10 text-white xl:w-15 xl:h-15" />
                    </div>
                    <div>
                        <h4 className='md:text-lg lg:text-sm sm:text-md xl:text-xl font-bold'>FREE SHIPPING & RETURN</h4>
                        <span className='md:text-sm lg:text-xs text-xs xl:text-[15px] font-light  italic'>But so that you may see from <br />
                            where all this error is born, those<br />
                            who accuse pleasure and those<br />
                            who praise pain.</span>
                    </div>
                </div>
                <div className='flex  justify-center items-center gap-8'>
                      <div className=' relative bg-[#00b8a2] h-14 w-14 sm:h-20 sm:w-20 xl:w-25 xl:h-25 rounded-full flex justify-center items-center '>
                        <Truck className="absolute w-8 h-8 sm:h-10 sm:w-10 xl:w-15 xl:h-15 text-white" />
                    </div>
                    <div>
                        <h4 className='md:text-xl lg:text-sm xl:text-xl font-bold'>100% MONEY BACK</h4>
                        <span className='md:text-sm text-xs lg:text-xs xl:text-[15px]  font-light italic' >But so that you may see from<br />
                            where all this error is born, those<br />
                            who accuse pleasure and those<br />
                            who praise pain.</span>
                    </div>
                </div>
                <div className='flex  justify-center items-center gap-8'>
                       <div className=' relative bg-[#00b8a2] h-14 w-14 sm:h-20 sm:w-20 xl:w-25 xl:h-25 rounded-full flex justify-center items-center '>
                        <Phone className="absolute w-8 h-8 sm:h-10 sm:w-10 xl:w-15 xl:h-15 text-white" />
                    </div>
                    <div>
                        <div className='flex items-center gap-4'>
                          <h4 className='md:text-lg text-md lg:text-sm xl:text-xl font-bold'>PHONE: 123 - 678 - 8899</h4></div>
                        <span className='md:text-sm text-xs font-light xl:text-[15px]  lg:text-xs italic'>But so that you may see from<br />
                            where all this error is born, those<br />
                            who accuse pleasure and those<br />
                            who praise pain.</span>
                    </div>
                </div>
            </div>
            <WaveDivider bgColor="#e5fef0" className="mt-0 transform -translate-y-2" />
        </section>
    )
}

export default OurServices
