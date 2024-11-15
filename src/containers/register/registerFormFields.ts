import { IFields } from "@/interface"

export interface IRegisterFormFields {
  email: IFields
  name: IFields
  password: IFields
  confirmPassword: IFields
}

export const registerFormFields: IRegisterFormFields = {
  name: {
    key: "name",
    label: "Name",
    type: "text",
    placeHolder: "Enter your name",
    isError: false,
    errorMessage: "",
    isRequired: true,
    value: "",
  },
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
  confirmPassword: {
    key: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeHolder: "Re-enter your password",
    isError: false,
    errorMessage: "",
    isRequired: true,
    value: "",
  },
}
