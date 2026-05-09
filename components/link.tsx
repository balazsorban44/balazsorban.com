import * as React from "react"

export const linkClassName =
  "mx-2 px-1 pt-1 border-b-2 border-accent text-ink font-bold font-mono focus:outline-none focus:ring-4 focus:ring-accent/40 focus:border-transparent hover:bg-accent hover:text-bg transition-colors"

export const Link = React.forwardRef(function Link(
  props: React.HTMLProps<HTMLAnchorElement>,
  ref: any
) {
  return (
    <a
      ref={ref}
      {...props}
      className={`${linkClassName} ${props.className ?? ""}`}
    />
  )
})
