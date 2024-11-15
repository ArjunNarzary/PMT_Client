import { IFields } from "@/interface"
import React from "react"
import { Form } from "../ui/form"
import { useForm } from "react-hook-form"
import FormInput from "../formInput"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"
import { IRegisterFormFields } from "@/containers/register/registerFormFields"

interface IregisterCardProps {
  formFields: IRegisterFormFields
  setFormFields: React.Dispatch<React.SetStateAction<IRegisterFormFields>>
  handleSubmit: () => void
  isLoading?: boolean
  header?: string
}
const RegisterCard = ({
  formFields,
  setFormFields,
  handleSubmit,
  isLoading = false,
  header = "Login",
}: IregisterCardProps) => {
  const form = useForm()
  const handleChange = (key: string, value: string) => {
    setFormFields((prev) => {
      return {
        ...prev,
        [key]: {
          ...prev[key as keyof IRegisterFormFields],
          value,
          isError: false,
        },
      }
    })
  }

  return (
    <div className="flex flex-col justify-center items-center gap-y-3 border p-10 w-full mx-2 sm:w-[80%] md:w-[40%] bg-colorBackground rounded-lg">
      <h1 className="text-2xl font-bold">{header}</h1>
      <Form {...form}>
        {Object.values(formFields).map((fieldItem: IFields, index: number) => (
          <FormInput
            key={`${index}-${fieldItem.key}`}
            fieldItem={fieldItem}
            index={index}
            handleChange={handleChange}
          />
        ))}
      </Form>
      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading
          </>
        ) : (
          "Register"
        )}
      </Button>
      <div className="text-center py-5">
        Already have an account?{" "}
        <a href="/login" className="text-primary underline">
          Login
        </a>
      </div>
    </div>
  )
}

export default RegisterCard
