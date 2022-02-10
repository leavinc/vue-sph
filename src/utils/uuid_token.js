import { v4 as uuidv4 } from 'uuid';

// 生成随机字符串，每次不能变化，持久化
export const getUuid = () => {
    // 先从本地存储获取，如果没有再生成
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 如果本地没有
    if(!uuid_token){
        // 使用uuid生成
        uuid_token = uuidv4()
        // 存储至本地
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }

    return uuid_token
}