import { TimeoutType } from '@/types/types'
import { useEffect, useRef, useState } from 'react'

interface Props {
  maxValue: number
  restart: boolean
  start: boolean
}

export function useTimer({ maxValue, restart, start }: Props) {
  const timer = useRef<TimeoutType>()
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (restart) return setTime(0)

    if (start) {
      timer.current = setInterval(() => {
        setTime((pre) => (pre < maxValue ? pre + 1 : pre))
      }, 1000)
    } else {
      clearInterval(timer.current)
    }

    return () => clearInterval(timer.current)
  }, [start, restart])

  return time
}
