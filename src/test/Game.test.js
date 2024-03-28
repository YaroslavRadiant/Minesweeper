import React from 'react'
import {
  render,
  fireEvent,
  queryAllByTestId,
  getAllByTestId,
} from '@testing-library/react'
import Game from '../components/Game'

describe('Game component', () => {
  it('displays "You won!" message when the game is won', () => {
    const setIsEndMock = jest.fn()
    const setMinesToGo = jest.fn()
    const { getByText } = render(
      <Game
        minesToGo={0}
        setMinesToGo={setMinesToGo}
        fieldData={{ mines: 0, size: 10 }}
        setIsEnd={setIsEndMock}
      />
    )
    const winMessage = getByText('You won!')
    expect(winMessage).toBeInTheDocument()
  })
  it('displays "Restart" button', () => {
    const setIsEndMock = jest.fn()
    const setMinesToGo = jest.fn()
    const { getByText } = render(
      <Game
        minesToGo={0}
        setMinesToGo={setMinesToGo}
        fieldData={{ mines: 0, size: 10 }}
        setIsEnd={setIsEndMock}
      />
    )
    const restartButton = getByText('Restart')
    expect(restartButton).toBeInTheDocument()
  })
  it('calls restart function when "Restart" button is clicked', () => {
    const setMinesToGo = jest.fn()
    const setIsEndMock = jest.fn()

    const { getByText } = render(
      <Game
        minesToGo={0}
        setMinesToGo={setMinesToGo}
        fieldData={{ mines: 0, size: 10 }}
        setIsEnd={setIsEndMock}
      />
    )

    const restartButton = getByText('Restart')
    fireEvent.click(restartButton)
    expect(setIsEndMock).toHaveBeenCalledWith(false)
  })
  it('left click on cell without mine does not end the game', () => {
    const setIsEndMock = jest.fn()
    const setMinesToGoMock = jest.fn()
    const fieldData = { mines: 5, size: 10 }

    const { container } = render(
      <Game
        setIsEnd={setIsEndMock}
        setMinesToGo={setMinesToGoMock}
        fieldData={fieldData}
      />
    )

    const cell = getAllByTestId(container, 'item') 
    fireEvent.click(cell[0])

    expect(setIsEndMock).not.toHaveBeenCalled()
  })
})
