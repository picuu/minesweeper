import '@/components/styles/statusButton.css'

export function StatusButton () {
  return (
    <button data-testid='status-button' className='status-button'>
      <img src='/faces/happyFace.png' alt='happy face' />
    </button>
  )
}
