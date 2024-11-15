export interface IFields {
  key: string
  label: string
  type:
    | "text"
    | "textArea"
    | "checkbox"
    | "password"
    | "date"
    | "dropdown"
    | "number"
  placeHolder?: string
  isError: boolean
  errorMessage?: string
  isRequired: boolean
  maxLength?: number
  value: string | boolean
}

export interface ILoginReponse {
  name: string
  token: string
  email: string
}

export interface ILoginPayload {
  email: string
  password: string
}

interface creator {
  _id: string
  name: string
  email: string
}

export interface IProjects {
  _id: string
  title: string
  description: string
  creator: creator
  createdAt: string
  updatedAt: string
}

export interface ITaskPayload {
  _id: string
  title: string
  description: string
  project: string
  creator: creator
  priority: "high" | "medium" | "low"
  status: "TO DO" | "IN PROGRESS" | "DONE" | "BLOCKED"
  dueDate: string
  createdAt: string
  updatedAt: string
  assignee: creator
  estimate: number
}
