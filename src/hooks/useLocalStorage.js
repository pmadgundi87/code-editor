import { useEffect, useState } from 'react'

const PREFIX = 'codepen-clone-'

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey)

    //if we have a value in local storage then we return it
    if (jsonValue != null) return JSON.parse(jsonValue)

//if we don't have in local storage, then we use initial value
    if (typeof initialValue === 'function') {

      return initialValue()
    } 
    else {

      return initialValue
    }
  
  })


//here we are updating the local storage each time we change value
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}
