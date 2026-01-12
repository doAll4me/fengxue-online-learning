// 集中管理跟课程业务相关的ts类型约束

// 课程分类的数据格式
export interface categoryType {
  objectId?: string; //数据库自动分配的唯一id
  name: string;
  parentId: string; //父级id，没有就是0-0
  isshow: boolean;
  children?: categoryType[];
}

export interface CourseType {
  objectId?: string;
  name: string;
  poster: string; //课程封面
  lv1: string; //课程分类-一级类目名称
  lv2: string; //二级类目名称
  isvip: boolean;
  intro: string;
  detail: string;
  cate: Array<string>;
}
