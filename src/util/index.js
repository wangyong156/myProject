//Verification
export const isPhone = (phone) => {
    if (!(/^1[23456789]\d{9}$/.test(phone)) || phone.length != 11) {
        return false
    } else if (/^1[23456789]\d{9}$/.test(phone) && phone.length == 11) {
        return true;
    }
}
//密码由8-16位数字及字母组成
export const isPassWord = (password) => {
    if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(password)) {
        return false
    } else {
        return true
    }
}

//密码由6数字组成
export const setwithdrawalPwd = (password) => {
    if (!/^\d{6}$/.test(password)) {
        return false
    } else {
        return true
    }
}
//6-18数字和字母
export const isUserName=(username)=>{
    if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(username)) {
        return false
    } else {
        return true
    }
}
//2-30位包含点的真实姓名
export const isRealName = (realName) => {
    if (!/^[\u4e00-\u9fa5,\.]{2,30}$/.test(realName)) {
        return false
    } else {
        return true;
    }
}
//仅中文，除去符号
export const isChinese = (str) => {
  if (!/^[\u4e00-\u9fa5]{1,50}$/.test(str)) {
    return false
  } else {
    return true;
  }
}
//身份证包含X
export const isIdCard = (idcard) => {
    if (!/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/.test(idcard)) {
        return false;
    } else {
        return true;
    }
}
//银行卡
export const isBankNumber = (bankNumber) => {
    if (!/^\d{12,30}$/.test(bankNumber)) {
        return false;
    } else {
        return true;
    }
}
//充值金额
export const Money = (money) => {
    //if (!/^(0|[1-9][0-9]*)$/.test(money)) {
  if(!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(money)){
        return false;
    } else {
        return true;
    }
}
//toast
export const toast = (msg = '', time = 1000) => {
    var toast = document.createElement('div')
    toast.className = 'common-toast common-toast-show'
    toast.innerHTML = msg
    document.body.appendChild(toast)
    toast.style.display = 'block'
    var timer = setTimeout(() => {
        toast.className = 'common-toast common-toast-hide'
        clearTimeout(timer)
        var timer2 = setTimeout(() => {
            document.body.removeChild(toast)
            clearTimeout(timer2)
        }, 200)
    }, time)
}

//cookie setting
export const setCookie = (c_name, value, expiredays) => {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

export const getCookie = (c_name) => {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            let c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) {
                c_end = document.cookie.length
            }
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

export const delCookie = (c_name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(c_name);
    if (cval != null)
        document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();
}
export const services = () => {
  (function(a,h,c,b,f,g){a["UdeskApiObject"]=f;a[f]=a[f]||function(){(a[f].d=a[f].d||[]).push(arguments)};g=h.createElement(c);g.async=1;g.charset="utf-8";g.src=b;c=h.getElementsByTagName(c)[0];c.parentNode.insertBefore(g,c)})(window,document,"script","https://assets-cli.udesk.cn/im_client/js/udeskApi.js","ud");
  ud({
    "code": "1dae8d8h",
    "link": "//zb.udesk.cn/im_client/?web_plugin_id=32645",
    "mobile": { //为响应式布局，提供pc、mobile自定制
      "color": "#307AE8",
      "pos_flag": "crb",
      "onlineText": "联系客服，在线咨询",
      "offlineText": "客服下班，请留言",
      css:{top:"10%",left:"0.2rem",width:"1rem",height:"1rem"},
      "pop": {
        "direction": "top",
        "arrow": {
          "top": 0,
          "left": "70%"
        }
      }
    }
  });
  /*var meta="<meta name='viewport' content='initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'/>";
  $("head").prepend(meta);*/
}
