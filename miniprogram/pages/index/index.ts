// index.ts
// 获取应用实例
const app = getApp()

Page({
  data: {
    contentHeight:0,
    tabbarHeight:0,
		active: 0,
    icon: {
      normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
      active: 'https://img.yzcdn.cn/vant/user-active.png',
		},
	},
	onChange(event) {
		this.setData({ active: event.detail });
		console.log("event.detail===", event.detail);
		
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
		const systemInfo = wx.getSystemInfoSync();
    let svh = systemInfo.screenHeight - app.globalData.navBarHeight;
    let safeArea = systemInfo.screenHeight-systemInfo.safeArea.bottom;
    console.log("systemInfo.safeArea.bottom==", systemInfo.safeArea.bottom);
    
		let query = wx.createSelectorQuery();
    query.select('#van-tabbar-item').boundingClientRect(res => {
			console.log("res.heigh---onLoad==", res);
			this.setData({
        contentHeight:(svh-res.height),
        tabbarHeight:res.height + safeArea,
			})
			 
    })
    query.exec((res) => { }) //注意，必须加这个，不然上面的回调函数不会进入


    wx.getWeRunData({
      success(res) {
        const encryptedData = res.encryptedData;
        const iv = res.iv;
        const cloudID = res.cloudID;
        // 您现在可以使用用户的会话密钥和iv解密encryptedData以获取其步数数据
      }
    })

	},
	onShow(){
		let query = wx.createSelectorQuery();
    query.select('#van-tabbar-item').boundingClientRect(res => {
      console.log("res.height==", res);
    })
    query.exec(res => { }) //注意，必须加这个，不然上面的回调函数不会进入
	},
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
	},
	
})
