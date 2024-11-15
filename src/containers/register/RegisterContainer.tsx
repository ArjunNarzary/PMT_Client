import { useRegisterUserMutation } from "@/redux/services"
import { useDispatch } from "react-redux"
import { IRegisterFormFields, registerFormFields } from "./registerFormFields"
import { useState } from "react"
import { z } from "zod"
import { setZodValidationError } from "@/lib/utils"
import { IFields } from "@/interface"
import RegisterCard from "@/components/register/RegisterCard"
import { addUser } from "@/redux/slices/authUser"
import { useNavigate } from "react-router-dom"

const validateSchema = z
  .object({
    name: z.object({
      value: z.string(),
    }),
    email: z.object({
      value: z.string().email(),
    }),
    password: z.object({
      value: z.string().min(6, "Password must contain at least 6 character(s"),
    }),
    confirmPassword: z.object({
      value: z.string().min(6, "Password must contain at least 6 character(s"),
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword.value !== password.value) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      })
    }
  })

const RegisterContainer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const [formFields, setFormFields] =
    useState<IRegisterFormFields>(registerFormFields)

  const handleSubmit = async () => {
    const validateForm = validateSchema.safeParse(formFields)
    if (!validateForm?.success) {
      const errorObjects = setZodValidationError(
        validateForm.error,
        formFields as unknown as { [key: string]: IFields }
      )
      const newObj: IRegisterFormFields = formFields
      Object.entries(formFields).map(([key, value]) => {
        if (errorObjects[key]) {
          newObj[key as keyof IRegisterFormFields] = errorObjects[key]
        } else {
          newObj[key as keyof IRegisterFormFields] = errorObjects[value]
        }
      })
      setFormFields(newObj)
      return
    }

    const response = await registerUser({
      name: formFields.name.value,
      email: formFields.email.value,
      password: formFields.password.value,
    })

    if (response.data) {
      await dispatch(addUser(response.data))
      setFormFields(registerFormFields)
      navigate("/", { replace: true })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <RegisterCard
        formFields={formFields}
        setFormFields={setFormFields}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        header="Register"
      />
    </div>
  )
}

export default RegisterContainer
