// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const secret = "d30f33c9fc2d3e65aaabf0e73c6994ee";
const appid = "wx6a2a41fa0eaff2ba";

// 云函数入口函数
exports.main = async (event, context) => {


  let urlStr = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${event.code}&grant_type=authorization_code`
  
  
  const resTwo = await rp.get(urlStr);
  console.log("resTwo===", resTwo);
  return resTwo;
}