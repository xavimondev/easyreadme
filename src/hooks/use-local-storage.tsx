import { useEffect, useState } from 'react'

function useLocalStorage<T>(
  key: string,
  initialValue: T
  // eslint-disable-next-line no-unused-vars
): {
  content: T
  setValue: (value: T) => void
} {
  const [content, setContent] = useState(initialValue)

  useEffect(() => {
    // Retrieve from localStorage
    const item = window.localStorage.getItem(key)
    if (item) {
      setContent(JSON.parse(item))
    }
  }, [key])

  const setValue = (value: T) => {
    // Save state
    setContent(value)
    // Save to localStorage
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  return {
    content,
    setValue
  }
}

export default useLocalStorage
