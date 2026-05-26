import { useState } from "react"

/** Pill tag with remove button */
function Tag({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-(--color-primary)/10 text-(--color-primary) text-sm font-medium">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="ml-0.5 hover:text-red-500 transition-colors leading-none"
        aria-label={`Remove ${label}`}
      >
        ×
      </button>
    </span>
  )
}

/**
 * Multi-tag input.
 * Press Enter or comma to add a tag. Backspace on empty input removes the last tag.
 */
export default function TagInput({ tags, onChange, placeholder }) {
  const [input, setInput] = useState("")

  const addTag = () => {
    const val = input.trim().replace(/,$/, "")
    if (val && !tags.includes(val)) onChange([...tags, val])
    setInput("")
  }

  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag()
    } else if (e.key === "Backspace" && input === "" && tags.length) {
      onChange(tags.slice(0, -1))
    }
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 border border-border rounded-lg bg-background min-h-[42px] focus-within:ring-2 focus-within:ring-(--color-primary)/30 focus-within:border-(--color-primary) transition-all">
      {tags.map((t) => (
        <Tag key={t} label={t} onRemove={() => onChange(tags.filter((x) => x !== t))} />
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        onBlur={addTag}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
      />
    </div>
  )
}