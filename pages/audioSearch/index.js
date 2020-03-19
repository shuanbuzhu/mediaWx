//index.js
//获取应用实例
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()

Page({
  data: {
    searchData:'',
    songCount:0,
    audioArr:[],
    
    picUrl:'',
    arName:'',
    name:'',
    playOn:true,
    playPauseOn:false,
    pageNum:0,


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
    //console.log(option.id)
    this.setData({
      searchData:option.id
    })
    this.searchDataFun(option.id,0);
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
  searchDataFun(name,page){
    wx.showLoading({
      title:"加载中"
    })
    wx.request({
      url:"https://api.imjad.cn/cloudmusic/",
      data:{
        "type":"search",
        "s":name,
        'offset':0,
        "limit":20+10*page
      },
      success:(res)=>{
        //console.log(res)
        if(res.statusCode==200&&res.data.code==200){
          wx.hideLoading();
          this.setData({
             songCount:res.data.result.songCount,
             audioArr:res.data.result.songs,
             picUrl:res.data.result.songs[0].al.picUrl,
             arName:res.data.result.songs[0].ar[0].name,
             name:res.data.result.songs[0].name,
          })
        }else{
          wx.hideLoading();
          wx.showToast({
            title: '资源不可用',
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail:(res)=>{},
    })
  },
  searchFun(e){
    //console.log(e.currentTarget.id)
      this.setData({
        pageNum:0
      })
    this.searchDataFun(e.currentTarget.id,0)
  },
  inputValueFun(e){
    //console.log(e.detail.value)
    this.setData({
      searchData:e.detail.value
    })
  },

  jumpHomeFun(){
      wx.switchTab({
        url: '../index/index'
      })
  },
  plaYFun:function(){
      //innerAudioContext.play()
      var audioCtx = wx.createAudioContext('myAudio');
      audioCtx.play();
      this.setData({
        playOn:true,
      })
},
  pauseFun:function(){
    //innerAudioContext.pause()
    var audioCtx = wx.createAudioContext('myAudio');
    audioCtx.pause();
    this.setData({
        playOn:false,
    })
},

playFun(e){
  var  id=e.currentTarget.id.split(",")[0],
       picUrl=e.currentTarget.id.split(",")[1],
       arName=e.currentTarget.id.split(",")[2],
       name=e.currentTarget.id.split(",")[3]
       this.setData({
          picUrl:picUrl,
          arName:arName,
          name:name,
          playPauseOn:true,
       })
  wx.showLoading({
    title:"加载中"
  })
  wx.request({
    url:"https://api.imjad.cn/cloudmusic",
    data:{
      "type":"song",
      "id":id,
      "br":128000
    },
    success:(res)=>{
      if(res.statusCode==200&&res.data.code==200){
        wx.hideLoading();
        // innerAudioContext.src=res.data.data[0].url;
        // innerAudioContext.play();

        var audioCtx = wx.createAudioContext('myAudio');
        audioCtx.setSrc(res.data.data[0].url);
        audioCtx.play();
      }
    },
    fail:(res)=>{

    }
  })
},

  upPageFun(e){
    var searchData=e.currentTarget.id.split(",")[0],
    page=e.currentTarget.id.split(",")[1]-0
    if(page==0){
      wx.showToast({
        title: '已经是第一页',
        icon: 'success',
        duration: 2000
      })
    }else{
      page--;
      this.setData({
        pageNum:page
      })
      this.searchDataFun(searchData,page)
    }
  },
  downPageFun(e){
    var searchData=e.currentTarget.id.split(",")[0],
    page=e.currentTarget.id.split(",")[1]-0,
    songCount=e.currentTarget.id.split(",")[2]-0;
    if(20+10*page>=songCount){
        wx.showToast({
        title: '已经是最后页',
        icon: 'success',
        duration: 2000
      })
    }else{
      page++;
      this.setData({
        pageNum:page
      })
      this.searchDataFun(searchData,page)
    }

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
