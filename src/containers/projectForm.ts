import { IFields } from "@/interface"

export interface IProjectFormFields {
  title: IFields
  description: IFields
}

export const projectFormFields: IProjectFormFields = {
  title: {
    key: "title",
    label: "Project Title",
    type: "text",
    placeHolder: "Enter your project title",
    isError: false,
    errorMessage: "",
    isRequired: true,
    value: "",
  },
  description: {
    key: "description",
    label: "Description",
    type: "textArea",
    placeHolder: "Add Description",
    isError: false,
    errorMessage: "",
    isRequired: true,
    value: "",
  },
}

export interface ITaskFormFields {
  title: IFields
  description: IFields
  dueDate: IFields
  estimate: IFields
}

export const taskFormFields: ITaskFormFields = {
  title: {
    key: "title",
    label: "Task Title",
    type: "text",
    placeHolder: "Enter your task title",
    isError: false,
    errorMessage: "",
    isRequired: true,
    value: "",
  },
  description: {
    key: "description",
    label: "Description",
    type: "text",
    placeHolder: "Add Description",
    isError: false,
    errorMessage: "",
    isRequired: true,
    value: "",
  },
  dueDate: {
    key: "dueDate",
    label: "Due Date",
    type: "date",
    placeHolder: "",
    isError: false,
    errorMessage: "",
    isRequired: true,
    value: "",
  },
  estimate: {
    key: "estimate",
    label: "Estimate",
    type: "number",
    placeHolder: "",
    isError: false,
    errorMessage: "",
    isRequired: true,
    value: "",
  },
}
