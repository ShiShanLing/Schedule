// pages/page/record/Component/record-add-card/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isEditable:String,
    titleStr:String,
    desStr:String,
    weight:Number,
    type:Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      submit(){
 
        this.triggerEvent("submit", this.properties.type)
      },
      selectData(){
        if (this.properties.isEditable == "false"){
          return;
        }
        this.triggerEvent("selectData", this.properties.type)
      }
  }
})
