import { useState } from 'react'
import useShowToast from './useShowToast'

const usePreviewImg = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const showToast = useShowToast()

  // 為2mb容量
  const maxFileSizeInBytes = 2 * 1024 * 1024

  const handleImageChange = (e) => {
    // 取得file第一個檔案
    const file = e.target.files[0]

    // 檢查是否有file並且file型別是否為image格式
    if (file && file.type.startsWith('image/')) {
      // 再檢查大小，不可以超過2mb
      if (file.size > maxFileSizeInBytes) {
        showToast('Error', 'File size must be less than 2MB', 'error')
        setSelectedFile(null)
      }

      // 為FileReader實例，可以讀取file資料
      const reader = new FileReader()

      // 設定事件處理，設定onloadend意思是指為讀取操作結束時，不管成功或失敗都會觸發
      reader.onloadend = () => {
        setSelectedFile(reader.result)
      }

      reader.readAsDataURL(file)
    } else {
      showToast('Error', 'Please select an image file', 'error')
      setSelectedFile(null)
    }
  }

  return { selectedFile, handleImageChange, setSelectedFile }
}

export default usePreviewImg
