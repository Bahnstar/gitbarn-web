"use client"
import { searchProfiles } from "@/server/handlers/profiles"
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import { Profile } from "@/types/profile"
import { toast } from "sonner"

const PersonAutocomplete = () => {
  const [results, setResults] = useState<Profile[]>([])

  const handleSearch = async (search: string) => {
    if (search.trim() === "") return

    const { data, error } = await searchProfiles(search)

    if (error) return toast.error("There was an error while searching for users")

    setResults(data)
  }

  return (
    <Combobox defaultValue="" name="user">
      <Label className="block text-sm/6 font-medium text-gray-900">Assigned to</Label>
      <div className="relative my-2">
        <ComboboxInput
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          onChange={(event) => handleSearch(event.target.value)}
          displayValue={(u: Profile) => (u ? u?.first_name + " " + u?.last_name : "")}
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="size-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>

        {results.length > 0 && (
          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {results.map((user) => (
              <ComboboxOption
                key={user.id}
                value={user}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
              >
                <span className="block truncate group-data-[selected]:font-semibold">
                  {user.first_name} {user.last_name}
                </span>

                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                  <CheckIcon className="size-5" aria-hidden="true" />
                </span>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>
    </Combobox>
  )
}

export default PersonAutocomplete
