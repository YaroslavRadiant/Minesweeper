import React from 'react'
import { render, screen } from '@testing-library/react'
import Timer from '../components/Timer'

describe('Timer component', () => {
  it('displays initial seconds as 0', () => {
    render(<Timer isEnd={false} />)
    const timerElement = screen.getByText('0')
    expect(timerElement).toBeInTheDocument()
  })

  it('starts counting seconds when isEnd is false', () => {
    jest.useFakeTimers()
    render(<Timer isEnd={false} />)
    const timer = screen.getByTestId('timer')
    expect(timer.textContent).toBe('0')
    jest.advanceTimersByTime(2000)
    expect(timer.textContent).toBe('2')
    jest.useRealTimers()
  })

  it('stops counting seconds when isEnd is true', () => {
    jest.useFakeTimers()
    render(<Timer isEnd={false} />)
    const timer = screen.getByTestId('timer')
    expect(timer.textContent).toBe('0')
    jest.advanceTimersByTime(5000)
    render(<Timer isEnd={true} />)
    expect(timer.textContent).toBe('5')
    jest.advanceTimersByTime(5000)
    expect(screen.getByText('10')).toBeInTheDocument()
    jest.useRealTimers()
  })

  it('resets seconds when restart is called', () => {
    jest.useFakeTimers()
    render(<Timer isEnd={false} />)
    jest.advanceTimersByTime(5000)
    expect(screen.getByText('5')).toBeInTheDocument()
    render(<Timer isEnd={false} restart={true} />)
    expect(screen.getByText('0')).toBeInTheDocument()
    jest.useRealTimers()
  })
})
