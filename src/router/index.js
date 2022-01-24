import {createRouter, createWebHashHistory} from 'vue-router'
/**
 * 家医随访
 */
import OfficialAccount from '../views/official-account/index'
import qs from "qs";
import {getQueryString} from "@/common/js/utils";
import {callGetAuthUrl, callGetMiniProgramUrl, callGetOpenId} from "@/service/SyncRequest";
import {Toast} from "vant";

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path:'/',
      redirect:'/official',
    },
    {
      path:'/official',
      name:'official',
      component:OfficialAccount
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  console.log(to)
  console.log(process.env.NODE_ENV, qs.parse(""))
  if(process.env.NODE_ENV === "production" && is_weixn()){
    const roomId = getQueryString("roomId");
    roomId&&localStorage.setItem("roomId",roomId);
    const code = getQueryString('code');
    const url = await callGetAuthUrl("https://myjxs.youmaijiankang.com/miniprogram/index.html");
    if(code){
      const res = await callGetOpenId(code);
      if(res.code==200) {
        const {openId} = res.data;
        const $res = await callGetMiniProgramUrl({
          roomId:localStorage.getItem("roomId")??'',
          openId
        })
        if($res.code ==200){
          const {url} =$res.data;
          location.href=url;
        }else {
          Toast({
            message:$res.msg,
            duration:3500
          })
        }

      }
    }else {
      location.replace(url);
    }
    return;
  }
  next()
})

function is_weixn(){
  var ua = navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == "micromessenger"
}

export default router
