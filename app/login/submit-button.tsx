"use client"

import { useFormStatus, useFormState } from "react-dom"
import { type ComponentProps, useState } from "react"

type Props = ComponentProps<"button"> & {
  pendingText?: string
}

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus()

  const isPending = pending && action === props.formAction

  return (
    <button {...props} type="submit" aria-disabled={pending}>
      {isPending ? pendingText : children}
    </button>
  )
}
