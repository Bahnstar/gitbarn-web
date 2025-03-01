"use client"

import { Profile } from "@/types/profile"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { formatDate } from "@/utils/utils"
import { X } from "lucide-react"

interface UserDetailsModalProps {
  user: Profile | null
  isOpen: boolean
  onClose: () => void
}

export default function UserDetailsModal({ user, isOpen, onClose }: UserDetailsModalProps) {
  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>User Details</span>
            <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
              <X className="h-4 w-4" />
            </button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-lg font-semibold text-gray-600">
              {user.first_name.charAt(0)}
              {user.last_name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-medium">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Username</h4>
              <p>{user.username}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Role</h4>
              <p className="capitalize">{user.role}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Customer ID</h4>
              <p className="truncate">{user.customer_id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Last Updated</h4>
              <p>{formatDate(user.updated_at, "MM/dd/yyyy HH:mm")}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="mb-2 text-sm font-medium text-gray-500">User ID</h4>
            <p className="break-all text-xs text-gray-500">{user.id}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
