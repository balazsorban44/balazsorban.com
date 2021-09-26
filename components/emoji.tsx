export function Emoji(props: { label: string; children: string }) {
  return (
    <span role="img" aria-label={props.label}>
      {props.children}
    </span>
  )
}
