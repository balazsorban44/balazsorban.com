import Link from "next/link"
import Image from "next/image"
import { Emoji } from "components/emoji"
import { Link as StyledLink } from "components/link"

const CustomLink = (props) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"))

  if (isInternalLink) {
    return (
      // eslint-disable-next-line @next/next/link-passhref
      <Link href={href}>
        <StyledLink {...props} />
      </Link>
    )
  }

  return <StyledLink target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

const MDXComponents = {
  Image: RoundedImage,
  a: CustomLink,
  Emoji,
}

export default MDXComponents
