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
  })
</script>

<style scoped>

</style>
