import {createRouter, createWebHashHistory} from 'vue-router'
/**
 * 家医随访
 */
import OfficialAccount from '../views/official-account/index'
import qs from "qs";
import {getQueryString} from "@/common/js/utils";
import {callGetAuthUrl, callGetMiniProgramUrl, callGetOpenId} from "@/service/SyncRequest";
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
// router.beforeEach(async (to, from, next) => {
//   const hrefUrl = window.location.href;
//   const code = getQueryString('code');
//   const url = await callGetAuthUrl(hrefUrl);
//   if(process.env.NODE_ENV==='production'&&is_weixn()) {
//     if (code) {
//       const roomId = getQueryString("roomId");
//       const res = await callGetOpenId(code);
//       if (res.code == 200) {
//         const {openId} = res.data;
//         const $res = await callGetMiniProgramUrl({
//           roomId,
//           openId
//         })
//         if ($res.code == 200) {
//           location.href = $res.data;
//         }
//       }
//     } else {
//       console.log(222,url);
//       location.replace(url);
//     }
//     return;
//   }
//   next()
// })
// //
// function is_weixn(){
//   var ua = navigator.userAgent.toLowerCase();
//   return ua.match(/MicroMessenger/i) == "micromessenger"
// }
export default router
