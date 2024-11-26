"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

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

type Props = {
  setCustomerId: (customerId: string) => void
}

export default function ComboBox(props: Props) {
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-gray-400"
        >
          {value ? profiles.find((profile) => profile.id === value)?.email : "Select User..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
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
              {loading
                ? "Loading..."
                : inputValue.length > 0
                  ? "No users found."
                  : "Type to search..."}
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
