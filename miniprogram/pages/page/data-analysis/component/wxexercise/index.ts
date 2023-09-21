// pages/page/data-analysis/component/wx-exercise/index.ts
import { initWXExerciseDirectionCharts } from '../../../../Services/echarts-data'
import Toast from '../../../../../miniprogram_npm/@vant/weapp/toast/toast';

const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoadData:false,
    stepisGetFail:false,
    ec: {
      onInit: initWXExerciseDirectionCharts
    }
  },
  lifetimes: {
    
    ready() {
      
      if (app.globalData.stepIsLoadEnd){
        return;
      }
      let weakThis = this;
      // 登录
      wx.login({
        success: res => {
          console.log(res.code)
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.cloud.callFunction({
            // 云函数名称
            name: 'getseesion',
            // 传给云函数的参数
            data: {
              code: res.code,
            },
            success: function (res: any) {
              console.log("云函数调用成功==", res) // 3
              let session_key = null;
              if ((typeof res.result) == 'string'){
                let objc = JSON.parse(res.result);
                session_key = objc.session_key;
              }else{
                session_key = res.result.session_key;
              }
              console.log("res type==", (typeof res));
              console.log("session_key==", session_key);
              if (session_key) {
                weakThis.getWXyundong(session_key);
              }
            },
            fail: function (res) {
              console.log("云函数调用失败==", res);
            }
          })
        },
      })
    }
  },
	/**
	 * 组件的方法列表
	 */
	methods: {
    getWXyundong(session_key: string) {
      console.log("session_key==", session_key);
      let  weakThis = this;
      wx.getWeRunData({
        success: (result) => {
          const encryptedData = result.encryptedData
          const iv = result.iv
          const cloudID = result.cloudID
          const appid = "wx6a2a41fa0eaff2ba"
          
          const secret = "d30f33c9fc2d3e65aaabf0e73c6994ee"
          console.log("开始解密");
  
          this.dataDecrypt({
            encryptedData:encryptedData,
            iv:iv,
            sessionKey:session_key,
          })
        },
        fail: function () {
          weakThis.setData({
            stepisGetFail:true,
          })
        }
      })
    },
    dataDecrypt(reqData:any){
  
      console.log("reqData===", reqData);
      let  weakThis = this;
      wx.cloud.callFunction({
        // 云函数名称
        name: 'decrypt-iv',
        // 传给云函数的参数
        data: reqData,
        success: function (res: any) {
          console.log("解密--云函数调用成功==", res) // 3
          

          let  tempStr = (typeof res);
          console.log("tempStr");
          let stepList:[] = [];
          if ((typeof res.result) == 'string'){
            let objc = JSON.parse(res.result);
            stepList = objc.stepInfoList
          }else{
            stepList = res.result.stepInfoList
          }
          console.log("stepList==", stepList.length);

          app.globalData.stepList = stepList;
          app.globalData.stepIsLoadEnd = true;
          //模拟获取失败
          
          weakThis.setData({
            isLoadData:true,
            ec: {
              onInit: initWXExerciseDirectionCharts
            }
          })
          console.log("----isLoadData", weakThis.data.isLoadData);
          
          
          
        },
        fail: function (res) {
          weakThis.setData({
            stepisGetFail:true,
          })
          console.log("解密--云函数调用失败==", res);
          
        }
      })
  
      //****需要保存session_key 并判断他是否过期
      // ****还要考虑运动信息获取失败的问题.-失败了之后首页初始化弹出提示框.
      //得到健身数据后.如果当前已经请求过了 就不再重复请求了.
      
    },
    showError(){
      
    }


  }
})
