"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'

const SubmitButton = () => {
    const {pending} = useFormStatus();

  return (
    <Button className='w-fit' type='submit' disabled={pending} >{pending?"Submitting...":"Submit"}</Button>
  )
}

export default SubmitButton