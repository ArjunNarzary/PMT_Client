import { IFields } from "@/interface"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const setZodValidationError = <T extends { [key: string]: IFields }>(
  error: ZodError,
  formFields: T
) => {
  const newObj = formFields
  if (error.issues.length > 0) {
    error.issues.map((issue) => {
      if (issue.path[0] in newObj) {
        ;(newObj as { [key: string]: IFields })[issue.path[0]] = {
          ...newObj[issue.path[0]],
          isError: true,
          errorMessage: issue.message,
        }
      }
    })
  }
  return newObj
}

export const getFirstTwoCharacters = (str: string): string => {
  const separateName = str.split(" ")
  if (separateName.length > 1) {
    const firstTwoCharacters = separateName[0][0] + separateName[1][0]
    return firstTwoCharacters.toUpperCase()
  }
  return str.slice(0, 2).toUpperCase()
}

export const getBorderColor = (priority: string): string => {
  if (priority === "high") {
    return "border-red-500"
  } else if (priority === "medium") {
    return "border-yellow-500"
  } else {
    return "border-green-500"
  }
}

export const getBackgroundColor = (status: string): string => {
  if (status === "BLOCKED") {
    return "bg-red-800"
  } else if (status === "IN PROGRESS") {
    return "bg-blue-900"
  } else if (status === "DONE") {
    return "bg-green-500 text-black"
  } else {
    return "bg-gray-800 "
  }
}

export const STATUS = ["TO DO", "IN PROGRESS", "DONE", "BLOCKED"]
