// pages/page/data-analysis/component/current-status/index.ts
import {queryWeightData} from '../../../../Services/weight-data'

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
    currentWeigth:0,
    loseWeigth:0,
    keepDays:0,
  },
  lifetimes:{
    ready(){
      let weigthList = queryWeightData(null);
      //减了多少斤kg
      let loseWeigth:any = 0;
      //当前体重
      let currentWeigth = 0;
      if (weigthList.length > 1){
        //防止用户一直在使用但是为填写.所以添加一下逻辑        
        let firstDay = weigthList[0];
        let index = 0;
        //只要满足添加 就一直循环下去
        while((firstDay.beforeSleepWeight == 0 && firstDay.wakeUpWeight == 0) && index < weigthList.length-1) { 
          firstDay = weigthList[index];
        }

        let lastDay = weigthList[weigthList.length-1];
        //如果今天早上空腹数据不为空
        let lastWeight = 0;
        console.log("lastDay=====", lastDay);
        
        if (lastDay.wakeUpWeight != 0){
          lastWeight = lastDay.wakeUpWeight;
        }
        //如果第一天空腹数据不为空
        let firstW = 0;
        //如果第一天用户填写了信息.
        if (firstDay.wakeUpWeight != 0){
          firstW = firstDay.wakeUpWeight;
        }else if (firstDay.beforeSleepWeight != 0){
          firstW = firstDay.beforeSleepWeight;
        }
        loseWeigth = lastWeight - firstW;
        loseWeigth = loseWeigth.toFixed(1);
        currentWeigth = lastWeight;
      }else{
        if (weigthList[0].wakeUpWeight == 0){
          currentWeigth = weigthList[0].wakeUpWeight
        }else{
          currentWeigth = weigthList[0].beforeSleepWeight
        }
      }

      this.setData({
        currentWeigth:currentWeigth,
        loseWeigth:loseWeigth,
        keepDays:weigthList.length,
      })

      
      /*
      需要计算的数据 ->记录了多少天?
      掉了多少kg
      当前体重
      */
    }
  },


	/**
	 * 组件的方法列表
	 */
	methods: {

	}
})
