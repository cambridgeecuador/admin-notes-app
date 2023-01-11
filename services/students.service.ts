import { config } from '../config';

export async function getStudents(accessToken: string) {
  const urlAPI = `${config.apiURL}/users`;
  const fetchConfig = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  }
  const response = await fetch(urlAPI, fetchConfig)

  const data = await response.json()

  return data
}

export async function updateStudent(changes: any, id: any, accessToken: any, onSuccess: any, onError: any) {
  const urlAPI = `${config.apiURL}/users/${id}`;
  
  const fetchConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    method: 'PUT',
    body: JSON.stringify(changes)
  }

  const res = await fetch(urlAPI, fetchConfig) as any
  const data = await res.json()
  
  if(data.error){
    onError()
    return {error: data.error}
  }

  console.log('data', data);
  
  onSuccess()
  return {data}
}

export async function updatePDF(pdf:any, idNumber:any, accessToken:any, onSuccess: any, onError: any) {
  const urlAPI = `${config.apiURL}/files/upload`;
  const formData = new FormData();
  formData.append('file', pdf);
  formData.append('idNumber', idNumber);

  const fetchConfig = {
    headers: {
      // 'content-type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`
    },
    method: 'POST',
    body: formData
  }

  console.log('fetchConfig', fetchConfig);
  console.log('urlAPI', urlAPI);

  const res = await fetch(urlAPI, fetchConfig) as any
  const data = await res.json()
  
  console.log('data', data);

  if(data.error){  
    onError()
    return {error: data.error}
  }
  
  onSuccess()
  return {data}

}

export const getPDF = async (idNumber: string, accessToken: string) => {
  const urlAPI = `${config.apiURL}/files/access?idNumber=${idNumber}`;
  const fetchConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }

  const res = await fetch(urlAPI, fetchConfig) as any

  const data = await res.json()

  console.log('data', data);
  

  if (data.statusCode === 404) {
    return { error: data.message }
  }

  return data
}

export const aproveUser = async (idNumber: string, accessToken:string, onSuccess: any, onError: any) => {
  const urlAPI = `${config.apiURL}/email/aprove-user?idNumber=${idNumber}`;
  const fetchConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  }

  const res = await fetch(urlAPI, fetchConfig) as any
  const data = await res.json()
  
  if(data.error){
    onError()
    return {error: data.error}
  }

  onSuccess()
  return {data}
}

