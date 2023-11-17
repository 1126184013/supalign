import request from '@/utils/request';

export const reqFace = (data) => request.post('/api/face', data)
export const reqUpload = (data) => request.post('/api/upload', data)