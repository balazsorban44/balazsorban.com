export function Link(props: React.HTMLProps<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className={`mx-2 px-1 pt-1 border-b-2 border-main font-bold font-mono focus:outline-none focus:ring-4 focus:ring-main focus:ring-opacity-50 focus:border-transparent hover:bg-main ${
        props.className ?? ""
      }`}
    />
  )
}
