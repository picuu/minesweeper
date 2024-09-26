import { ChangeEvent, FormEvent, useState } from 'react'

export default function MockDataForm({ setData }: { setData: (data: string) => void }) {
  const [mockData, setMockData] = useState('| * | o |')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setData(mockData)
  }

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMockData(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={mockData}
        cols={40}
        rows={8}
        onChange={handleInputChange}
        data-testid="mock-data-input"
        style={{ width: '100%', height: '300px' }}
      />
      <button data-testid="mock-data-submit" type="submit">
        Submit
      </button>
    </form>
  )
}
