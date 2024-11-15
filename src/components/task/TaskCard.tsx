import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ITaskPayload } from "@/interface"
import {
  getBackgroundColor,
  getBorderColor,
  getFirstTwoCharacters,
  STATUS,
} from "@/lib/utils"
import { useGetAllUsersQuery, useUpdateTaskMutation } from "@/redux/services"
import { useSelector } from "react-redux"

interface ITaskCardProps {
  task: ITaskPayload
}

const TaskCard = ({ task }: ITaskCardProps) => {
  const REDUXUSER = useSelector(
    (state: { AUTHUSER: { token: string } }) => state.AUTHUSER
  )
  const { data: getAllUsers } = useGetAllUsersQuery({
    token: REDUXUSER.token,
  })
  const [updateTask] = useUpdateTaskMutation()
  const handleStatusChange = (status: string, key: string) => {
    if (status === task[key as keyof ITaskPayload]) return

    updateTask({
      _id: task._id,
      [key]: status,
      token: REDUXUSER.token,
    })
  }

  return (
    <TooltipProvider>
      <div className="min-h-14 flex justify-between items-center border p-2 rounded">
        <div className="flex justify-start items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar>
                    {task?.assignee?.name ? (
                      <AvatarFallback>
                        {getFirstTwoCharacters(task.assignee.name)}
                      </AvatarFallback>
                    ) : (
                      <AvatarImage src="https://github.com/shadcn.png" />
                    )}
                  </Avatar>
                </TooltipTrigger>
                {task?.assignee?.name && (
                  <TooltipContent>
                    <p>{task?.assignee?.name}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {getAllUsers &&
                getAllUsers.length > 0 &&
                getAllUsers?.map(
                  (user: { _id: string; name: string; email: string }) => (
                    <DropdownMenuItem
                      key={user._id}
                      onSelect={() => handleStatusChange(user._id, "assignee")}
                    >
                      <div>
                        <Avatar>
                          {user?.name ? (
                            <AvatarFallback>
                              {getFirstTwoCharacters(user.name)}
                            </AvatarFallback>
                          ) : (
                            <AvatarImage src="https://github.com/shadcn.png" />
                          )}
                        </Avatar>
                      </div>
                      <span>{user.name}</span>
                    </DropdownMenuItem>
                  )
                )}
            </DropdownMenuContent>
          </DropdownMenu>

          <div>{task.title}</div>
        </div>
        <div className="flex gap-2 justify-end items-center">
          <Badge
            variant="outline"
            className={`capitalize ${getBorderColor(task.priority)}`}
          >
            {task.priority}
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Badge
                variant={"secondary"}
                className={getBackgroundColor(task.status)}
              >
                {task.status}
              </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {STATUS.filter((status: string) => status !== task.status).map(
                (status: string) => (
                  <DropdownMenuItem
                    key={status}
                    onSelect={() => handleStatusChange(status, "status")}
                  >
                    {status}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default TaskCard
