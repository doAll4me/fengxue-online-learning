// 统一放 baseURL、请求拦截器、响应拦截器等“全局请求规则”的地方
import axios from 'axios';

// 基于axios创建分身
// 从而集中管理“请求配置、拦截器、基地址、异常处理”
const instance = axios.create({
  //基地址配置(leanCloud中的RESTAPI地址)
  baseURL: 'https://obqvbt0q.api.lncldglobal.com/1.1',
  //请求头配置(leanCloud中RESTAPI的请求头模版)
  headers: {
    //id和key都看leanCloud应用凭证
    'X-LC-Id': 'oBqVbt0qR8dm1PJ1Xk2x4pVz-MdYXbMMI',
    'X-LC-Key': 'kM6y59WD2OykQ9kP85xGN73I',
    'Content-Type': 'application/json',
  },
});

export default instance;
