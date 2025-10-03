import * as React from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const Combobox = React.forwardRef(({
  className,
  options = [],
  value,
  onValueChange,
  placeholder = "Selecione uma opção...",
  searchPlaceholder = "Buscar...",
  emptyText = "Nenhum item encontrado.",
  disabled = false,
  renderOption = null, // Função customizada para renderizar opções
  ...props
}, ref) => {
  const [open, setOpen] = React.useState(false)

  const selectedOption = options.find(option => option.value === value)

  // Função padrão para renderizar opções
  const defaultRenderOption = (option) => (
    <span className="text-sm">{option.label}</span>
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between px-2 py-1 text-lg", className)}
          disabled={disabled}
          {...props}
        >
          {selectedOption ? (
            renderOption ? renderOption(selectedOption) : (
              <span className="text-sm">{selectedOption.label}</span>
            )
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0 bg-input border-border" align="start">
        <Command className="bg-input">
          <CommandInput
            placeholder={searchPlaceholder}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={`${option.value} ${option.label}`}
                  onSelect={(currentValue) => {
                    onValueChange?.(currentValue === value ? "" : option.value)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center gap-2 w-full">
                    {renderOption ? renderOption(option) : defaultRenderOption(option)}
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
})
Combobox.displayName = "Combobox"

export { Combobox }