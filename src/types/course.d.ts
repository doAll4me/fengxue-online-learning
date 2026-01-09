// 集中管理跟课程业务相关的ts类型约束

// 课程分类的数据格式
export interface categoryType {
  objectId?: string; //数据库自动分配的唯一id
  name: string;
  parentId: string; //父级id，没有就是0-0
  isshow: boolean;
  children?: categoryType[];
}
