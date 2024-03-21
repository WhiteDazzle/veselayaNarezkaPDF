import { useEffect, useState } from "react";
import { getPageCount, postFile } from "../../../services/api/file";

import styles from "./main.module.scss";
import { DeleteSession, getProfile } from "../../../services/api/profile";

const Main = ({setIsAuthenticated}: {setIsAuthenticated: (value: boolean) => void}) => {
  const [file, setFile] = useState()
  const [user, setUser] = useState({name: '', email: ''})
  const [folderName, setFolderName] = useState('')
  const [pageCount, setPageCount] = useState(0)
  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };
  
  const sendFile = async () => {
    const response = await postFile(file)
    setFolderName(response?.folderName)
    console.log(response)
  }
  
  const handleGetPageCount = async () => {
    const response = await getPageCount(folderName)
    response?.count && setPageCount(response?.count)
  } 
  
  const handleDeleteSession = async () => {
    const response = await DeleteSession()
    if (response.success) setIsAuthenticated(false)
    console.log(response)
  }
  
  const handleGetProfile = async () => {
    try{
      const user = await getProfile()
      setUser(user)
    } catch (err: any) {
      console.log(err)
      setUser({name: '', email: ''})
    }
  }
  
  useEffect(() => {
    console.log(user)
  }, [user])
  
  useEffect(() => {
    console.log(file)
  }, [file])
  return (
    <div>
      <input type='file' onChange={handleFileChange}/>
      <button  className={styles['button-submit']} onClick={sendFile}> отправить </button>
      <button className={styles['button-submit']} onClick={handleGetProfile}>получить информацию о профиле</button>
      {user?.name &&
        <p>{user?.name}</p>
      }
      {user?.email &&
        <p>{user?.email}</p>
      }
      <button className={styles['button-submit']} onClick={handleDeleteSession}>выйти из аккаунта</button>
      <button className={styles['button-submit']} onClick={handleGetPageCount}>проверить количество страниц</button>
      {pageCount && 
        <p>количество обработанных страниц: {pageCount}</p>
      }
    </div>
  )
}

export default Main
