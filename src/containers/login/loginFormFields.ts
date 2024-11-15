import { IFields } from "@/interface"

export interface ILoginFormFields {
  email: IFields
  password: IFields
}

export const loginFormFields: ILoginFormFields = {
  email: {
    key: "email",
    label: "Email",
    type: "text",
    placeHolder: "Enter your email",
    isError: false,
    errorMessage: "",
    isRequired: true,
    value: "",
  },
  password: {
    key: "password",
    label: "Password",
    type: "password",
    placeHolder: "Enter your password",
    isError: false,
    errorMessage: "",
    isRequired: true,
    value: "",
  },
}
