import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Minesweeper',
  description: 'The classic Minesweeper game made in React.Js'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
