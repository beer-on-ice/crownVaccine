export default {
  methods: {
    wxScanCode() {
      const data = {
        url: window.location.href.split('#')[0]
      }
      this.$api.home.wxcam(data).then(result => {
        console.log('result', result)
        // 后端返回的参数
        var timestamp = result.timestamp
        var noncestr = result.nonceStr
        var signature = result.signature
        var appId = result.appId
        this.$wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          //                                debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: appId, // 必填，公众号的唯一标识
          timestamp: timestamp, // 必填，生成签名的时间戳
          nonceStr: noncestr, // 必填，生成签名的随机串
          signature: signature, // 必填，签名，见附录1
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        this.$wx.ready(function() {
          this.$wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success: function(res) {
              var result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
              // location.href=res.resultStr;//扫描结果传递到的处理页面,跳转到这个页面
              // alert(result);
              // location.href=res.resultStr;//扫描结果传递到的处理页面,跳转到这个页面
              // sessionStorage.setItem('saomiao_result',result);
              // 其它网页调用二维码扫描结果：
              // var result = sessionStorage.getItem("saomiao_result");
              console.log(result)
            },
            error: function(res) {
              console.log(res)
            }
          })
        })
      })
    }
  }
}
