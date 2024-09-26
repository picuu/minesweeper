import Game from '@/components/game'
import StoreProvider from '@/app/StoreProvider'

export default function Home() {
  return (
    <StoreProvider>
      <Game />
    </StoreProvider>
  )
}
