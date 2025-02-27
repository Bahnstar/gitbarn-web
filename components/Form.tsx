"use client"
import { PropsWithChildren, useActionState } from "react"
import { useFormStatus } from "react-dom"
import Link from "next/link"
import { redirect } from "next/navigation"

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
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        (() => (
          <>
            <Link
              href="/products/manage"
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
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

  return (
    <form
      className={`${props.className ? props.className : "flex flex-col gap-6"}`}
      action={formAction}
    >
      {state.status !== "unknown" && <Toaster message={state?.message} />}
      {state.status === "success" && props.redirect && redirect(props.redirect)}
      {props.children}
      {props.showSubmitButton && <SubmitButton />}
    </form>
  )
}

export default Form
