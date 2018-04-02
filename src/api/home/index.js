import config from '../config/index'
import qs from 'qs'

//let wrapUrl='http://10.0.0.100:9090'

// let imgUrl= localStorage.getItem("Imgurl");


let instance=config.instance
let wrapUrl=config.ApiUrl
window.wrapUrl =config.ApiUrl
export default {
    // 首页banner
    getBanner(data){
      return instance.post(wrapUrl+"/api/banner",qs.stringify(data))
    },
    //期货列表
    getFutures(data){
      return instance.post(wrapUrl+'/api/futures',qs.stringify(data))
    },

    //我的跟单列表
    getFollowList(data){
      return instance.post(wrapUrl+'/api/member/follow/getList',qs.stringify(data))
    },

    //确定跟单页数据
    trackingCheck(data){
      return instance.post(wrapUrl+'/api/member/follow/followOrderShow',qs.stringify(data))
    },

    //确定跟单页提交
    trackingCheckS(data){
      return instance.post(wrapUrl+'/api/member/follow/doFollowOrder',qs.stringify(data))
    },

    //我的跟单
    getMyFollowOrder(data){
      return instance.post(wrapUrl+'/api/member/follow/myFollowOrder',qs.stringify(data))
    },

   //取消跟单
   ResetFollowOrder(data){
     return instance.post(wrapUrl+'/api/member/follow/cancelFollow',qs.stringify(data))
   },

    //查看战绩
    getRecord(data){
      return instance.post(wrapUrl+'/api/member/follow/getRecord',qs.stringify(data))
    },

    //实盘交易 策略列表
    getTradeList(data){
      return instance.post(wrapUrl+'/api/member/trade/list',qs.stringify(data))
    },

    //模拟交易 策略列表
    getTradeList_sl(data){
      return instance.post(wrapUrl+'/api/member/simulate/list',qs.stringify(data))
    },

    //实盘交易 实时价格
    getNowPrice(data){
      return instance.post(wrapUrl+'/api/member/trade/nowPrice',qs.stringify(data))
    },

    //模拟交易 实时价格
    getNowPrice_sl(data){
      return instance.post(wrapUrl+'/api/member/simulate/nowPrice',qs.stringify(data))
    },

    //实盘交易 修改止盈止损
    getModifyProfitStop(data){
      return instance.post(wrapUrl+'/api/member/trade/modifyProfitStop',qs.stringify(data))
    },

    // 模拟交易 修改止盈止损
    getModifyProfitStop_sl(data){
      return instance.post(wrapUrl+'/api/member/simulate/modifyProfitStop',qs.stringify(data))
    },

    //实盘交易 平仓
    getTradeCover(data){
      return instance.post(wrapUrl+'/api/member/trade/cover',qs.stringify(data))
    },

    //模拟交易 平仓
    getTradeCover_sl(data){
      return instance.post(wrapUrl+'/api/member/simulate/cover',qs.stringify(data))
    },

    //实盘交易 策略撤单
    getCancel(data){
      return instance.post(wrapUrl+'/api/member/trade/cancel',qs.stringify(data))
    },

    //模拟交易 策略撤单
    getCancel_sl(data){
      return instance.post(wrapUrl+'/api/member/simulate/cancel',qs.stringify(data))
    },

    //协议
    getAgreement(data){
      return instance.post(wrapUrl+'/api/member/follow/contractDetail',qs.stringify(data))
    },


    //首页实时行情one
    getSimpleQuotation(data){
      return instance.post(wrapUrl+'/api/quote/simpleQuotation',qs.stringify(data))
    },

    //首页实时行情ALL
    getAllSimpleQuotation(data){
      return instance.post(wrapUrl+'/api/quote/allSimpleQuotation',qs.stringify(data))
    },

    //公告相关
    getAnnounceList(data){
      return instance.post(wrapUrl+'/api/find/getAnnounceList',qs.stringify(data))
    },

    //邀请好友列表
    getInviteFriends(data){
      return instance.post(wrapUrl+'/api/member/invite/friends',qs.stringify(data))
    },

    //我的下线
    getMyInviteList(data){
      return instance.post(wrapUrl+'/api/member/find/inviteList',qs.stringify(data))
    },
    //推广赚钱
    getInviteUrl(data){
      return instance.post(wrapUrl+'/api/member/find/popularize',qs.stringify(data))
    },

    // 用户登录
    userLogin(data){
        return instance.post(wrapUrl+'/api/login',qs.stringify(data))
    },
    // 用户获取验证码
    userGetRegistCode(data){
        return instance.post(wrapUrl+'/regist/getRegistCode',qs.stringify(data))
    },
    // 找回密码
    userRetrievePwd(data){
        return instance.post(wrapUrl+'/api/sendCode',qs.stringify(data))
    },
    // 用户获取验证码
    userRegisterMsg(data){
        return instance.post(wrapUrl+'/api/userRegister/msg',qs.stringify(data))
    },
    // //验证验证码
    // userCheckRegistCode(data){
    //     return instance.post(wrapUrl+'regist/checkRegistPwdCode',qs.stringify(data))
    // },
    //验证验证码
    userCheckRegistCode(data){
        return instance.post(wrapUrl+'/api/userRegister/checkMsg',qs.stringify(data))
    },
    //用户注册
    userRegister(data){
        return instance.post(wrapUrl+'/api/userRegister',qs.stringify(data))
    },
    //忘记密码验证码
    userGetForgotCode(data){
        return instance.post(wrapUrl+'/api/codetopwd',qs.stringify(data))
    },
    //忘记密码确定
    userForgot(data){
        return instance.post(wrapUrl+'/api/editPwd',qs.stringify(data))
    },

    //新闻列表
    getNews(data){
        return instance.post(wrapUrl+'/api/news',qs.stringify(data))
    },


   /* -----------用户中心相关-------------*/
    getMess(data) {
        return instance.post(wrapUrl + "/api/member/user/userInfo", qs.stringify(data))
    },
    //每日签到
    mark(data){
        return instance.post(wrapUrl + "/api/member/user/sign", qs.stringify(data))
    },
    //联动优势用户已签约的银行列表
    queryBank(data){
        return instance.post(wrapUrl + "/api/member/pay/queryMerCustBankShortcut", qs.stringify(data))
    },
    //修改手机号-发送短信-老手机短信
    oldPhoneSendMsg(data) {
        return instance.post(wrapUrl + "/api/member/user/oldPhoneSendMsg", qs.stringify(data))
    },
    //修改手机号-校验老手机号短信
    phoneCheckMsg(data) {
        return instance.post(wrapUrl + "/api/member/user/phoneCheckMsg", qs.stringify(data))
    },
    //修改手机号-发送短信-新手机短信
    newPhoneSendMsg(data) {
        return instance.post(wrapUrl + "/api/member/user/newPhoneSendMsg", qs.stringify(data))
    },
    //修改手机号
    phone(data) {
        return instance.post(wrapUrl + "/api/member/user/phone", qs.stringify(data))
    },
    //修改登陆密码
    changeP(data) {
        return instance.post(wrapUrl + "/api/member/user/pwd", qs.stringify(data))
    },
    //修改用户名
    changeUserName(data) {
        return instance.post(wrapUrl + "/api/member/user/modifyName", qs.stringify(data))
    },
    //修改支付密码-校验手机号
    phoneSendMsg(data) {
        return instance.post(wrapUrl + "/api/member/user/phoneSendMsg", qs.stringify(data))
    },
    //修改支付密码-校验短信
    phoneCheckPaypwdMsg(data) {
        return instance.post(wrapUrl + "/api/member/user/phoneCheckPaypwdMsg", qs.stringify(data))
    },
    //设置支付密码
    payPwd(data) {
        return instance.post(wrapUrl + "/api/member/user/payPwd", qs.stringify(data))
    },
    //校验支付密码
    checkPayPwd(data) {
        return instance.post(wrapUrl + "/api/member/user/checkPayPwd", qs.stringify(data))
    },
    //用户资金提现
    withdrawDeposit(data) {
        return instance.post(wrapUrl + "/api/member/pay/doFuKuan", qs.stringify(data))
    },
    //手机号验证修改支付密码
    phonePayPwd(data) {
        return instance.post(wrapUrl + "/api/member/user/phonePayPwd", qs.stringify(data))
    },
    //资金日志
    accountLogJson(data) {
        return instance.post(wrapUrl + "/api/accountLog/accountLogJson", qs.stringify(data))
    },
    //我的-首页
    indexJson(data) {
        return instance.post(wrapUrl + "/api/member/user/index", qs.stringify(data))
    },
    //我的邀请码
    myInviteCode(data) {
        return instance.post(wrapUrl + "/api/account/myInviteCode", qs.stringify(data))
    },
    //我的银行卡
    bankList(data) {
        return instance.post(wrapUrl + "/api/member/bank/list", qs.stringify(data))
    },
    //上传头像
    doUploadPic(data) {
        return instance.post(wrapUrl + "/api/member/user/avatar", qs.stringify(data))
    },
    //实名认证提交
    doRealNameJson(data) {
        return instance.post(wrapUrl + "/api/member/user/realName", qs.stringify(data))
    },
    //支付宝账户认证
    bindAlipay(data) {
        return instance.post(wrapUrl + "/api/member/user/bindAlipay", qs.stringify(data))
    },
    //上传图片
    doUploadphoto(data) {
        return instance.post(wrapUrl + "/api/file/upload", qs.stringify(data))
    },
    //添加银行卡初始化数据
    getAddBankCardInitData(data) {
        return instance.post(wrapUrl + "/api/bankauth/getAddBankCardInitData", qs.stringify(data))
    },
    //添加银行提交
    doAddBankCard(data) {
        return instance.post(wrapUrl + "/api/member/bank/add", qs.stringify(data))
    },
    //删除银行卡
    deleteBankCard(data) {
        return instance.post(wrapUrl + "/api/member/bank/del", qs.stringify(data))
    },
    //获取银行数据 getAddBankInitData
    getAddBankInitData(data) {
        return instance.post(wrapUrl + "/api/member/bank/bank", qs.stringify(data))
    },
    //获取联动优势商户支持的银行列表
    getMerBank(data) {
        return instance.post(wrapUrl + "/api/member/pay/queryMerBankShortcut", qs.stringify(data))
    },
    //用户可用/充值限制
    rechargeLimit(data) {
        return instance.post(wrapUrl + "/api/member/user/rechargeLimit", qs.stringify(data))
    },
    //资金明细
    getFundList(data) {
        return instance.post(wrapUrl + "/api/member/fund/log", qs.stringify(data))
    },
    //积分记录
    getScoreLog(data) {
        return instance.post(wrapUrl + "/api/member/point/log", qs.stringify(data))
    },
    // 获取账户信息
    getAccountInfo(data) {
        return instance.post(wrapUrl + "/api/member/account/getAccountInfo", qs.stringify(data))
    },
    //快捷支付无银行卡
    doRecharge(data) {
        return instance.post(wrapUrl + "/api/member/pay/etone/pay", qs.stringify(data))
    },
    //快捷支付，联动优势协议支付接口
    doRecharge1(data) {
        return instance.post(wrapUrl + "/api/member/pay/protocolPay", qs.stringify(data))
    },
    //支付宝信息
    aliPayAccount(data) {
        return instance.post(wrapUrl + "/api/member/pay/alipay/aliPayAccount", qs.stringify(data))
    },
    //支付宝转账
    aliPayRecharge(data) {
        return instance.post(wrapUrl + "/api/member/pay/alipay/alipayRecharge", qs.stringify(data))
    },
    //转账账户信息
    rechargeInfo(data) {
        return instance.post(wrapUrl + "/api/member/pay/alipay/rechargeInfo", qs.stringify(data))
    },
    //公告list
    noticeList(data) {
        return instance.post(Url + "/api/open/discover/noticeList", qs.stringify(data))
    },
    //公告详情
    noticeDetail(data) {
        return instance.post(Url + "/api/open/discover/noticeDetail", qs.stringify(data))
    },
    //服务中心
    suggestion(data) {
        return instance.post(wrapUrl + "/api/account/suggestion", qs.stringify(data))
    },
    //在线提问
    putQuestion(data){
        return instance.post(wrapUrl + "/api/member/questions/putQuestion", qs.stringify(data))
    },
    //在线提问列表
    questionList(data){
        return instance.post(wrapUrl + "/api/member/questions/list", qs.stringify(data))
    },
    //实时获取问题列表
    getQuestions(data){
        return instance.post(wrapUrl + "/api/member/questions/getQuestions", qs.stringify(data))
    },



    /* -----------用户中心相关-------------*/
    /*交易name*/
    tradeName(data){
        return instance.post(wrapUrl + "/api/futures", qs.stringify(data))
    },
    /*风控*/
    getRisk(data) {
        return instance.post(wrapUrl + "/api/quote/getRiskData", qs.stringify(data))
    },
    /*规则参数*/
    getRules(data) {
        return instance.post(wrapUrl + "/api/quote/getRuleData", qs.stringify(data))
    },
    /*实时行情*/
    getFuturesQuote(data) {
        return instance.post(wrapUrl + "/api/quote/getRealData", qs.stringify(data))
    },
    /*分时*/
    getFuturesSlineData(data) {
        return instance.post(wrapUrl + "/api/quote/getTrendData", qs.stringify(data))
    },
    /*K线*/
    getFuturesKline(data) {
        return instance.post(wrapUrl + "/api/quote/getKlineData", qs.stringify(data))
    },
    /*买入初始化数据*/
    getTradeParams(data) {
        return instance.post(wrapUrl + "/api/member/trade/getTradeParams", qs.stringify(data))
    },
    /*单个品种持仓情况*/
    commoHolding(data){
        return instance.post(wrapUrl + "/api/member/trade/commoHolding", qs.stringify(data))
    },
    /*买涨买跌*/
    risingMinus(data) {
        return instance.post(wrapUrl + "/api/member/trade/trade", qs.stringify(data))
    },

    /*模拟行情交易*/
    /*模拟——买入初始化数据*/
    getTradeParams_sl(data) {
        return instance.post(wrapUrl + "/api/member/simulate/getTradeParams", qs.stringify(data))
    },
    /*模拟——单个品种持仓情况*/
    commoHolding_sl(data){
        return instance.post(wrapUrl + "/api/member/simulate/commoHolding", qs.stringify(data))
    },
    /*模拟——买涨买跌*/
    risingMinus_sl(data) {
        return instance.post(wrapUrl + "/api/member/simulate/trade", qs.stringify(data))
    },


    /*娱乐专区*/
    enjoySelf(data){
        return instance.post(wrapUrl + "/api/point/getPointTaskList", qs.stringify(data))
    },


    /*拉卡拉接口*/
    /*获取银行卡列表*/
    queryBankCard(data){
        return instance.post(wrapUrl + "/api/member/pay/lianlian/getBankCardListJson", qs.stringify(data))
    },
    /*连连支付*/
    wapAuthPay(data){
        return instance.post(wrapUrl + "/api/member/pay/lianlian/wapAuthPay", qs.stringify(data))
    },
    /*result返回页接口*/
    getResult(data){
        return instance.post(wrapUrl + "/api/result/getResult", qs.stringify(data))
    },
    /*出金操作 提现*/
    doCash(data){
        return instance.post(wrapUrl + "/api/member/account/doCash", qs.stringify(data))
    },
    /*出金操作 检测*/
    checkCash(data){
        return instance.post(wrapUrl + "/api/member/account/checkCash", qs.stringify(data))
    },
    checkCash2(data){
        return instance.post(wrapUrl + "/api/notify/lianlian/dfNotify", qs.stringify(data))
    },


}
