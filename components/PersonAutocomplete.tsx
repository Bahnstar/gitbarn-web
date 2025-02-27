"use client"

import * as React from "react"
import { useEffect } from "react"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getProfilesByEmail } from "@/server/handlers/profiles"
import { Profile } from "@/types/profile"
import { getUserWithProfile } from "@/server/handlers/users"

type Props = {
  setCustomerId: (customerId: string) => void
  autoInitialCustomer?: boolean
}

export default function PersonAutocomplete(props: Props) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [profiles, setProfiles] = React.useState<Profile[]>([])
  const [loading, setLoading] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleSearch = async (search: string) => {
    if (!search) {
      setProfiles([])
      return
    }

    setLoading(true)
    try {
      const { data, error } = await getProfilesByEmail(search)
      if (error) throw error
      setProfiles(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching profiles:", error)
      setProfiles([])
    } finally {
      setLoading(false)
    }
  }

  const debouncedSearch = React.useMemo(
    () => debounce((search: string) => handleSearch(search), 300),
    [],
  )

  useEffect(() => {
    const getInitialUser = async () => {
      const { data: userData, error } = await getUserWithProfile()
      setProfiles([userData!])
      setValue(userData!.id)
    }

    if (props.autoInitialCustomer) getInitialUser()
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${value ? "text-black" : "text-gray-400"} text-md w-full justify-between rounded-md border border-gray-300 px-3 py-2 font-normal shadow-xs hover:bg-gray-100`}
        >
          {value ? profiles.find((profile) => profile.id === value)?.email : "Select User"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full border bg-white p-0 shadow-md dark:bg-slate-950">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search Email..."
            value={inputValue}
            onValueChange={(search) => {
              setInputValue(search)
              debouncedSearch(search)
            }}
          />
          <CommandList>
            <CommandEmpty>
              {loading ? (
                <Loader2 className="m-auto animate-spin" />
              ) : inputValue.length > 0 ? (
                "No users found."
              ) : (
                "Type to search..."
              )}
            </CommandEmpty>
            <CommandGroup>
              {profiles.map((profile) => (
                <CommandItem
                  key={profile.id}
                  value={profile.email}
                  onSelect={() => {
                    setValue(profile.id)
                    props.setCustomerId(profile.id)
                    setOpen(false)
                  }}
                  className="data-[selected='true']:bg-gray-300"
                >
                  {profile.email}
                  <Check
                    className={cn("ml-auto", value === profile.id ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
