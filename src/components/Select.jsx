import React from 'react'

const Select = ({
label = '',
options = [],
...prop
}) => {
  return (
    <div className='mb-4'>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
        <select className='w-full px-3 py-1.5 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:border-transparent'
        {...prop} 
        >
            {
                options.map((option)=> (
                    <option value={option} key={option}
                    
                    >
                        {option}
                    </option>
                ))
            }
        </select>
    </div>
  )
}

export default Select