import {dateFormat} from '../../tools/date-tools'
//增删改查

export interface WeightInfo {
  wakeUpWeight:number,//早起空腹
  beforeSleepWeight:number,
  date:number,
  dateStr:string,//用于展示
}

//添加数据
export function addWeightData(data:WeightInfo) {
  try {
    let weightData:WeightInfo[] = wx.getStorageSync("weightData");
    
    if (!weightData){
      weightData = [data];
      wx.setStorageSync("weightData", weightData);
    }else{
      let tempList = weightData.filter((tempData)=>{
          return (tempData.dateStr == data.dateStr);
      })
      console.log("tempList==", tempList);
      console.log("weightData==", weightData);
      
      
      if (tempList.length == 0){
        weightData.push(data);
        wx.setStorageSync("weightData", weightData)
      }
    }
  } catch (error) {
    
  }
}

export function changeWeightData(data:WeightInfo){
  try {
    let weightData:WeightInfo[] = wx.getStorageSync("weightData");
    let tempList = weightData.filter((tempData)=>{
      return tempData.dateStr == data.dateStr;
    });
    for( let i = 0; i < weightData.length;i ++ ){
      let tempData = weightData[i];
      if (tempData.dateStr == data.dateStr){
        weightData[i] = data;
        break
      }
    }
    wx.setStorageSync("weightData",weightData);
  } catch (error) {
    
  }
}
//用户查询某天的体重 如果date是 null则返回所有的数据
export function queryWeightData(date:string | null) : WeightInfo[] {
  try {
    
    let weightData:WeightInfo[] = wx.getStorageSync("weightData");
    if (!date){
      return weightData;
    }else{
      console.log("weightData===", weightData);
      
      let tempList = weightData.filter((tempData)=>{
          return tempData.dateStr == date;
      });
      return tempList;
    }
  } catch (error) {
    return []
  }
}
export function initStorage() {
  try {
    let weightData = wx.getStorageSync("weightData")
    if (!weightData){
      wx.setStorageSync("weightData", [])
    }
  } catch (error) {
    
  }
  
}
//添加一个今天的体重数据 如果已经添加过了方法内部会过滤掉
export function addTodayWeightData() :WeightInfo{
  let nowDate = new Date();
  let dateStr = dateFormat(nowDate, "MM-DD");
  let newTime = dateFormat(nowDate, "YY-MM-DD");
  let newDate = new Date(newTime);
  let weight:WeightInfo = {
    wakeUpWeight:0,
    beforeSleepWeight:0,
    date:newDate,
    dateStr:dateStr,//用于展示
  }
  console.log("weight====", weight);
  addWeightData(weight);
  return weight;
}