import Vue from 'vue'
import Router from 'vue-router'
import {getCookie} from '../util/index'
import login from '@/views/login/login'
// pages

const find = resolve => require(['@/views/find/find'], resolve)
const home = resolve => require(['@/views/home/home'], resolve)
const register1 = resolve => require(['@/views/login/register1'], resolve)
const register2 = resolve => require(['@/views/login/register2'], resolve)
const forget = resolve => require(['@/views/login/forget'], resolve)
const my = resolve => require(['@/views/my/my'], resolve)
const quickRecharge = resolve => require(['@/views/my/quickRecharge'], resolve)
// const toGuide = resolve => require(['@/views/my/toGuide'], resolve)

const toAccountinformation = resolve => require(['@/views/my/toAccountinformation'], resolve)
const toCapital = resolve => require(['@/views/my/toCapital'], resolve)
const toScore = resolve => require(['@/views/my/toScore'], resolve)
const toWechat = resolve => require(['@/views/my/toWechat'], resolve)
const toApply = resolve => require(['@/views/my/toApply'], resolve)

const service = resolve => require(['@/views/my/service'], resolve)
// const toNotices = resolve => require(['@/views/my/toNotices'], resolve)
const ruleA = resolve => require(['@/views/my/ruleA'], resolve)
const ruleTD = resolve => require(['@/views/my/ruleTD'], resolve)
// const safe = resolve => require(['@/views/my/safe'], resolve)
// const about = resolve => require(['@/views/my/about'], resolve)
const noticesDetail = resolve => require(['@/views/my/noticesDetail'], resolve)
const toServiceCenter = resolve => require(['@/views/my/toServiceCenter'], resolve)
const toRecharge = resolve => require(['@/views/my/toRecharge'], resolve)
const toWithdrawals = resolve => require(['@/views/my/toWithdrawals'], resolve)
const quickpay = resolve => require(['@/views/my/quickpay'], resolve)
const alipay = resolve => require(['@/views/my/alipay'], resolve)
const alipayDetail = resolve => require(['@/views/my/alipayDetail'], resolve)
const alipayInfo = resolve => require(['@/views/my/alipayInfo'], resolve)
const forgetPassword = resolve => require(['@/views/my/forgetPassword'], resolve)
const phone = resolve => require(['@/views/my/phone'], resolve)
const addCard = resolve => require(['@/views/my/addCard'], resolve)
const changePassword = resolve => require(['@/views/my/changePassword'], resolve)
const toFunddetails = resolve => require(['@/views/my/toFunddetails'], resolve)
const findWithdrawals = resolve => require(['@/views/my/findWithdrawals'], resolve)
const bankList = resolve => require(['@/views/my/bankList'], resolve)
const realnameInfo = resolve => require(['@/views/my/realnameInfo'], resolve)
const myInviteCode = resolve => require(['@/views/my/myInviteCode'], resolve)
const result = resolve => require(['@/views/my/result'], resolve)
const optional = resolve => require(['@/views/optional/optional'], resolve)
const error = resolve => require(['@/views/error/error'], resolve)

/*guowei*/
const agreementRegister = resolve => require(['@/views/login/agreementRegister'], resolve)
const agreementFee = resolve => require(['@/views/trade/agreementFee'], resolve)

/*wy*/
const invite = resolve => require(['@/views/find/invite'], resolve)
const tracking = resolve => require(['@/views/find/tracking'], resolve)

const trackingCheck = resolve => require(['@/views/find/trackingCheck'], resolve)
const guidance = resolve => require(['@/views/find/guidance'], resolve)
const quiklyAbout = resolve => require(['@/views/find/quiklyAbout'], resolve)
const FollowOderTab = resolve => require(['@/components/deal/FollowOderTab'], resolve)
const FollowOderTab2 = resolve => require(['@/components/deal/FollowOderTab2'], resolve)
const trade_re = resolve => require(['@/components/deal/trade_re.vue'], resolve)
const trade_fl = resolve => require(['@/components/deal/trade_fl.vue'], resolve)
const trade_sl = resolve => require(['@/components/deal/trade_sl.vue'], resolve)
const orderRecode = resolve => require(['@/components/deal/orderRecode'], resolve)
// const clickRecode = resolve => require(['@/views/deal/clickRecode'], resolve)
const news = resolve => require(['@/views/find/news'], resolve)
const forget1 = resolve => require(['@/views/login/forget1'], resolve)
const forget2 = resolve => require(['@/views/login/forget2'], resolve)

/*wang  实盘行情加交易*/
const firmOffer = resolve => require(['@/views/trade/firmOffer'], resolve)
const buyOnce = resolve => require(['@/views/trade/buyOnce'], resolve)
const buyOnce_sl = resolve => require(['@/views/trade/buyOnce_sl'], resolve)
const agreement = resolve => require(['@/views/trade/agreement'], resolve)
const mid = resolve => require(['@/views/trade/mid'], resolve)
/*客服中心*/
const beforeService = resolve => require(['@/views/my/beforeService'], resolve)
/*娱乐区*/
const toEntertainment = resolve => require(['@/views/my/toEntertainment'], resolve)
const changeName = resolve => require(['@/views/my/changeName'], resolve)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
     {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget
    },
    {
      path: '/register1',
      name: 'register1',
      component: register1
    },
    {
      path: '/register2',
      name: 'register2',
      component: register2
    },
    {
      path: '/agreementRegister',
      name: 'agreementRegister',
      component: agreementRegister
    },

    {
      path: '/firmOffer',
      name: 'firmOffer',
      component: firmOffer,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/buyOnce',
      name: 'buyOnce',
      component: buyOnce,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: agreement,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/agreementFee',
      name: 'agreementFee',
      component: agreementFee,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/buyOnce_sl',
      name: 'buyOnce_sl',
      component: buyOnce_sl,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/find',
      name: 'find',
      component: find,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        requireAuth: true
      }
    },
    {
        path: '/toEntertainment',
        name: 'toEntertainment',
        component: toEntertainment,
        meta: {
            requireAuth: true
        }
    },
    {
      path: '/my',
      name: 'my',
      component: my,
      meta: {
        requireAuth: true
      }
    },
    {
        path: '/beforeService',
        name: 'beforeService',
        component: beforeService,
        meta: {
            requireAuth: true
        }
    },
    {
      path: '/service',
      name: 'service',
      component: service,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/quickRecharge',
      name: 'quickRecharge',
      component: quickRecharge,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/toWithdrawals',
      name: 'toWithdrawals',
      component: toWithdrawals,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/toRecharge',
      name: 'toRecharge',
      component: toRecharge,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/toAccountinformation',
      name: 'toAccountinformation',
      component: toAccountinformation,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/toCapital',
      name: 'toCapital',
      component: toCapital,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/toScore',
      name: 'toScore',
      component: toScore,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/toWechat',
      name: 'toWechat',
      component: toWechat,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/toApply',
      name: 'toApply',
      component: toApply,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/findWithdrawals',
      name: 'findWithdrawals',
      component: findWithdrawals,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/toServiceCenter',
      name: 'toServiceCenter',
      component: toServiceCenter,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/noticesDetail',
      name: 'noticesDetail',
      component: noticesDetail,
      meta: {
        requireAuth: true
      }
    },

    {
      path: '/ruleA',
      name: 'ruleA',
      component: ruleA,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/ruleTD',
      name: 'ruleTD',
      component: ruleA,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/toFunddetails',
      name: 'toFunddetails',
      component: toFunddetails,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/bankList',
      name: 'bankList',
      component: bankList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/myInviteCode',
      name: 'myInviteCode',
      component: myInviteCode,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/result',
      name: 'result',
      component: result,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/quickpay',
      name: 'quickpay',
      component: quickpay,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: changePassword,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/realnameInfo',
      name: 'realnameInfo',
      component: realnameInfo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/phone',
      name: 'phone',
      component: phone,
      meta: {
        requireAuth: true
      }
    },
    {
        path: '/changeName',
        name: 'changeName',
        component: changeName,
        meta: {
            requireAuth: true
        }
    },
    {
      path: '/alipay',
      name: 'alipay',
      component: alipay,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/alipayDetail',
      name: 'alipayDetail',
      component: alipayDetail,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/alipayInfo',
      name: 'alipayInfo',
      component: alipayInfo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/addCard',
      name: 'addCard',
      component: addCard,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/optional',
      name: 'optional',
      component: optional,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '*',
      name: 'error',
      component: error
    },


    /*wy*/
    {
      path: '/invite',
      name: 'invite',
      component: invite,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/tracking',
      name: 'tracking',
      component: tracking,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/trackingCheck',
      name: 'trackingCheck',
      component: trackingCheck,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/guidance',
      name: 'guidance',
      component: guidance,
      meta: {
        requireAuth: true
      }
    },
      {
      path: '/quiklyAbout',
      name: 'quiklyAbout',
      component: quiklyAbout,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/FollowOderTab',
      name: 'FollowOderTab',
      component: FollowOderTab,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/FollowOderTab2',
      name: 'FollowOderTab2',
      component: FollowOderTab2,
      meta: {
        requireAuth: true
      }
    },{
      path: '/orderRecode',
      name: 'orderRecode',
      component: orderRecode,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/news',
      name: 'news',
      component: news,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/forget1',
      name: 'forget1',
      component: forget1,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/forget2',
      name: 'forget2',
      component: forget2,
      meta: {
        requireAuth: true
      }
    },


    {
      path: '/trade_re',
      name: 'trade_re',
      component: trade_re,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/trade_sl',
      name: 'trade_sl',
      component: trade_sl,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/trade_fl',
      name: 'trade_fl',
      component: trade_fl,
      meta: {
        requireAuth: true
      }
    },

    {
      path: '/mid',
      name: 'mid',
      component: mid,
      meta: {
        requireAuth: true
      }
    }
  ]
})


export default router
