//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    fixedDataArr:[
      {"name":"少女时代"},
      {"name":"4MINUTE"},
      {"name":"EXID"},
      {"name":"Girl's Day"},
      {"name":"Red Velvet"},
      {"name":"miss A"},
      {"name":"f(x)"},
      {"name":"AOA"},
      {"name":"A Pink"},
      {"name":"Sistar"},
      {"name":"2NE1"},
      {"name":"LOVELYZ"},
      {"name":"Apink"},
      {"name":"Nine Muses"},
      {"name":"GFRIEND"},
      {"name":"MAMAMOO"},
      {"name":"KARA"},
      {"name":"TWICE"},
      {"name":"OH MY GIRL"},
      {"name":"SONAMOO"},
      {"name":"CLC"},
      {"name":"APRIL"},
      {"name":"FIESTAR"},
      {"name":"SPICA"},
      {"name":"Crayon Pop"},
      {"name":"Dal shabet"},
      {"name":"Rainbow"},
      {"name":"T-ara"},
      {"name":"After School"},


    ],
    searchData:'',
    resultDataArr:[],
    mvCount:"",
    videoIndex:100,//因为视频数量不超过20个，设置为大于20的就可以避免默认
    videoUrl:'',
    videoOffset:0,
    nowPageNum:10,
    page:0,




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
  onLoad: function () {
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
    this.dataRequestFun("少女时代",0)
  },
  //不可以少
  scroll(e) {
    
  },
  mvSearchFun(e){
    //console.log(e.currentTarget.id)
    var searchdata=e.currentTarget.id;
    this.setData({
       videoIndex:100,
       searchData:e.currentTarget.id
    })
    this.dataRequestFun(searchdata,0)
  },
  dataRequestFun(searchdata,page){
    if(!page){
      page=0
    };
    if(page<=0){
      page=0
    };
    var nowPageNum=5*page+10;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url:"https://api.imjad.cn/cloudmusic/",
      data:{
        "type":"search",
        "search_type":1004,
        "s":searchdata,
        "offset":0,
        "limit":nowPageNum,
      },
      success:(res)=>{
        if(res.data.code==200&&res.statusCode==200){
            wx.hideLoading();
            this.setData({
              resultDataArr:res.data.result.mvs,
              mvCount:res.data.result.mvCount,
              nowPageNum:nowPageNum,
              page:page
            })
        }else{
           wx.hideLoading();
            wx.showToast({
              title: '资源不可用',
              icon: 'success',
              duration: 2000
            })

        }
       // console.log(res,res.data.result,res.data.code,)
      },
      fail:(res)=>{wx.hideLoading();}
    })
  },
  playVedioFun(e){
    //console.log(e.currentTarget.id)
    var  id=e.currentTarget.id.split(",")[0];
    var  videoIndex=e.currentTarget.id.split(",")[1]-0;
    this.setData({
      videoIndex:videoIndex
    })
    //console.log(id,2323,videoIndex)
    wx.request({
      url:"https://api.imjad.cn/cloudmusic/",
      data:{
        "type":"mv",
        "id":id,
        "br":128000,
      },
      success:(res)=>{
        //console.log(res)
        if(res.statusCode==200&&res.data.code==200){
          //console.log(res.data.data.brs['480'])
          this.setData({
            videoUrl:res.data.data.brs['480']
          })

        }
      },
      fail:(res)=>{

      }
    })
  },
  removeMoreFun(e){
    var page=e.currentTarget.id.split(",")[0]-0;
    var mvCount=e.currentTarget.id.split(",")[1]-0;
    var searchData=e.currentTarget.id.split(",")[2];
    var nowPageNum=e.currentTarget.id.split(",")[3]-0;
    if(page<=0){
      page=0;
      wx.showToast({
        title: '已经第一页了',
        icon: 'success',
        duration: 2000
      })
    }else{
      page--;
      this.dataRequestFun(searchData,page)
    }
  },
  addMroeFun(e){
    var page=e.currentTarget.id.split(",")[0]-0;
    var mvCount=e.currentTarget.id.split(",")[1]-0;
    var searchData=e.currentTarget.id.split(",")[2];
    var nowPageNum=e.currentTarget.id.split(",")[3]-0;
    page++;
    //console.log(page,mvCount,searchData,nowPageNum,111);
    if(nowPageNum<=mvCount){
          this.dataRequestFun(searchData,page)
    }else{
            wx.showToast({
              title: '已经到底了',
              icon: 'success',
              duration: 2000
            })
    }
  },
  inputValueFun(e){
    //console.log(e.detail.value)
    this.setData({
      searchData:e.detail.value
    })
  },
  searchFun(e){
    //console.log(e.currentTarget.id)
    var searchdata=e.currentTarget.id
    this.dataRequestFun(searchdata,0)
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
