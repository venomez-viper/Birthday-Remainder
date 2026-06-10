"use client"

import { forwardRef } from "react"
import HTMLFlipBookBase from "react-pageflip"

const HTMLFlipBook = HTMLFlipBookBase as any

/**
 * next/dynamic does not forward refs to a lazily-imported component, so a ref
 * placed directly on a dynamically-imported react-pageflip resolves to null.
 * Wrapping it in our own forwardRef boundary and dynamic-importing THIS file
 * makes `ref.current.pageFlip()` work. (See react-pageflip / next/dynamic refs.)
 */
const FlipBook = forwardRef<any, any>(function FlipBook(props, ref) {
  return <HTMLFlipBook ref={ref} {...props} />
})

export default FlipBook
