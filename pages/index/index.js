//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //轮播需要的数据
    indicatorDots:'ture',
    autoplay:'true',
    interval:'2000',
    duration:'500',
    imgArr:[
      {
        link: '/pages/audioSearch/index?id=许嵩',
        url: 'https://p2.music.126.net/dwvPvZ3HL_nzRoZHJP_KJw==/109951163261278540.jpg'
      },{
        link: '/pages/audioSearch/index?id=周杰伦',
        url: 'https://p3.music.126.net/6FgH_XwxyCK1hcoAnIgOTw==/18565253836700763.jpg'
      },{
        link: '/pages/audioSearch/index?id=刘若英',
        url: 'https://p2.music.126.net/eBF7bHnJYBUfOFrJ_7SUfw==/109951163351825356.jpg'
      },{
        link: '/pages/audioSearch/index?id=李荣浩',
        url: 'https://p2.music.126.net/y9LLAuZ-CYMFPqDBq4SNYw==/7823025232375425.jpg'
      },{
        link: '/pages/audioSearch/index?id=邓紫棋',
        url: 'https://p1.music.126.net/u_1EudmF8Swgow6vfgYe1g==/8896148580676276.jpg'
      }, {
        link: '/pages/audioSearch/index?id=蔡琴',
        url: 'https://p1.music.126.net/7RNnbzIr7EdkeHRK34ZPIw==/109951163434372027.jpg'
      }, 
      {
        link: '/pages/audioSearch/index?id=王菲',
        url: 'https://p1.music.126.net/NGup83j86vv_IUsxJC7hDg==/5654788301727269.jpg'
      }
    ],
    //分类列表的数据
    classListArr:[
      {id:'39110',name:'音乐'},
      {id:'39104',name:'情感'},
      {id:'39092',name:'小说'},
      {id:'4',name:'相声'},
      {id:'1',name:'综艺'},
      {id:'39120',name:'儿童'},
      {id:'39126',name:'知识'},
      {id:'18',name:'历史'},
      {id:'5',name:'新闻'},
      {id:'39087',name:'段子'},
    ],
    childClassId:'39110',
    childClassList:{
      '39104':[
              
          {id:"39105",name:"情感治愈"},
          {id:"109",name:"晚安心语"},
          {id:"39106",name:"美文故事"},
          {id:"38983",name:"恋爱宝典"},
          {id:"107",name:"两性夜话"},
          {id:"108",name:"旅行人文"},
      ],
      '39110':[
             
          {id:"102",name:"心情  "},
          {id:"118",name:"乐评  "},
          {id:"117",name:"歌手  "},
          {id:"38936",name:"流行"},
          {id:"39116",name:"经典"},
          {id:"40083",name:"催眠"},
          {id:"38937",name:"欧美"},
          {id:"40078",name:"日韩"},
          {id:"101",name:"榜单  "},
          {id:"40038",name:"粤语"},
          {id:"103",name:"纯音  "},
          {id:"100",name:"3D"},
          {id:"40030",name:"电子"},
          {id:"40029",name:"喊麦"},
          {id:"40082",name:"原创"},
          {id:"38938",name:"翻唱"},
          {id:"38943",name:"民谣"},
          {id:"40079",name:"摇滚"},
          {id:"40028",name:"动漫"},
          {id:"40080",name:"古风"},
          {id:"40081",name:"宗教"},
          {id:"40077",name:"跑步"},
          {id:"38942",name:"影视"},
          {id:"40039",name:"古典"},
          {id:"40036",name:"世界"},
          {id:"40037",name:"儿童"},
      ],
      '39092':[
              
          {id:"41092",name:"悬疑推理"},
          {id:"39096",name:"恐怖灵异"},
          {id:"38954",name:"玄幻奇幻"},
          {id:"38949",name:"现代言情"},
          {id:"38951",name:"古代言情"},
          {id:"105",name:"鬼故事"},
          {id:"104",name:"影视原著"},
          {id:"40042",name:"网游竞技"},
          {id:"38953",name:"都市生活"},
          {id:"38958",name:"武侠传奇"},
          {id:"38957",name:"官场商战"},
          {id:"38960",name:"历史军事"},
          {id:"38959",name:"青春校园"},
          {id:"40041",name:"耽美同人"},
          {id:"39103",name:"广播剧"},
          {id:"40040",name:"社科管理"},
          {id:"38956",name:"文学名著"},
          {id:"41093",name:"杂志专栏"},
      ],
      '4':[
             
          {id:"38963",name:"郭德纲"},
          {id:"39109",name:"相声新星"},
          {id:"38971",name:"相声名家"},
          {id:"38969",name:"评书大全"},
          {id:"38970",name:"小品大全"},
          {id:"111",name:"粤语评书"},
          {id:"40048",name:"刘兰芳"},
          {id:"40049",name:"王玥波"},
          {id:"38965",name:"单田芳"},
          {id:"38966",name:"袁阔成"},
          {id:"38972",name:"田连元"},
          {id:"39133",name:"戏曲名剧"},
      ],
      '1':[
              
          {id:"38985",name:"影视精选"},
          {id:"38974",name:"热门综艺"},
          {id:"38982",name:"八卦娱乐"},
          {id:"113",name:"星座风水"},
          {id:"38980",name:"明星专区"},
          {id:"116",name:"游戏动漫"},
          {id:"40043",name:"文娱杂谈"},
          {id:"40045",name:"时尚生活"},
          {id:"40044",name:"影视原声"},
      ],
      '39120':[
              
          {id:"40005",name:"睡前故事"},
          {id:"40002",name:"童话寓言"},
          {id:"40001",name:"儿歌音乐"},
          {id:"40003",name:"孕妈育儿"},
          {id:"40009",name:"经典名著"},
          {id:"40070",name:"诗词国学"},
          {id:"40007",name:"儿童英语"},
          {id:"40008",name:"儿童科普"},
          {id:"40076",name:"儿童教材"},
          {id:"40004",name:"卡通动画"},
      ],
      '39126':[
             
          {id:"40014",name:"科普充电"},
          {id:"40072",name:"名人专栏"},
          {id:"40073",name:"情商心理"},
          {id:"39127",name:"语言学习"},
          {id:"11400",name:"考试教材"},
          {id:"40060",name:"职场提升"},
          {id:"40071",name:"互联网"},
          {id:"39012",name:"公开课演讲"},
          {id:"39131",name:"健康养生"},
          {id:"39129",name:"创业投资"},

      ],
      '18':[
              
          {id:"40055",name:"野史趣闻"},
          {id:"40075",name:"佛学修身"},
          {id:"39132",name:"传奇档案"},
          {id:"39134",name:"文化讲坛"},
          {id:"40054",name:"人物传纪"},
          {id:"40050",name:"中国历史"},
          {id:"40062",name:"世界历史"},
          {id:"40052",name:"军事战争"},
          {id:"40074",name:"人文艺术"},
      ],
      '5':[
              
          {id:"38924",name:"头条新闻"},
          {id:"38925",name:"深度观点"},
          {id:"39078",name:"社会百态"},
          {id:"39049",name:"商业财经"},
          {id:"38927",name:"IT科技  "},
          {id:"38931",name:"军事要闻"},
          {id:"110",name:"自媒体"},
          {id:"38929",name:"汽车"},
          {id:"38930",name:"体育"},
      ],
      '39087':[
             
          {id:"38976",name:"热点趣闻"},
          {id:"38979",name:"糗事百科"},
          {id:"106",name:"内涵段子"},
          {id:"40015",name:"聊江湖"},
          {id:"38978",name:"冷笑话"},
          {id:"38977",name:"方言秀"},
      ],
    },
    showDataArr:[],
    total:'',
    pageNum:1,
    childSonClassId:'',




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
    this.showDataFun()
  },
//不可少
  scroll(e) {
    
  },
  jumpDegistPage(e){
    wx.navigateTo({
      url:'../audioDegist/index?id='+e.currentTarget.id
    })
  },
  classListData(e){
    //console.log(111,e.currentTarget.id)
     this.setData({
      childClassId: e.currentTarget.id,
      childSonClassId:'',
      pageNum:1
     })
     this.showDataFun(e.currentTarget.id)
  },

  childClassData(e){
     this.setData({
      childSonClassId: e.currentTarget.id,
      pageNum:1,
     })
    this.showDataFun(e.currentTarget.id)
  },

  upPageFun(e){
    var pageNum=e.currentTarget.id.split(",")[0],
        childSonClassId=e.currentTarget.id.split(",")[1],
        childClassId=e.currentTarget.id.split(",")[2]
    if(pageNum<=1){
      wx.showToast({
        title: '已经是第一页',
        icon: 'success',
        duration: 2000
      })
      this.setData({
          pageNum:1,
      })
    }else{
      var id='';
      pageNum--
      if(childSonClassId){
        id=childSonClassId
      }else{
        id=childClassId
      }
      this.setData({
          pageNum:pageNum,
      })
      this.showDataFun(id,pageNum)
    }

  },
  downPageFun(e){
    var pageNum=e.currentTarget.id.split(",")[0],
        childSonClassId=e.currentTarget.id.split(",")[1],
        childClassId=e.currentTarget.id.split(",")[2]
    var id='';
    pageNum++
    if(childSonClassId){
      id=childSonClassId
    }else{
      id=childClassId
    }
    this.setData({
        pageNum:pageNum,
    })
    this.showDataFun(id,pageNum)
    
  },
  showDataFun(id,page){
    //提示加载中
    wx.showLoading({
      title: '加载中',
    })
    if(!id){
      id='39110'
    }
    if(!page){
      page=1
    };
    wx.request({
      url:"https://api.imjad.cn/qqfm/v1/",
      data:{
        "type":"album",
        "page_size":20,
        "id":id,
        "page":page,
      },
      //使用ES6的语法不让会报错，显示的是不能找打哦该元素，因为this指向的是function
      success:(res)=>{
        this.setData({
          showDataArr:res.data.data.albumInfoList,
          total:res.data.data.total
        })
        //数据返回后关闭加载中
        wx.hideLoading()
      }
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
