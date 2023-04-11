import axios from "axios";
import qs from "qs";

// 创建axios实例
const service = axios.create({
  baseURL: "http://localhost:3000", // 本地node服务端口号
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("cookie") || null;
    if (token ) {
      // config.headers.authorization = token;
     config.params.cookie = token; 
    }
    // 在发送请求前对请求参数进行处理，比如将普通对象转换成FormData
    if (config.method === "post" || config.method === "put") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  (error) => {
    // 请求错误处理
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据进行处理
    const res = response.data;

    // if (res.code !== 200 ||res.code !==803) {
    //   // 如果code不是200，则认为请求失败
    //   return Promise.reject(new Error(res.msg || 'Error'))
    // } else {
    //   return res || {}
    // }
    return res || {};
  },
  (error) => {
    // 响应错误处理
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
