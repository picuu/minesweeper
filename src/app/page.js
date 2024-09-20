'use client'

import Game from '../components/game'
import StoreProvider from '@/app/StoreProvider.jsx'

export default function Home () {
  return (
    <StoreProvider>
      <Game />
    </StoreProvider>
  )
}
