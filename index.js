import { createRouter, createWebHashHistory } from 'vue-router'
import config from "../config"
import qs from "qs";
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("../views/Home/index.jsx")
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("../views/detail/index.jsx")
  },
  {
    path: "/clause",
    name: "clause",
    component: () => import("../views/clause/index.vue")
  },
  {
    path: "/payDetail",
    name: "payDetail",
    component: () => import("../views/payDetail/index.jsx")
  },
  {
    path: "/succes",
    name: "succes",
    component: () => import("../views/succes/index.jsx")
  },
  {
    path: "/insurancePolicy",
    name: "insurancePolicy",
    component: () => import("../views/insurancePolicy/index.jsx")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(process.env.NODE_ENV, qs.parse(""))
  if(process.env.NODE_ENV === "production" && is_weixn()){
    let loginParams = qs.parse(location.href.split("?")?.[1] || "");
    console.log("查看", "isPay" in loginParams)
    let openId = sessionStorage.openId;
    let loginUrl = getUrl(loginParams)
    console.log("【微信登录Url】:", loginUrl);
    if(sessionStorage.flag == 1 && ("isPay" in loginParams)){
      sessionStorage.flag = 0;
      sessionStorage.openId = "";
      history.replaceState(null, null, 'https://myjxs.youmaijiankang.com/youmai/ReDiagnosis.html')
      window.location.reload()
      return
    }
    ("code" in loginParams) || openId ? next() : location.replace(loginUrl)
    return;
  }
  next()
})

function getUrl(loginParams){
  let baseUrl = "https://open.weixin.qq.com/connect/oauth2/authorize"
  let paramsJson = {
      appid: config.appId,
      redirect_uri: encodeURIComponent(process.env.VUE_APP_CALL_BACK_URL),
      sponse_type: "code",
      scope: "snsapi_base",
      state: (loginParams.InvitationCode ?? "") + "$" + (loginParams.type ?? 1) + "$" + (loginParams.isPay ?? 1)
  }
  console.log("【微信登录参数】:", Object.entries(paramsJson).map(item => item.join("=")).join("&"));
  return `${baseUrl}?${Object.entries(paramsJson).map(item => item.join("=")).join("&")}#wechat_redirect`;
}

function is_weixn(){ 
    var ua = navigator.userAgent.toLowerCase(); 
    return ua.match(/MicroMessenger/i) == "micromessenger"
}



export default router
