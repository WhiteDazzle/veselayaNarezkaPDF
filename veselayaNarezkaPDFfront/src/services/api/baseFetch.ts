const baseUrl = process.env.REACT_APP_API_KEY

export const baseFetch = (additionUrl: string, options = {}): any => {
  const url = baseUrl + additionUrl;
  console.log(url)
  return fetch(url, options);
}
