import '@/components/styles/mineCounter.css'

export function MineCounter () {
  return (
    <div className='mineCounter' data-testid='mineCounter'>
      <img src='/numbers/0.png' alt='0' />
      <img src='/numbers/1.png' alt='1' />
      <img src='/numbers/0.png' alt='0' />
    </div>
  )
}
