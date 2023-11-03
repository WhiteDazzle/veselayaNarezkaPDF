import { baseFetch } from "./baseFetch";

export const getProfile = async () => {
    const response = await baseFetch('profile', {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (!response.ok) {
      console.log(1236)
      return
    }
    const responseObj = response.json()
    return responseObj
}

export const logInProfile = async (name: string, password: string) => {
  const response = await baseFetch('profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:  JSON.stringify({
      name: name,
      password: password
    })
  })
  if (!response.ok) {
    console.log(1236)
    return
  }
  const responseObj = response.json()
  return responseObj
}

export const DeleteSession = async () => {
  const response = await baseFetch('profile/session', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (!response.ok) {
    console.log(1236)
    return
  }
  const responseObj = response.json()
  return responseObj
}
