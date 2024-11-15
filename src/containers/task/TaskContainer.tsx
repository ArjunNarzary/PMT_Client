import CustomDialog from "@/components/customdialog/CustomDialog"
import TaskCard from "@/components/task/TaskCard"
import { Button } from "@/components/ui/button"
import { IFields, ITaskPayload } from "@/interface"
import { useAddTaskMutation, useGetAllTaskQuery } from "@/redux/services"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { ITaskFormFields, taskFormFields } from "../projectForm"
import { useForm } from "react-hook-form"
import { FormInput } from "@/components"
import { Form } from "@/components/ui/form"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import moment from "moment"

const TaskContainer = () => {
  const form = useForm<ITaskFormFields>()
  const { state } = useLocation()
  const { toast } = useToast()
  const REDUXUSER = useSelector(
    (state: { AUTHUSER: { token: string } }) => state.AUTHUSER
  )
  const [open, setOpen] = useState(false)
  const [formFields, setFormFields] = useState<ITaskFormFields>(taskFormFields)

  const { data } = useGetAllTaskQuery({
    projectId: state.projectId,
    token: REDUXUSER.token,
  })

  const [addTask, { isLoading: addTaskLoading }] = useAddTaskMutation()

  const handleChange = (key: string, value: string | number | Date) => {
    setFormFields((prev) => {
      return {
        ...prev,
        [key]: {
          ...prev[key as keyof ITaskFormFields],
          value,
          isError: false,
        },
      }
    })
  }

  const handleAddTask = () => {
    if (!formFields?.title?.value) {
      setFormFields((prev) => {
        return {
          ...prev,
          title: {
            ...prev.title,
            isError: true,
            errorMessage: "This field is required",
          },
        }
      })

      return
    }

    const dueDateValue = formFields?.dueDate?.value
    const dueDate = dueDateValue
      ? moment(dueDateValue as string, "MM/DD/YYYY").isValid()
        ? new Date(dueDateValue as string)
        : undefined
      : undefined

    addTask({
      projectId: state.projectId,
      token: REDUXUSER.token,
      title: formFields?.title?.value,
      description: formFields?.description?.value,
      dueDate,
      estimate:
        formFields?.estimate?.value && Number(formFields.estimate.value),
    }).then((res) => {
      if (res.data) {
        setOpen(false)
        setFormFields(taskFormFields)
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <>
      <div className="flex justify-end my-2">
        <Button variant={"outline"} onClick={() => setOpen(true)}>
          Add Task
        </Button>
      </div>
      <div className="flex flex-col gap-y-4">
        {data?.map((task: ITaskPayload) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>

      <CustomDialog open={open} setOpen={setOpen} title="New Project">
        <div className="flex flex-col gap-4">
          <Form {...form}>
            {Object.values(formFields).map(
              (fieldItem: IFields, index: number) => (
                <FormInput
                  key={`${index}-${fieldItem.key}`}
                  fieldItem={fieldItem}
                  index={index}
                  handleChange={handleChange}
                  noCss={true}
                />
              )
            )}
          </Form>
          <Button onClick={handleAddTask} disabled={false}>
            {addTaskLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating task...
              </>
            ) : (
              "Add Task"
            )}
          </Button>
        </div>
      </CustomDialog>
    </>
  )
}

export default TaskContainer
