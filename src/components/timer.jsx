import '@/components/styles/timer.css'

export function Timer (value) {
  return (
    <div className='timer' data-testid='timer'>
      <img src='/numbers/0.png' alt='0' />
      <img src='/numbers/0.png' alt='0' />
      <img src='/numbers/0.png' alt='0' />
    </div>
  )
}
