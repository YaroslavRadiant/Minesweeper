import React, { useState, useMemo, useEffect } from 'react'
import { createField } from '../utils/utils'
import { Mask, Mine } from '../utils/constants'
import Item from './Item'

const Game = ({ minesToGo, setMinesToGo, setIsEnd, fieldData }) => {
  const { mines, size } = fieldData
  const dimension = new Array(size).fill(null)

  const [radioValue, setRadioValue] = useState('left')
  const [death, setDeath] = useState(false)
  const [win, setWin] = useState(false)
  const [field, setField] = useState(() => createField(size, Mine, mines))
  const [mask, setMask] = useState(() =>
    new Array(size * size).fill(Mask.Fill.key)
  )

  const restart = () => {
    setIsEnd(false)
    setDeath(false)
    setWin(false)
    setMask(new Array(size * size).fill(Mask.Fill.key))
  }

  useEffect(() => {
    setDeath(false)
    setWin(false)
    setField(createField(size, Mine, mines))
    setMask(new Array(size * size).fill(Mask.Fill.key))
  }, [fieldData, mines, size])

  const countFlags = useMemo(() => {
    return mask.filter((element) => element === 2).length
  }, [mask])

  useEffect(() => {
    setMinesToGo(mines - countFlags)
  }, [countFlags, mines, setMinesToGo])

  const handleOnLeftClick = (x, y) => {
    if (win || death) return

    if (mask[y * size + x] === Mask.Transparent.key) return

    const clearing = []

    function clear(x, y) {
      if (x >= 0 && x < size && y >= 0 && y < size) {
        if (
          mask[y * size + x] === Mask.Transparent.key ||
          mask[y * size + x] === 2
        )
          return

        clearing.push([x, y])
      }
    }

    clear(x, y)

    while (clearing.length) {
      const [x, y] = clearing.pop()

      mask[y * size + x] = Mask.Transparent.key

      if (field[y * size + x] !== 0) continue

      clear(x + 1, y)
      clear(x - 1, y)
      clear(x, y + 1)
      clear(x, y - 1)
    }

    if (field[y * size + x] === Mine) {
      mask.forEach((_, i) => (mask[i] = Mask.Transparent.key))
      setIsEnd(true)
      setDeath(true)
    }

    setMask((prev) => [...prev])
  }

  const handleOnRightClick = (e, x, y) => {
    e.preventDefault()
    e.stopPropagation()

    if (win || death) return

    if (mask[y * size + x] === Mask.Fill.key) {
      mask[y * size + x] = Mask.Flag.key
    } else if (mask[y * size + x] === Mask.Flag.key) {
      mask[y * size + x] = Mask.Question.key
    } else if (mask[y * size + x] === Mask.Question.key) {
      mask[y * size + x] = Mask.Fill.key
    }

    setMask((prev) => [...prev])
  }

  useEffect(() => {
    const isWIn = !field.some(
      (f, i) =>
        f === Mine &&
        mask[i] !== Mask.Flag.key &&
        mask[i] !== Mask.Transparent.key
    )
    if (isWIn) {
      setWin(true)
    }
  }, [field, mask, minesToGo, setIsEnd])

  useEffect(() => {
    if (win) {
      setMask((prev) => [...prev])
    }
  }, [win])

  return (
    <div className='mt-4 border-8 border-whyte'>
      <p className=' text-center text-2xl mt-4'>
        {win && death !== true && 'You won!'}
      </p>
      <div className='w-[100%] flex justify-center my-4'>
        <button
          onClick={restart}
          className='bg-slate-600 hover:bg-slate-400 text-white font-bold py-2 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded'
        >
          Restart
        </button>
      </div>

      <div className='sm:hidden flex w-[100%] justify-around my-4'>
        <label className='font-bold text-white'>Click</label>
        <input
          type='radio'
          name='click-type'
          value={radioValue}
          onChange={() => setRadioValue('left')}
        ></input>
        <label className='font-bold text-white'>Flag</label>
        <input
          type='radio'
          name='click-type'
          value={radioValue}
          onChange={() => setRadioValue('right')}
        ></input>
      </div>

      {dimension.map((_, y) => (
        <div key={y} style={{ display: 'flex' }}>
          {dimension.map((_, x) => (
            <Item
              key={x}
              x={x}
              y={y}
              death={death}
              handleOnLeftClick={handleOnLeftClick}
              handleOnRightClick={handleOnRightClick}
              mask={mask}
              field={field}
              size={size}
              radioValue={radioValue}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Game
