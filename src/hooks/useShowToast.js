import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'

const useShowToast = () => {
  const toast = useToast()

  // useCallback防止重複迴圈，透過緩存函數。
  const showToast = useCallback((title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true
    })
  }, [toast])

  return showToast
}

export default useShowToast
