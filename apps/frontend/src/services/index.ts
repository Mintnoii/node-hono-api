import { tryit } from '@/shared/libs'
import CreateAxiosInstance from './create-axios'
import { IMyRequest } from './index.d'
import { responseHandler } from './handlers'

const MyAxios = CreateAxiosInstance({ responseHandler })

/**
 * 请求服务 myRequest
 * @param url api 地址
 * @param options axios 配置
 * @returns 返回 IResponse 格式数据的 promise
 */
const myRequest: IMyRequest = (url, options) => MyAxios({ url, ...options })
export const request = (url: string, options: any) => tryit(myRequest)(url, options)
export default request
