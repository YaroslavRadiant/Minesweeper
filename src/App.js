import { useState } from 'react'
import Game from './components/Game'
import Options from './components/Options'
import Timer from './components/Timer'

export default function App() {
  const [fieldData, setFieldData] = useState({
    mines: 10,
    size: 8,
  })
  const [minesToGo, setMinesToGo] = useState(2)
  const [isEnd, setIsEnd] = useState(false)

  return (
    <div className='w-[100%] flex flex-col items-center'>
      <Options setFieldData={setFieldData} />
      <div className='sm:w-[500px] w-[350px] flex justify-around mt-4'>
        <Timer isEnd={isEnd} restart={fieldData} />
        <div className='bg-slate-600 text-white font-bold py-2 px-4 border-b-4 border-slate-700 rounded w-[50px] flex justify-center'>
          {minesToGo}
        </div>
      </div>

      <Game
        setMinesToGo={setMinesToGo}
        minesToGo={minesToGo}
        setIsEnd={setIsEnd}
        fieldData={fieldData}
      />
    </div>
  )
}
