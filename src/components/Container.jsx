import React from 'react'

const Container = ({children}) => {
  return (
    <div className='mx-auto md:w-10/12 bg-gray-400 h-full flex flex-col justify-between'>
        {children}
    </div>
  )
}

export default Container