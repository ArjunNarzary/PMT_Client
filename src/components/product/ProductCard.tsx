import { IProjects } from "@/interface"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface IProductCardProps {
  project: IProjects
  handleClick: (id: string) => void
}

const ProductCard = ({ project, handleClick }: IProductCardProps) => {
  return (
    <Card
      className="hover:bg-gray-900 cursor-pointer"
      onClick={() => handleClick(project?._id)}
      key={project._id}
    >
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <p>{`Created By: ${project?.creator?.name}`}</p>
        {project?.createdAt && (
          <p>{`Created On: ${new Date(project.createdAt).toLocaleDateString(
            "en"
          )}`}</p>
        )}
      </CardFooter>
    </Card>
  )
}

export default ProductCard
