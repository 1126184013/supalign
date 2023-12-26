import request from '@/utils/request';

export const reqFace = (data) => {
  return request({
    url: '/api/face',
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    data
  })
}
export const reqUpload = (data) => request.post('/api/upload', data)
export const reqRepoer = (data) => request.post('/api/report', data)
export const reqDescription = (data) => request.post('/api/description', data)
export const reqSave = (data) => request.post('/api/save', data)