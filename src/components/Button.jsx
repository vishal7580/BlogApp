import React from 'react'

const Button = ({
    type='button',
    classname= '',
    children, ...props
}) => {
  return (
    <button type={type} className={classname} {...props}>
         {children}
    </button>
  )
}

export default Button