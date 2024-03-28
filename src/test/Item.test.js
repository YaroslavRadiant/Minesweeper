import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Item from '../components/Item'

describe('Item component', () => {
  it('renders item', () => {
    const mockProps = {
      x: 0,
      y: 0,
      death: false,
      win: false,
      handleOnLeftClick: jest.fn(),
      handleOnRightClick: jest.fn(),
      mask: [0, 0, 0, 0],
      field: [1, 2, 0, 3],
      size: 4,
      radioValue: 'left',
    }

    const { getByTestId } = render(<Item {...mockProps} />)
    const item = getByTestId('item')

    expect(item).toBeInTheDocument()
  })

  it('calls handleOnLeftClick when clicked', () => {
    const mockProps = {
      x: 0,
      y: 0,
      death: false,
      win: false,
      handleOnLeftClick: jest.fn(),
      handleOnRightClick: jest.fn(),
      mask: [0, 0, 0, 0], // Example mask array
      field: [1, 2, 0, 3], // Example field array
      size: 4,
      radioValue: 'left',
    }

    const { getByTestId } = render(<Item {...mockProps} />)
    const item = getByTestId('item')

    // Simulate click event
    fireEvent.click(item)

    // Expectation
    expect(mockProps.handleOnLeftClick).toHaveBeenCalledTimes(1)
    expect(mockProps.handleOnLeftClick).toHaveBeenCalledWith(0, 0)
  })
})
