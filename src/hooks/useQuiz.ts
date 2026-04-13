import { useState, useCallback } from 'react'
import { questions } from '@/data/questions'

export function useQuiz() {
  const total = questions.length

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<(number | null)[]>(Array(total).fill(null))
  const [answered, setAnswered] = useState<boolean[]>(Array(total).fill(false))
  const [showResults, setShowResults] = useState(false)

  const isAnswered = answered[current]
  const isFirst = current === 0
  const isLast = current === total - 1
  const score = selected.reduce<number>(
    (sum, ans, i) => sum + (ans === questions[i].correct ? 1 : 0),
    0,
  )

  const selectAnswer = useCallback(
    (index: number) => {
      if (answered[current]) return
      setSelected((prev) => {
        const next = [...prev]
        next[current] = index
        return next
      })
      setAnswered((prev) => {
        const next = [...prev]
        next[current] = true
        return next
      })
    },
    [current, answered],
  )

  const nextQuestion = useCallback(() => {
    if (!answered[current]) return
    if (isLast) {
      setShowResults(true)
      return
    }
    setCurrent((c) => c + 1)
  }, [current, answered, isLast])

  const prevQuestion = useCallback(() => {
    if (current === 0) return
    setCurrent((c) => c - 1)
  }, [current])

  const restart = useCallback(() => {
    setCurrent(0)
    setSelected(Array(total).fill(null))
    setAnswered(Array(total).fill(false))
    setShowResults(false)
  }, [total])

  return {
    questions,
    current,
    selected,
    answered,
    showResults,
    isAnswered,
    isFirst,
    isLast,
    score,
    total,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    restart,
  }
}
