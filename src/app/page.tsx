import Game from '@/components/game.tsx'
import StoreProvider from '@/app/StoreProvider.tsx'

export default function Home() {
  return (
    <StoreProvider>
      <Game />
    </StoreProvider>
  )
}
