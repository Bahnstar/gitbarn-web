"use client"
import { PropsWithChildren } from "react"
import { useFormState, useFormStatus } from "react-dom"
import Link from "next/link"
import { redirect } from "next/navigation"

import Toaster from "@/components/Toaster"
import { revalidatePath } from "next/cache"

const initialState = {
  message: "",
  status: "",
}

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
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
    action: any
    redirect?: string
    showSubmitButton?: boolean
    className?: string
  }>,
) => {
  const [state, formAction] = useFormState(props.action, initialState)

  return (
    <form
      className={`${props.className ? props.className : "flex flex-col gap-6"}`}
      action={formAction}
    >
      {state.status !== "" && <Toaster message={state.message} />}
      {state.status === "success" && props.redirect && redirect(props.redirect)}
      {props.children}
      {props.showSubmitButton && <SubmitButton />}
    </form>
  )
}

export default Form
