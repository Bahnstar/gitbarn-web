"use client"
import { useState, useEffect } from "react"
import Script from "next/script"
import Link from "next/link"

const CollectJSSection = () => {
  return (
    <div>
      <div id="ccnumber"></div>
      <div id="ccexp"></div>
      <div id="cvv"></div>
    </div>
  )
}

const InlineCartPage = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [amount, setAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== "undefined" && window.CollectJS) {
      window.CollectJS.configure({
        variant: "inline",
        styleSniffer: false,
        callback: (token) => {
          console.log(token)
          finishSubmit(token)
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

  const finishSubmit = (response) => {
    const formData = {
      firstName,
      lastName,
      amount,
      token: response.token,
    }
    console.log(formData)
    setIsSubmitting(false)
    setAlertMessage("The form was submitted. Check the console to see the output data.")
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(event)
    setIsSubmitting(true)
    window.CollectJS.startPaymentRequest()
  }

  return (
    <div>
      <Script
        src="https://secure.safewebservices.com/token/Collect.js"
        data-tokenization-key="7T6M5Z-DPpE87-M2WhW3-4Nx72C"
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
