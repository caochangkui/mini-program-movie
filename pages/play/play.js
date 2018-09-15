import url from "../../config/url.js"
let app  = getApp();  // 拿到app.js里面的内容

Page({

  /**
   * 页面的初始数据
   */
  data: {
    song: {},
    duration: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let { id } = options;

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
      console.log(song);
      if (this.data.duration !== song.duration) {
        this.setData({
          duration: song.duration
        })
      }
    }) 
    

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