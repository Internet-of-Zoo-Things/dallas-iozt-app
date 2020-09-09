import { useState, useLayoutEffect } from 'react'

export default function useElementSize(id) {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize({
        height: document.getElementById(id) ? document.getElementById(id).offsetHeight : 0,
        width: document.getElementById(id) ? document.getElementById(id).offsetWidth : 0
      })
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}
