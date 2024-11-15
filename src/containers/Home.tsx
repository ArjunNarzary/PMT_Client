import CustomDialog from "@/components/customdialog/CustomDialog"
import ProductCard from "@/components/product/ProductCard"
import { Button } from "@/components/ui/button"
import { IFields, IProjects } from "@/interface"
import { useAddProjectMutation, useGetAllProjectsQuery } from "@/redux/services"
import { useState } from "react"
import { useSelector } from "react-redux"
import { IProjectFormFields, projectFormFields } from "./projectForm"
import { Form } from "@/components/ui/form"
import { FormInput } from "@/components"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const form = useForm()
  const navigate = useNavigate()
  const REDUXUSER = useSelector(
    (state: { AUTHUSER: { token: string } }) => state.AUTHUSER
  )
  const { data: allProjects } = useGetAllProjectsQuery({
    token: REDUXUSER.token,
  })

  const [addProject, { isLoading: addProjectLoading }] = useAddProjectMutation()

  const [open, setOpen] = useState(false)
  const [formFields, setFormFields] =
    useState<IProjectFormFields>(projectFormFields)

  const handleClick = (id: string) => {
    navigate("/task", { state: { projectId: id } })
  }

  const handleAddProject = () => {
    if (!formFields.title.value || !formFields.description.value) {
      setFormFields((prev) => {
        return Object.entries(prev).reduce((acc, [key, value]) => {
          if (!value.value) {
            acc[key as keyof IProjectFormFields] = {
              ...prev[key as keyof IProjectFormFields],
              errorMessage: "This field is required",
              isError: true,
            }
          } else {
            acc[key as keyof IProjectFormFields] = {
              ...prev[key as keyof IProjectFormFields],
              errorMessage: "",
              isError: false,
            }
          }
          return acc
        }, {} as IProjectFormFields)
      })
      return
    }

    addProject({
      token: REDUXUSER.token,
      title: formFields.title.value,
      description: formFields.description.value,
    }).then((res) => {
      if (res.data) {
        setOpen(false)
        setFormFields(projectFormFields)
      }
    })
  }

  const handleChange = (key: string, value: string | number | Date) => {
    setFormFields((prev) => {
      return {
        ...prev,
        [key]: {
          ...prev[key as keyof IProjectFormFields],
          value,
          isError: false,
        },
      }
    })
  }

  return (
    <>
      <div className="flex justify-end my-2">
        <Button variant={"outline"} onClick={() => setOpen(true)}>
          New Project
        </Button>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {allProjects?.map((project: IProjects) => (
          <ProductCard
            key={project._id}
            project={project}
            handleClick={handleClick}
          />
        ))}
      </section>

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
          <Button onClick={handleAddProject} disabled={false}>
            {addProjectLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating project...
              </>
            ) : (
              "Add Project"
            )}
          </Button>
        </div>
      </CustomDialog>
    </>
  )
}

export default Home
