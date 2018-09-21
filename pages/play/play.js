import url from "../../config/url.js"
let app  = getApp();  // 拿到app.js里面的内容

Page({

  /**
   * 页面的初始数据
   */
  data: {
    song: {},
    duration: 0,
    lrc: {
      "0": "正在获取歌词"
    },
    current: 0,
    isDown: false, // 滑块是否按下
    flag: true,
    currentLrc: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let { id } = options;

    // 获取歌词
    wx.request({
      url: `${url.lyric}?id=${id}`,
      success: (res) => { 
        let { lyric } = res.data.lrc;
        console.log(lyric);
        let r = /\[(.*?)](.*)/g;
        let obj = {};

        lyric.replace(r, ($0, $1, $2) => {
          console.log($1, $2);
          obj[$1.substring(0,5)] = $2;
        });

        this.setData({
          lrc: obj
        })
      }
    })

    // 获取歌曲
    wx.request({
      url: `${url.song}?ids=${id}`,
      success: (res) => {
        console.log(res);
        this.setData({
          song: res.data.songs[0]
        })
      }
    })
  
    let { song } = app.globalData;
    if (!song) {
      song = app.globalData.song = wx.createInnerAudioContext();
    }
    song.src = `http://music.163.com/song/media/outer/url?id=${id}.mp3`;
    song.play();
    song.onPlay((res) => {
      console.log('播放开始')
    });

    // 每次播放音乐是，设置duration为当前播放歌曲的长度
    song.onTimeUpdate((res) => {
      // console.log(song);
      // 获取歌曲时长
      if (this.data.duration !== song.duration) { 
        this.setData({
          duration: song.duration
        })
      };

      // 获取歌曲当前已经播放的时长 
      if (!this.data.isDown) {
        this.setData({
          current: song.currentTime
        })
      }
      
    }) 

  },

  // 正在滑动
  changing () {
    this.setData({
      isDown: true
    })
  },

  // 滑动结束
  changed(e) {
    console.log(e.detail)
    this.setData({
      isDown: false, // 记录滑块抬起
      current: e.detail.value // 记录滑块抬起时的播放位置
    })
    app.globalData.song.seek(e.detail.value);
  },

  tap (){
    let { song } = app.globalData;
    song.paused ? song.play() : song.pause(); // 控制歌曲播放或暂停

    if (this.data.flag) {
      this.setData({
        flag: false
      })
    } else {
      this.setData({
        flag: true
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})