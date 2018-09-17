// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    start: 0,
    loading: false // 是否正在加载
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },

  // 上拉加载
  lower () {
    console.log('lower');
    if (!this.data.loading) {
      this.loadData();
    } 
  },

  tap (e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },

  loadData () {
    let { start, list } = this.data;
    wx.showLoading({
      title: '正在加载...',
      mask: true
    });
    this.setData({
      loading: true
    });
    wx.request({
      url: `https://data.miaov.com/h5-view/v/movie/list/?start=${this.data.start}`,
      success: (res) => { 
        console.log(res.data.subjects);
        start += 20;
        list.push( ...res.data.subjects );
        this.setData({
          list: list,
          start: start,
          loading: false
        });
        wx.hideLoading();
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