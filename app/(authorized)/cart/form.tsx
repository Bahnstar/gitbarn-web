"use client"
import { useState, useEffect } from "react"
import { OrderSubmission } from "@/types/tigerTransaction"
import { getCurrentUser } from "@/server/handlers/users"
import { User } from "@supabase/supabase-js"

const deliveryMethods = [
  { id: 1, title: "Standard", turnaround: "4–10 business days", price: "$5.00" },
  { id: 2, title: "Express", turnaround: "2–5 business days", price: "$16.00" },
]

const CheckoutForm = (props: { fields: OrderSubmission; setFields: Function }) => {
  const [billingSame, setBillingSame] = useState(false)

  const { fields, setFields } = props
  const updateField = (e: any) => setFields({ ...fields, [e.target.name]: e.target.value })

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await getCurrentUser()
      if (data.user?.email) {
        setFields({
          email: data.user.email,
        })
      } else console.error(error)
    }

    getUser()
  }, [])

  const BillingForm = () => (
    <>
      <div className="sm:col-span-2">
        <label htmlFor="baddress" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <div className="mt-1">
          <input
            id="baddress"
            name="address1"
            type="text"
            value={billingSame ? fields.shipping_address1 : fields.address1}
            onChange={updateField}
            required
            autoComplete="street-address"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="bapartment" className="block text-sm font-medium text-gray-700">
          Apartment, suite, etc.
        </label>
        <div className="mt-1">
          <input
            id="bapartment"
            name="address2"
            value={billingSame ? fields.shipping_address2 : fields.address2}
            onChange={updateField}
            required
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="bcity" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <div className="mt-1">
          <input
            id="bcity"
            name="city"
            type="text"
            required
            value={billingSame ? fields.shipping_city : fields.city}
            onChange={updateField}
            autoComplete="address-level2"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="bcountry" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <div className="mt-1">
          <select
            id="bcountry"
            name="country"
            required
            value={billingSame ? fields.shipping_country : fields.country}
            onChange={updateField}
            autoComplete="country-name"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="bregion" className="block text-sm font-medium text-gray-700">
          State / Province
        </label>
        <div className="mt-1">
          <input
            id="bregion"
            name="state"
            type="text"
            required
            value={billingSame ? fields.shipping_state : fields.state}
            onChange={updateField}
            autoComplete="address-level1"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="bpostal-code" className="block text-sm font-medium text-gray-700">
          Postal code
        </label>
        <div className="mt-1">
          <input
            id="bpostal-code"
            name="zip"
            type="text"
            required
            value={billingSame ? fields.shipping_zip : fields.zip}
            disabled={billingSame}
            onChange={updateField}
            autoComplete="postal-code"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </>
  )

  return (
    <div>
      <div>
        <h2 className="text-lg font-medium text-gray-900">Contact information</h2>

        <div className="mt-4">
          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email-address"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={fields.email}
              onChange={updateField}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-10">
        <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>

        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <div className="mt-1">
              <input
                id="first-name"
                name="shipping_first_name"
                type="text"
                required
                value={fields.shipping_first_name}
                onChange={updateField}
                autoComplete="given-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <div className="mt-1">
              <input
                id="last-name"
                name="shipping_last_name"
                type="text"
                required
                value={fields.shipping_last_name}
                onChange={updateField}
                autoComplete="family-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <div className="mt-1">
              <input
                id="company"
                name="company"
                value={fields.company}
                onChange={updateField}
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <div className="mt-1">
              <input
                id="address"
                name="shipping_address1"
                type="text"
                required
                value={fields.shipping_address1}
                onChange={updateField}
                autoComplete="street-address"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
              Apartment, suite, etc.
            </label>
            <div className="mt-1">
              <input
                id="apartment"
                name="shipping_address2"
                required
                value={fields.shipping_address2}
                onChange={updateField}
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <div className="mt-1">
              <input
                id="city"
                name="shipping_city"
                type="text"
                required
                value={fields.shipping_city}
                onChange={updateField}
                autoComplete="address-level2"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <div className="mt-1">
              <select
                id="country"
                name="shipping_country"
                required
                value={fields.shipping_country}
                onChange={updateField}
                autoComplete="country-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
              State / Province
            </label>
            <div className="mt-1">
              <input
                id="region"
                name="shipping_state"
                type="text"
                required
                value={fields.shipping_state}
                onChange={updateField}
                autoComplete="address-level1"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
              Postal code
            </label>
            <div className="mt-1">
              <input
                id="postal-code"
                name="shipping_zip"
                type="text"
                required
                value={fields.shipping_zip}
                onChange={updateField}
                autoComplete="postal-code"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <div className="mt-1">
              <input
                id="phone"
                name="phone"
                type="text"
                required
                value={fields.phone}
                onChange={updateField}
                autoComplete="tel"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-5 flex items-start">
        <div className="flex h-6 items-center">
          <input
            id="billingSame"
            name="same_addresses"
            type="checkbox"
            onChange={() => setBillingSame(!billingSame)}
            value={billingSame.toString()}
            aria-describedby="candidates-description"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label htmlFor="billingSame" className="font-medium text-gray-900">
            Billing address
          </label>{" "}
          <span id="candidates-description" className="text-gray-500">
            <span className="sr-only">Billing address </span>is same as shipping address
          </span>
        </div>
      </div>

      {/* <div className="mt-10 border-t border-gray-200 pt-10">
        <fieldset>
          <legend className="text-lg font-medium text-gray-900">Delivery method</legend>
          <RadioGroup
            value={selectedDeliveryMethod}
            onChange={setSelectedDeliveryMethod}
            className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
          >
            {deliveryMethods.map((deliveryMethod) => (
              <Radio
                key={deliveryMethod.id}
                value={deliveryMethod}
                aria-label={deliveryMethod.title}
                aria-description={`${deliveryMethod.turnaround} for ${deliveryMethod.price}`}
                className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[checked]:border-transparent data-[focus]:ring-2 data-[focus]:ring-indigo-500"
              >
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <span className="block text-sm font-medium text-gray-900">
                      {deliveryMethod.title}
                    </span>
                    <span className="mt-1 flex items-center text-sm text-gray-500">
                      {deliveryMethod.turnaround}
                    </span>
                    <span className="mt-6 text-sm font-medium text-gray-900">
                      {deliveryMethod.price}
                    </span>
                  </span>
                </span>
                <CheckCircleIcon
                  aria-hidden="true"
                  className="h-5 w-5 text-indigo-600 [.group:not([data-checked])_&]:hidden"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                />
              </Radio>
            ))}
          </RadioGroup>
        </fieldset>
      </div> */}

      {/* Payment */}
      <div className="mt-10 border-t border-gray-200 pt-10">
        <h2 className="text-lg font-medium text-gray-900">Billing information</h2>

        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          {!billingSame && <BillingForm />}

          {/* <div className="col-span-2">
            <label htmlFor="card-name" className="block text-sm font-medium text-gray-700">
              Name on card
            </label>
            <div className="mt-1">
              <input
                id="name-on-card"
                name="card-name"
                type="text"
                required
                value={fields.cardName}
                onChange={updateField}
                autoComplete="cc-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div> */}

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
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm
