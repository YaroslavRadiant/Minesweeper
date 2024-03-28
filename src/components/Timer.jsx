import React, { useState, useEffect } from 'react'

const Timer = ({ isEnd, restart }) => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    let interval
    if (!isEnd) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isEnd])

  useEffect(() => {
    setSeconds(0)
  }, [restart])

  return (
    <div>
      <p
        data-testid='timer'
        className='bg-slate-600 text-white font-bold py-2 px-4 border-b-4 border-slate-700 rounded'
      >
        {seconds}
      </p>
    </div>
  )
}

export default Timer
