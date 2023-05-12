// pages/page/details/index.ts

import {queryWeightData, WeightInfo} from '../../Services/weight-data'
import {dateFormat} from '../../../tools/date-tools'
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
    weigthList:[] as WeightInfo[],
  },
  lifetimes:{
    ready(){

      let weigthList = queryWeightData(null);

      weigthList.forEach((item)=>{
        console.log("item.date==", item.date);
        item.dateStr = dateFormat(new Date(item.date), "YY-MM-DD")
      })

      console.log("weigthList====", weigthList);
      

      this.setData({
        weigthList:weigthList,
      })
    }
  },

	/**
	 * 组件的方法列表
	 */
	methods: {
    clickFunc(){
   


      console.log("点击了我");
      let weigthList = queryWeightData(null);
      
      weigthList[1].date = 1683763200000;
      weigthList[2].date = 1683849600000;
      
      console.log("weigthList===", weigthList);
      wx.setStorageSync("weightData", weigthList);
    }
	}
})
