// app.ts
import { initStorage } from './pages/Services/weight-data'



App({
  globalData: {
    stepList:[],
    stepIsLoadEnd:false
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    initStorage();
    this.clouldInit()

    const weakThis = this;

    // // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res.code)
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId

    //     wx.cloud.callFunction({
    //       // 云函数名称
    //       name: 'getseesion',
    //       // 传给云函数的参数
    //       data: {
    //         code: res.code,
    //       },
    //       success: function (res: any) {
    //         console.log("云函数调用成功==", res) // 3
    //         if (res.result.session_key) {
    //           weakThis.getWXyundong(res.result.session_key);
    //         }
    //       },
    //       fail: function (res) {
    //         console.log("云函数调用失败==", res);
    //       }
    //     })

    //   },
    // })
  },
  clouldInit() {
    wx.cloud.init({
      env: 'test-1-9g2v66wx5875a04a',
      traceUser: true,
    })
  },
  getWXyundong(session_key: string) {
    console.log("session_key==", session_key);
    
    const secret = "d30f33c9fc2d3e65aaabf0e73c6994ee";
    const appid = "wx6a2a41fa0eaff2ba";

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
        let stepList = res.result.stepInfoList;
        weakThis.globalData.stepList = stepList;
      },
      fail: function (res) {
        console.log("解密--云函数调用失败==", res);
      }
    })


    //****需要保存session_key 并判断他是否过期
    // ****还要考虑运动信息获取失败的问题.-失败了之后首页初始化弹出提示框.
    //得到健身数据后.如果当前已经请求过了 就不再重复请求了.
    
  }

  
   
})