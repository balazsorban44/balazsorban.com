import * as React from "react"

export const linkClassName =
  "mx-1 px-1 pt-1 border-b border-ember text-ink font-bold font-mono focus:outline-none focus:ring-4 focus:ring-accent/40 focus:border-transparent hover:text-ember transition-colors"

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
