import { useState } from "react"
import { LoginCard } from "@/components"
import { ILoginFormFields, loginFormFields } from "./loginFormFields"
import { z } from "zod"
import { setZodValidationError } from "@/lib/utils"
import { IFields } from "@/interface"
import { useLoginUserMutation } from "@/redux/services"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addUser } from "@/redux/slices/authUser"

const validateSchema = z.object({
  email: z.object({
    value: z.string().email(),
  }),
  password: z.object({
    value: z.string().min(6, "Password must contain at least 6 character(s"),
  }),
})

const LoginContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const [formFields, setFormFields] =
    useState<ILoginFormFields>(loginFormFields)

  const handleSubmit = async () => {
    const validateForm = validateSchema.safeParse(formFields)
    if (!validateForm?.success) {
      const errorObjects = setZodValidationError(
        validateForm.error,
        formFields as unknown as { [key: string]: IFields }
      )
      const newObj: ILoginFormFields = formFields
      Object.entries(formFields).map(([key, value]) => {
        if (errorObjects[key]) {
          newObj[key as keyof ILoginFormFields] = errorObjects[key]
        } else {
          newObj[key as keyof ILoginFormFields] = errorObjects[value]
        }
      })
      setFormFields(newObj)
      return
    }

    const response = await loginUser({
      email: formFields.email.value,
      password: formFields.password.value,
    })

    if (response.data) {
      dispatch(addUser(response.data))
      setFormFields(loginFormFields)
      navigate("/", { replace: true })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginCard
        formFields={formFields}
        setFormFields={setFormFields}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}

export default LoginContainer
