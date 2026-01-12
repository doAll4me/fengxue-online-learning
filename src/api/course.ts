// 集中管理跟课程相关的网络请求
import { categoryType, CourseType } from '../types/course';
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

// 录入课程
export const coursePost = (course: CourseType) => {
  return request.post('/classes/ReactCourse', course);
};

// 请求课程列表
// interface SearchType {
//   name: string;
// }

//精准匹配
// export const courseGet = ({ name }: { name: string }) => {
//   let where = {
//     // name: '啊额发发大发',
//   } as SearchType;
//   if (name) {
//     where.name = name;
//   }
//   return request.get('/classes/ReactCourse', {
//     params: {
//       where,
//     },
//   });
// };

interface SearchType {
  name?: { $regex: string; $options: 'i' };
  isvip?: boolean;
}
// 模糊查询
export const courseGet = ({ name, isvip }: { name: string; isvip: number }) => {
  const where: SearchType = {};

  if (name) {
    where.name = { $regex: name, $options: 'i' }; //正则条件
  }
  if (isvip !== undefined && isvip !== null) {
    where.isvip = Number(isvip) === 1;
  }
  // return request.get('/classes/ReactCourse', {
  //   params: {
  //     where,
  //   },
  // });

  let query = JSON.stringify(where);
  return request.get(`/classes/ReactCourse?where=${query}`);
};
