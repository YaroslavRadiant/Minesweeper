import React, { useState } from 'react'

const Options = ({ setFieldData }) => {
  const [formData, setFormData] = useState({ mines: 10, size: 8 })
  const [isClosed, setIsClosed] = useState(true)

  const sendNewFieldData = () => {
    if (formData.size > 25 || formData.mines > formData.size * formData.size) {
      return
    }
    setIsClosed(true)
    setFieldData(formData)
  }
  return (
    <div className='flex flex-col align-middle'>
      <div className='flex justify-between sm:w-[500px] mt-12 w-[350px]'>
        <button
          onClick={() => setFieldData({ mines: 10, size: 8 })}
          className='bg-slate-600 hover:bg-slate-400 text-white font-bold py-2 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded'
        >
          Easy
        </button>
        <button
          onClick={() => setFieldData({ mines: 40, size: 16 })}
          className='bg-slate-600 hover:bg-slate-400 text-white font-bold py-2 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded'
        >
          Medium
        </button>
        <button
          onClick={() => setFieldData({ mines: 80, size: 25 })}
          className='bg-slate-600 hover:bg-slate-400 text-white font-bold py-2 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded'
        >
          Hard
        </button>
        <button
          onClick={() => setIsClosed(!isClosed)}
          className=' bg-slate-600 hover:bg-slate-400 text-white font-bold py-2 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded'
        >
          Custom
        </button>
      </div>
      {!isClosed && (
        <div className='sm:w-[500px]  w-[350px] mt-4'>
          <div className='flex justify-between'>
            <label className='text-2xl mr-4 w-20 ' htmlFor='sizeInput'>
              Size
            </label>
            <input
              id='sizeInput'
              className='h-[43px] p-2'
              value={formData.size}
              onChange={(e) =>
                setFormData({ ...formData, size: +e.target.value })
              }
            />
          </div>

          <div className='flex justify-between mt-4'>
            <label className='text-2xl mr-4' htmlFor='minesInput'>
              Mines
            </label>
            <input
              id='minesInput'
              className='h-[43px] p-2'
              value={formData.mines}
              onChange={(e) =>
                setFormData({ ...formData, mines: +e.target.value })
              }
            />
          </div>
          <button
            onClick={sendNewFieldData}
            className='mt-4 bg-slate-600 hover:bg-slate-400 text-white font-bold py-2 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded w-[100%]'
          >
            Run
          </button>
        </div>
      )}
    </div>
  )
}

export default Options
