//index.js
//获取应用实例
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()

Page({
  data: {
    degistTopHead:{},
    degistDataArr:[],
    audioName:'',
    audioIndex:'',
    playOn:true,
    playOnWrap:false,
    pageNum:1,
    dataTotal:0,
    albumId:'',


    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (option) {
    this.audioListFun(option.id)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

audioListFun:function(id,pageNum){

  wx.showLoading({
    title: '加载中',
  })

  wx.request({
    url:"https://api.imjad.cn/qqfm/v1/",
    data:{
      "type":"show",
      "id":id
    },
    success:(res)=>{
      if(res.data.msg){
        wx.hideLoading();
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 2000
        })
      }else{
        var total=res.data.length;
        if(!pageNum){pageNum=0}
        var arr=res.data.slice(20*pageNum,20+20*pageNum).toString();
        this.setData({
          pageNum:pageNum,
          dataTotal:res.data.length,
          albumId:id,
        })
        this.audioListShow(id,arr)
      }

    },
    fail:(res)=>{},
  })
},
audioListShow:function(id,arr){
    this.setData({
      degistDataArr:[]
    })
  wx.request({
    url:"https://api.imjad.cn/qqfm/v1/",
    data:{
      "type":"skip_show",
      "id":id,
      "shows":arr
    },
    success:(res)=>{
      var newArr=arr.split(',');
      var degistDataArr=[];
      for(var i=0;i<newArr.length;i++){
        degistDataArr.push(res.data.data.showList[newArr[i]].show)
      }
      this.setData({
        degistDataArr:degistDataArr,
        degistTopHead:res.data.data.showList[newArr[0]].album
      })
      wx.hideLoading()
    },
    fail:(res)=>{},
  })
},
playFun(e){
  //console.log(e.currentTarget.id.split(",")[0],e.currentTarget.id.split(",")[1],e.currentTarget.id.split(",")[2])
    this.setData({
      audioName:e.currentTarget.id.split(",")[2],
      audioIndex:e.currentTarget.id.split(",")[1],
      playOn:false,
      playOnWrap:true,
    })

    // innerAudioContext.loop = true
    // innerAudioContext.src = e.currentTarget.id.split(",")[0];
    // innerAudioContext.play()

    var audioCtx = wx.createAudioContext('myAudio');
    audioCtx.setSrc(e.currentTarget.id.split(",")[0]);
    audioCtx.play();

},
plaYFun:function(){
      //innerAudioContext.play()
      var audioCtx = wx.createAudioContext('myAudio');
      audioCtx.play();
      this.setData({
        playOn:false,
      })
},
pauseFun:function(){
    //innerAudioContext.pause()
    var audioCtx = wx.createAudioContext('myAudio');
    audioCtx.pause();
    this.setData({
        playOn:true,
    })
},

uppageFun(e){
  
  var id=e.currentTarget.id.split(",")[0]
  var pageNum=e.currentTarget.id.split(",")[1]
 
  pageNum=pageNum-0
  if(pageNum<=1){
    wx.showToast({
      title: '已经是第一页',
      icon: 'success',
      duration: 2000
    })
  }else{
    pageNum=pageNum-2
    this.setData({
        pageNum:pageNum,
    })
    this.audioListFun(id,pageNum)
  }

},
downpageFun(e){
  var id=e.currentTarget.id.split(",")[0]
  var pageNum=e.currentTarget.id.split(",")[1]
  var total=e.currentTarget.id.split(",")[2]
  var totalceil=Math.ceil(total/20)
  pageNum=pageNum-0
  if(pageNum>=totalceil){
    wx.showToast({
      title: '已经是最后页',
      icon: 'success',
      duration: 2000
    })
  }else{
    pageNum=pageNum-0
    this.setData({
        pageNum:pageNum,
    })
    this.audioListFun(id,pageNum)
  }

},

jumpHomeFun(){
  wx.switchTab({
    url: '../index/index'
  })
},



  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
