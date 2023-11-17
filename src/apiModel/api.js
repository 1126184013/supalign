//进行axios二次封装:使用请求与响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  //基础路径
  baseURL: '/api', //基础路径上会携带/api
  timeout: 5000, //超时的时间的设置
})
//第二步:request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  //config配置对象,headers属性请求头,经常给服务器端携带公共参数
  //返回配置对象
  return config
})

//第三步:响应拦截器
request.interceptors.response.use(
  (response) => {
    //成功回调
    //简化数据
    return response.data
  },
  (error) => {
    //失败回调:处理http网络错误的
    //提示错误信息
    ElMessage({
      type: 'error',
      message: '',
    })
    return Promise.reject(error)
  },
)
//对外暴露
export default request