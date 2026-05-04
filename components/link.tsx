import * as React from "react"

export const linkClassName =
  "mx-2 px-1 pt-1 border-b-2 border-main font-bold font-mono focus:outline-none focus:ring-4 focus:ring-main/50 focus:border-transparent hover:bg-main"

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
