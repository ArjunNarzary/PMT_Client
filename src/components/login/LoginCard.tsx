import { ILoginFormFields } from "@/containers/login"
import { IFields } from "@/interface"
import React from "react"
import { Form } from "../ui/form"
import { useForm } from "react-hook-form"
import FormInput from "../formInput"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"

interface ILoginCardProps {
  formFields: ILoginFormFields
  setFormFields: React.Dispatch<React.SetStateAction<ILoginFormFields>>
  handleSubmit: () => void
  isLoading?: boolean
}
const LoginCard = ({
  formFields,
  setFormFields,
  handleSubmit,
  isLoading = false,
}: ILoginCardProps) => {
  const form = useForm()
  const handleChange = (key: string, value: string | Date | number) => {
    setFormFields((prev) => {
      return {
        ...prev,
        [key]: {
          ...prev[key as keyof ILoginFormFields],
          value,
          isError: false,
        },
      }
    })
  }

  return (
    <div className="flex flex-col justify-center items-center gap-y-3 border p-10 w-full mx-2 sm:w-[80%] md:w-[40%] bg-colorBackground rounded-lg">
      <h1 className="text-2xl font-bold">Login</h1>
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
          "Login"
        )}
      </Button>
      <div className="text-center py-5">
        Don&apos;t have an account?{" "}
        <a href="/register" className="text-primary underline">
          Register
        </a>
      </div>
    </div>
  )
}

export default LoginCard
