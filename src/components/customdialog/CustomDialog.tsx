import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import React from "react"

interface ICustomDialogProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  children: React.ReactNode
}
const CustomDialog = ({
  open,
  setOpen,
  title,
  children,
}: ICustomDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-6">{title}</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CustomDialog
