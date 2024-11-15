import { IFields } from "@/interface"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { useState } from "react"

interface IFormInputFieldProps {
  fieldItem: IFields
  index: number
  handleChange: (fieldKey: string, fieldValue: string | Date | number) => void
  noCss?: boolean
}

const FormInput = ({
  fieldItem,
  index,
  handleChange,
  noCss = false,
}: IFormInputFieldProps) => {
  const form = useForm()

  return (
    <FormField
      key={index}
      control={form.control}
      name="username"
      render={() => (
        <FormItem className="w-full">
          <FormLabel>{fieldItem.label}</FormLabel>
          <FormControl>
            {fieldItem.type === "date" ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !fieldItem.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fieldItem?.value ? (
                      format(fieldItem.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      fieldItem?.value
                        ? (new Date(fieldItem?.value) as Date)
                        : undefined
                    }
                    onSelect={(e) => handleChange(fieldItem.key, e as Date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            ) : (
              <Input
                className={`${!noCss && "bg-inputBackground text-inputText"}`}
                type={fieldItem.type}
                placeholder={fieldItem.placeHolder}
                onChange={(e) => handleChange(fieldItem.key, e.target.value)}
              />
            )}
          </FormControl>
          {fieldItem?.isError && (
            <FormMessage>{fieldItem?.errorMessage}</FormMessage>
          )}
        </FormItem>
      )}
    />
  )
}

export default FormInput
