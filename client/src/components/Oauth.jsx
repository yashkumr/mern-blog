import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai';

const Oauth = () => {
  return (
    <>
    <Button type='button' gradientDuotone='pinkToOrange' outline >
        <AiFillGoogleCircle className="w-6 h-6 mr-2"/>
        Continue with Google

    </Button>
    </>
  )
}

export default Oauth