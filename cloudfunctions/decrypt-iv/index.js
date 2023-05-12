// 云函数入口文件
const cloud = require('wx-server-sdk')
const WXBizDataCrypt = require('./WXBizDataCrypt')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const secret = "d30f33c9fc2d3e65aaabf0e73c6994ee";
const appid = "wx6a2a41fa0eaff2ba";
//云函数入口函数
exports.main = async (event, context) => {
  console.log("event===", event);
  const wxContext = cloud.getWXContext()
  var pc = new WXBizDataCrypt(appid, event.sessionKey)
  var data = pc.decryptData(event.encryptedData , event.iv)
  return data;

}