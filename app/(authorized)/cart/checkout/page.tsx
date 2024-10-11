"use client"
import { useState, useEffect, FormEvent } from "react"
import Script from "next/script"
import Link from "next/link"
import { Tokenization } from "@/types/tigerTransaction"

const CollectJSSection = () => {
  return (
    <div>
      <div id="ccnumber"></div>
      <div id="ccexp"></div>
      <div id="cvv"></div>
    </div>
  )
}

declare var CollectJS: any

const InlineCartPage = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [amount, setAmount] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== "undefined" && CollectJS) {
      CollectJS.configure({
        variant: "inline",
        styleSniffer: true,
        callback: (response: Tokenization) => {
          console.log("CALLBACK")
          finishSubmit(response)
        },
        fields: {
          ccnumber: {
            placeholder: "CC Number",
            selector: "#ccnumber",
          },
          ccexp: {
            placeholder: "CC Expiration",
            selector: "#ccexp",
          },
          cvv: {
            placeholder: "CVV",
            selector: "#cvv",
          },
        },
      })
    }
  }, [])

  const finishSubmit = (response: Tokenization) => {
    const formData = {
      firstName,
      lastName,
      amount,
      token: response.token,
    }
    setIsSubmitting(false)
    setAlertMessage("The form was submitted. Check the console to see the output data.")
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    CollectJS.startPaymentRequest()
  }

  return (
    <div>
      <Script
        src="https://secure.safewebservices.com/token/Collect.js"
        data-tokenization-key={process.env.NEXT_PUBLIC_COLLECTJS_KEY}
        strategy="beforeInteractive"
      />
      {alertMessage && <div className="alert">{alertMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={(event) => setLastName(event.target.value)}
            value={lastName}
          />
        </div>
        <div>
          <input
            type="text"
            name="amount"
            placeholder="Amount"
            onChange={(event) => setAmount(event.target.value)}
            value={amount}
          />
        </div>
        <CollectJSSection />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default InlineCartPage
