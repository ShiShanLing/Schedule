// pages/page/record/index.ts
// import {weightSelectDataList} from '../../Services/echarts-data';
import {dateFormat} from '../../../tools/date-tools';
import {changeWeightData, queryWeightData, addTodayWeightData} from '../../Services/weight-data';
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
const data1 = ["30", "40", "50", "60", "70", "80", "90", "100", "110", "120", "130", "140", "150", "160", "170", "180", "190", "200"]
const data2 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ]
const data3 = ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", ]
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
    weightModel:null,
    wakeUpWeight:0,
    isWakeUpSave:false,
    beforeSleepWeight:0,
    isBeforeSleepSave:false,
    show:false,
    columns: [
      {
        values: data1,
        className: 'column1',
      },
      {
        values: data2,
        className: 'column2',
        defaultIndex: 0,
      },
      {
        values: data3,
        className: 'column3',
        defaultIndex: 0,
      },
      
    ],
    //记录当前选择的类型 0 早上空腹 1睡前
    currentSelectType:0,
	},
  lifetimes:{
    ready(){
      //在这里获取存储本地的体重数据
      let result = queryWeightData(dateFormat(new Date(), "MM-DD"));
      if (result.length != 0){
        let model = result[0];
        this.setData({
          wakeUpWeight:model.wakeUpWeight,
          beforeSleepWeight:model.beforeSleepWeight,
          isWakeUpSave: (model.wakeUpWeight != 0),
          isBeforeSleepSave: (model.beforeSleepWeight != 0),
        });
      }else{
        let model = addTodayWeightData();
        this.setData({
          wakeUpWeight:model.wakeUpWeight,
          beforeSleepWeight:model.beforeSleepWeight,
          isWakeUpSave: (model.wakeUpWeight != 0),
          isBeforeSleepSave: (model.beforeSleepWeight != 0),
        });
      }
      console.log("result====", result);
      
    }
  },
	/**
	 * 组件的方法列表
	 */
	methods: {
    selectData(ev){
      this.setData({
        show:true,
        currentSelectType:ev.detail
      })
     console.log("this.data.currentSelectType==", this.data.currentSelectType);
     console.log("selectData===", ev);
      
    },
    submit(ev){
  
      let result = queryWeightData(dateFormat(new Date(), "MM-DD"));
      if (result.length == 0){
        
        Toast.fail({message:"请选择体重后再提交!", context:this});
        console.log("error");
          return;
      }
      let weightModel = result[0];
      if (ev.detail == 0){
        if (this.data.wakeUpWeight == 0){
          Toast.fail({message:"请选择体重后再提交!", context:this});
          return
        }
        weightModel.wakeUpWeight = this.data.wakeUpWeight;
        this.setData({
          isWakeUpSave:true,
        })
      }else{
        if (this.data.beforeSleepWeight == 0){
          Toast.fail({message:"请选择体重后再提交!", context:this});
          return
        }
        weightModel.beforeSleepWeight = this.data.beforeSleepWeight;
        this.setData({
          isBeforeSleepSave:true,
        })
        
      }
      changeWeightData(weightModel);
      /*

      



      */
    },
    onClosePopup(){
      this.setData({
        show:false
      })
    },
    onChange(event) {
      const { picker, value, index } = event.detail;
      console.log("event.detail---", event.detail);
      // picker.setColumnValues(1, citys[value[0]]);
    },
    onConfirm(event) {
      console.log("onConfirm-event.detail---", event.detail);
    
      let wakeUpWeight = this.data.wakeUpWeight;
      let beforeSleepWeight = this.data.beforeSleepWeight;
      let values:string[] = event.detail.value;
      let tempValue = 0;
      values.forEach((value)=>{
        tempValue += Number(value);
      })
      console.log("tempValue===", tempValue);
      if (this.data.currentSelectType == 0){
        wakeUpWeight = tempValue
      }else{
        beforeSleepWeight = tempValue
      }

      this.setData({
        show:false,
        wakeUpWeight:wakeUpWeight,
        beforeSleepWeight:beforeSleepWeight,
      })
    },
    onCancel() {
      this.setData({
        show:false
      })
    },
  }
  
 
})
