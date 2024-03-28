import React, { memo } from 'react'
import { Mask, Mine, mapMaskToView } from '../utils/constants'
import closetItem from '../assets/ClosetItem.png'
import openedItem from '../assets/OpenedItem.png'

const Item = memo(
  ({
    x,
    y,
    death,
    win,
    handleOnLeftClick,
    handleOnRightClick,
    mask,
    field,
    size,
    radioValue,
  }) => {
    const numberColor = () => {
      if (field[y * size + x] === 1) {
        return '#0000FF'
      }
      if (field[y * size + x] === 2) {
        return '#007B00'
      }
      if (field[y * size + x] === 3) {
        return '#FF0000'
      }
      if (field[y * size + x] === 4) {
        return '#00007B'
      }
    }

    const getBgImage = () => {
      if (field[y * size + x] === 0 && mask[y * size + x] === 0) {
        return
      }
      if (mask[y * size + x] !== Mask.Transparent.key) {
        return mapMaskToView[mask[y * size + x]]
      } else {
        if (field[y * size + x] === Mine) {
          return '💣'
        }
        return field[y * size + x]
      }
    }

    const itemStyle = () => {
      return {
        color: numberColor(),
        backgroundImage:
          mask[y * size + x] === 2 || mask[y * size + x] === 1
            ? `url(${closetItem})`
            : `url(${openedItem})`,
      }
    }

    const radioValueCheck = (e) => {
      if (radioValue === 'left') {
        handleOnLeftClick(x, y)
        return
      }
      handleOnRightClick(e, x, y)
    }
    
    return (
      <div
        data-testid='item'
        key={x}
        className={`flex justify-center items-center w-[32px] h-[32px] {{ ${
          death ? 'bg-red-200' : win ? 'bg-yellow-200' : 'bg-blue-200'
        } }} bg-cover bg-no-repeat text-2xl font-black`}
        onClick={(e) => radioValueCheck(e)}
        onContextMenu={(e) => handleOnRightClick(e, x, y)}
        style={itemStyle()}
      >
        {getBgImage()}
      </div>
    )
  }
)

export default Item
