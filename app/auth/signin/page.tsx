'use client'
import React from 'react'
import Subscribe from '@/components/ui/Subscribe'
import SignIn from '@/components/auth/SignIn'

const Page = () => {
  return (
    <>
      {/* <Signup/> */}
      <div className='h-full justify-center items-center'>
        <SignIn/>
      </div>
      <div className='-mt-20'>
      <Subscribe/>
      </div>
    </>
  )
}

export default Page