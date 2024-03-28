import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Options from '../components/Options'

describe('Options component', () => {
  test('clicking on "Easy" button sets field data to { mines: 10, size: 8 }', () => {
    const setFieldDataMock = jest.fn()

    const { getByText } = render(<Options setFieldData={setFieldDataMock} />)
    const easyButton = getByText('Easy')
    fireEvent.click(easyButton)

    expect(setFieldDataMock).toHaveBeenCalledWith({ mines: 10, size: 8 })
  })

  test('clicking on "Medium" button sets field data to { mines: 40, size: 16 }', () => {
    const setFieldDataMock = jest.fn()

    const { getByText } = render(<Options setFieldData={setFieldDataMock} />)
    const mediumButton = getByText('Medium')
    fireEvent.click(mediumButton)

    expect(setFieldDataMock).toHaveBeenCalledWith({ mines: 40, size: 16 })
  })

  test('clicking on "Hard" button sets field data to { mines: 80, size: 25 }', () => {
    const setFieldDataMock = jest.fn()

    const { getByText } = render(<Options setFieldData={setFieldDataMock} />)
    const hardButton = getByText('Hard')
    fireEvent.click(hardButton)

    expect(setFieldDataMock).toHaveBeenCalledWith({ mines: 80, size: 25 })
  })

  test('clicking on "Custom" button toggles custom options visibility', () => {
    const setFieldDataMock = jest.fn()

    const { getByText, getByLabelText, queryByText } = render(
      <Options setFieldData={setFieldDataMock} />
    )
    const customButton = getByText('Custom')
    fireEvent.click(customButton)

    expect(queryByText('Size')).toBeInTheDocument()
    expect(queryByText('Mines')).toBeInTheDocument()

    const sizeInput = getByLabelText('Size')
    fireEvent.change(sizeInput, { target: { value: '20' } })

    const minesInput = getByLabelText('Mines')
    fireEvent.change(minesInput, { target: { value: '50' } })

    const runButton = getByText('Run')
    fireEvent.click(runButton)

    expect(setFieldDataMock).toHaveBeenCalledWith({ mines: 50, size: 20 })
  })
})
