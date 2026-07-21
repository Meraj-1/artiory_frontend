'use client'
import React from 'react'
import Subscribe from '@/components/ui/Subscribe'
import SignUp from '@/components/auth/SignUp'

const Page = () => {
  return (
    <>
      {/* <Signup/> */}
      <div className='h-full justify-center items-center'>
        <SignUp/>
      </div>
      <div className='-mt-20'>
      <Subscribe/>
      </div>
    </>
  )
}

export default Page