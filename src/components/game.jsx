'use client' // TODO Why do we need this here?
import { useState, useEffect } from 'react'
import Minefield from '@/components/minefield'
import MockDataForm from '@/components/mockDataForm'
import { StatusButton } from '@/components/statusButton'
import { Timer } from '@/components/timer'
import { MineCounter } from '@/components/mineCounter'
import '@/components/styles/game.css'

export default function Game() {
  const [mockDataFormVisible, setMockDataFormVisible] = useState(false)
  const [mockData, setMockData] = useState('')

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  function setMockDataForm(data) {
    setMockData(data)
    setMockDataFormVisible(false)
  }

  function handleKeyPress(e) {
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
