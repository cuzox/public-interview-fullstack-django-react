import { useEffect, useState } from 'react'

/*
  takes in a string and returns a hash int code
  which can be useful for generating react keys
  base on input strings, that may or may not change

  const [hashCode, setHashCodeString] = useHashCode()
*/

function useHashCode(initialString = '') {
  const [str, setStr] = useState(initialString)
  const [hash, setHash] = useState(0)

  useEffect(() => {
    let newHash = 0

    if (str.length === 0) {
      return newHash
    }

    for (let i = 0; i < str.length; i++) {
      const chr = str.charCodeAt(i)
      newHash = ((newHash << 5) - newHash) + chr
      newHash |= 0 // convert to 32bit int
    }

    setHash(newHash)
  }, [str, setHash])
  
  return [hash, setStr]
}

export default useHashCode
