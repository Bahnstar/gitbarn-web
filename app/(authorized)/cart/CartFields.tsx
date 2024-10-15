"use client"
import { useState } from "react"
import { User } from "@supabase/supabase-js"
import { OrderSubmission } from "@/types/tigerTransaction"

const BillingInfo = () => (
  <>
    <div className="col-span-2">
      <label htmlFor="billing_address" className="block text-sm font-medium text-gray-700">
        Address
      </label>
      <div className="mt-2">
        <input
          id="billing_address"
          name="billing_address"
          type="text"
          defaultValue=""
          required
          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div className="col-span-2">
      <label htmlFor="billing_address2" className="block text-sm font-medium text-gray-700">
        Apartment, suite, etc.
      </label>
      <div className="mt-2">
        <input
          id="billing_address2"
          name="billing_address2"
          type="text"
          defaultValue=""
          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div className="col-span-1">
      <label htmlFor="billing_city" className="block text-sm font-medium text-gray-700">
        City
      </label>
      <div className="mt-2">
        <input
          id="billing_city"
          name="billing_city"
          type="text"
          defaultValue=""
          required
          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div className="col-span-1">
      <label htmlFor="billing_state" className="block text-sm font-medium text-gray-700">
        State / Province
      </label>
      <div className="mt-2">
        <input
          id="billing_state"
          name="billing_state"
          type="text"
          defaultValue=""
          required
          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div className="col-span-1">
      <label htmlFor="billing_zip" className="block text-sm font-medium text-gray-700">
        Postal Code
      </label>
      <div className="mt-2">
        <input
          id="billing_zip"
          name="billing_zip"
          type="text"
          pattern="[0-9]{5}"
          defaultValue=""
          required
          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div className="col-span-1">
      <label htmlFor="billing_country" className="block text-sm font-medium text-gray-700">
        Country
      </label>
      <div className="mt-2">
        <input
          id="billing_country"
          name="billing_country"
          type="text"
          defaultValue="United States"
          disabled
          required
          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  </>
)

const CartFields = (props: { user: User }) => {
  const { user } = props
  const [billingSame, setBillingSame] = useState(true)

  return (
    <>
      <h2 className="col-span-2 text-lg font-medium text-gray-900">Contact information</h2>

      <div className="col-span-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={user?.email}
            required
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-2">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone number
        </label>
        <div className="mt-2">
          <input
            id="phone"
            name="phone"
            type="phone"
            defaultValue=""
            required
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-2">
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
          Company
        </label>
        <div className="mt-2">
          <input
            id="company"
            name="company"
            type="text"
            defaultValue=""
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <hr className="col-span-2" />

      <h2 className="col-span-2 text-lg font-medium text-gray-900">Shipping information</h2>
      <div className="col-span-1">
        <label htmlFor="shipping_first_name" className="block text-sm font-medium text-gray-700">
          First name
        </label>
        <div className="mt-2">
          <input
            id="shipping_first_name"
            name="shipping_first_name"
            type="text"
            defaultValue=""
            required
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-1">
        <label htmlFor="shipping_last_name" className="block text-sm font-medium text-gray-700">
          Last name
        </label>
        <div className="mt-2">
          <input
            id="shipping_last_name"
            name="shipping_last_name"
            type="text"
            defaultValue=""
            required
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-2">
        <label htmlFor="shipping_address1" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <div className="mt-2">
          <input
            id="shipping_address1"
            name="shipping_address1"
            type="text"
            defaultValue=""
            required
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-2">
        <label htmlFor="shipping_address2" className="block text-sm font-medium text-gray-700">
          Apartment, suite, etc.
        </label>
        <div className="mt-2">
          <input
            id="shipping_address2"
            name="shipping_address2"
            type="text"
            defaultValue=""
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-1">
        <label htmlFor="shipping_city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <div className="mt-2">
          <input
            id="shipping_city"
            name="shipping_city"
            type="text"
            defaultValue=""
            required
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-1">
        <label htmlFor="shipping_state" className="block text-sm font-medium text-gray-700">
          State / Province
        </label>
        <div className="mt-2">
          <input
            id="shipping_state"
            name="shipping_state"
            type="text"
            defaultValue=""
            required
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-1">
        <label htmlFor="shipping_zip" className="block text-sm font-medium text-gray-700">
          Postal Code
        </label>
        <div className="mt-2">
          <input
            id="shipping_zip"
            name="shipping_zip"
            type="text"
            pattern="[0-9]{5}"
            defaultValue=""
            required
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-1">
        <label htmlFor="shipping_country" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <div className="mt-2">
          <input
            id="shipping_country"
            name="shipping_country"
            type="text"
            defaultValue="United States"
            disabled
            required
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <hr className="col-span-2" />
      <h2 className="col-span-2 text-lg font-medium text-gray-900">Billing information</h2>

      <div className="relative col-span-2 flex items-start">
        <div className="flex h-6 items-center">
          <input
            id="same_billing_address"
            name="same_billing_address"
            type="checkbox"
            defaultChecked
            value={billingSame.toString()}
            onChange={() => setBillingSame(!billingSame)}
            aria-describedby="same-billing-description"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label htmlFor="same_billing_address" className="font-medium text-gray-900">
            Billing address
          </label>{" "}
          <span id="same-billing-description" className="text-gray-500">
            <span className="sr-only">Billing address </span>is same as shipping address
          </span>
        </div>
      </div>

      {!billingSame && <BillingInfo />}

      <div className="col-span-2">
        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
          Card number
        </label>
        <div className="mt-1">
          <div id="ccnumber"></div>
        </div>
      </div>

      <div className="col-span-1">
        <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
          Expiration date (MM/YY)
        </label>
        <div className="mt-1">
          <div id="ccexp"></div>
        </div>
      </div>

      <div>
        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
          CVC
        </label>
        <div className="mt-1">
          <div id="cvv"></div>
        </div>
      </div>
    </>
  )
}

export default CartFields
