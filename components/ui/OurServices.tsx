import React from 'react'
import { Phone, Sparkle, Gift, Rainbow } from "lucide-react";
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
                        <Gift className="absolute w-8 h-8 sm:h-10 sm:w-10 text-white xl:w-15 xl:h-15" />
                    </div>
                    <div>
                        <h4 className='md:text-lg lg:text-sm sm:text-md xl:text-xl font-bold'>Perfect Return Gifts & Gift Hampers</h4>
                        <span className='md:text-sm lg:text-xs text-xs xl:text-[15px] font-light  italic'>Celebrate every special occasion with Artiory's<br />
                            thoughtfully curated return gifts and premium gift<br />
                            hampers. Packed with fun, useful, and kid-friendly<br />
                           products, they're perfect for birthdays, school <br/>
                           events, and celebrations.</span>
                    </div>
                </div>
                <div className='flex  justify-center items-center gap-8'>
                      <div className=' relative bg-[#00b8a2] h-14 w-14 sm:h-20 sm:w-20 xl:w-25 xl:h-25 rounded-full flex justify-center items-center '>
                        <Rainbow  className="absolute w-8 h-8 sm:h-10 sm:w-10 xl:w-15 xl:h-15 text-white" />
                    </div>
                    <div>
                        <h4 className='md:text-xl lg:text-sm xl:text-xl font-bold'> Wide Range of Kid's Essentials</h4>
                        <span className='md:text-sm text-xs lg:text-xs xl:text-[15px]  font-light italic' >Discover a diverse collection of trendy, colourful,<br />
                            and high-quality products designed for kid's. From<br />
                            stationery and school essentials to bottles, <br />
                            lunchboxes, backpacks, toys, and more, we have <br />
                            everything little ones need, all in one place.</span>
                    </div>
                </div>
                <div className='flex  justify-center items-center gap-8'>
                       <div className=' relative bg-[#00b8a2] h-14 w-14 sm:h-20 sm:w-20 xl:w-25 xl:h-25 rounded-full flex justify-center items-center '>
                        <Sparkle className="absolute w-8 h-8 sm:h-10 sm:w-10 xl:w-15 xl:h-15 text-white" />
                    </div>
                    <div>
                        <div className='flex items-center gap-4'>
                          <h4 className='md:text-lg text-md lg:text-sm xl:text-xl font-bold'>Exclusive & Innovative Products</h4></div>
                        <span className='md:text-sm text-xs font-light xl:text-[15px]  lg:text-xs italic'>Artiory brings you a unique range of thoughtfully <br />
                            designed products that stand out from the <br />
                            ordinary. Our exclusive collection is created <br />
                            especially for kid's, offering playful, practical, and <br/>
                            innovative products you won't find with other <br/>
                            leading brands</span>
                    </div>
                </div>
            </div>
            <WaveDivider bgColor="#e5fef0" className="mt-0 transform -translate-y-2" />
        </section>
    )
}

export default OurServices
