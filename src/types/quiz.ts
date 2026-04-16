export interface Question {
  question: string
  answers: string[]
  correct: number
  explanation: string
}

export interface QuizMeta {
  title: string
  contentUrl: string        // empty string = no link shown
  accreditationCode: string // string to preserve any leading zeros
  cpdPoints: string
}
