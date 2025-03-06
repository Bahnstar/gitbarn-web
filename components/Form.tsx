"use client"
import { PropsWithChildren, useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import Link from "next/link"
import { redirect } from "next/navigation"
import { toast } from "sonner"

import Toaster from "@/components/Toaster"

export type FormResponse = {
  message: string
  status: string
}
type ActionFunction = (prevState: any, formData: FormData) => Promise<FormResponse>

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
      {pending ? (
        <span className="loading loading-md loading-spinner"></span>
      ) : (
        (() => (
          <>
            <Link
              href="/products/manage"
              type="button"
              className="text-sm leading-6 font-semibold text-gray-900"
            >
              Cancel
            </Link>
            <button type="submit" className="btn-primary">
              Save
            </button>
          </>
        ))()
      )}
    </div>
  )
}

const Form = (
  props: PropsWithChildren<{
    action: ActionFunction
    redirect?: string
    showSubmitButton?: boolean
    className?: string
  }>,
) => {
  const initialState: FormResponse = {
    message: "",
    status: "unknown",
  }

  const [state, formAction] = useActionState(props.action, initialState)

  useEffect(() => {
    if (state.status === "error") toast.error(state?.message)

    if (state.status === "info") toast.info(state?.message)

    if (state.status === "success") {
      toast.info(state?.message)
      props.redirect && redirect(props.redirect)
    }
  }, [state])

  return (
    <form
      className={`${props.className ? props.className : "flex flex-col gap-6"}`}
      action={formAction}
    >
      {props.children}
      {props.showSubmitButton && <SubmitButton />}
    </form>
  )
}

export default Form
