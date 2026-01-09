// 集中管理跟课程相关的网络请求
import { categoryType } from '../types/course';
import request from '../utils/request';

// 录入课程分类数据
export const categoryPost = (category: categoryType) => {
  return request.post('/classes/ReactCategory', category);
};

// 查询分类列表
export const categoryGet = () => {
  return request.get('/classes/ReactCategory');
};

// 更新是否上架字段
export const categoryPut = (objectId: string, isshow: boolean) => {
  return request.put(`/classes/ReactCategory/${objectId}`, { isshow });
};
