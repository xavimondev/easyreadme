import { NodeName } from './builder'

type Task = () => Promise<unknown>

export type Status = 'idle' | 'loading' | 'completed'

export type JobSection = { id: NodeName; name: string; status: Status; task: Task }

export type Queue = {
  isProcessing: boolean
  jobs: JobSection[]
}
