// tabList组件
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabList: {
      type: Array,
      default() {
        return []
      }
    },
    fonntSize: {
      type: Number,
      value: 30
    },
    height: {
      type: Number,
      value: 80
    },
    color: {
      type: String,
      value: '#868d9f'
    },
    boxClassName: {
      type: String,
      value: ''
    },
    idname: { //锚点名称：idname + index
      type: String,
      value: ''
    },
    currentIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeTab(e) {
      const currentIndex = e.currentTarget.dataset.index
      const idname =  e.currentTarget.dataset.idname
      this.setData({currentIndex})
      this.triggerEvent('changetab', currentIndex)
      this.triggerEvent('getidname', idname)
    }
  }
})
