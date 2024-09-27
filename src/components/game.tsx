'use client'
import '@/components/styles/game.css'
import { useState, useEffect } from 'react'
import Minefield from '@/components/minefield.tsx'
import MockDataForm from '@/components/mockDataForm.tsx'
import { StatusButton } from '@/components/statusButton.tsx'
import { Timer } from '@/components/timer.tsx'
import { MineCounter } from '@/components/mineCounter.tsx'

export default function Game() {
  const [mockDataFormVisible, setMockDataFormVisible] = useState(false)
  const [mockData, setMockData] = useState('')

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  function setMockDataForm(data: string) {
    setMockData(data)
    setMockDataFormVisible(false)
  }

  function handleKeyPress(e: KeyboardEvent) {
    if (e.ctrlKey && e.key.toUpperCase() === 'M') {
      setMockDataFormVisible(!mockDataFormVisible)
    }
  }

  return (
    <div>
      <h1>Minesweeper</h1>

      {mockDataFormVisible && <MockDataForm setData={setMockDataForm} />}

      <div className="board">
        <header>
          <MineCounter />
          <StatusButton />
          <Timer />
        </header>

        <Minefield mockData={mockData} />
      </div>
    </div>
  )
}
