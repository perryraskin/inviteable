import { useState } from "react"
import Image from "react-image-enlarger"
export function ClickableImage({ src, className, title }) {
  const [zoomed, setZoomed] = useState(false)

  return (
    <Image
      className={className}
      zoomed={zoomed}
      src={src}
      onClick={() => setZoomed(true)}
      onRequestClose={() => setZoomed(false)}
      title={title}
    />
  )
}
