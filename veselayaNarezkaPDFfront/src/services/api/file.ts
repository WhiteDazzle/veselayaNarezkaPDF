import { baseFetch } from "./baseFetch";

export const postFile = async (file: any) => {
  let data = new FormData(); // создаем экземпляр FormData
  data.append('file', file, file.name); // добавляем файл в FormData
  const response = await baseFetch('file/upload', {
    method: 'POST',
    headers: {
      'Accept': "application/json, text/plain, */*"
    },
    body: data
  })
  if (!response.ok) {
    console.log(1236)
    return
  }
  const responseObj = response.json()
  return responseObj
}

export const getPageCount = async (folderName: string) => {
  const response = await baseFetch(`file/count/${folderName}`, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const responseObj = response.json()
  return responseObj
}
