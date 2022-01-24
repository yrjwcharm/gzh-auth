<template>
  <div>

  </div>
</template>

<script setup>
  import {onMounted} from "vue";
  import qs from "qs";
  import {getQueryString} from "@/common/js/utils";
  import {callGetAuthUrl, callGetMiniProgramUrl, callGetOpenId} from "@/service/SyncRequest";
  import {useRoute, useRouter} from "vue-router";
  import {Toast} from "vant";

  onMounted(async ()=>{
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
          location.href=$res.data;
        }else {
         Toast({
           message:$res.msg,
           duration:3500
         })
        }

      }
    }else {
      // let url =`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcf59e5dc2c72c1dd&redirect_uri=https%3A%2F%2Fmyjxs.youmaijiankang.com%2Fminiprogram%2F&response_type=code&scope=snsapi_userinfo&state=123&connect_redirect=1#wechat_redirect`
      location.replace(url);
    }
  })
</script>

<style scoped>

</style>
