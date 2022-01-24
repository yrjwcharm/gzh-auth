<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
-->
<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"
                   v-if="$route.meta.keepAlive"
                   :key="$route.path" />
      </keep-alive>
      <component :is="Component"
                 v-if="!$route.meta.keepAlive" />
    </router-view>
  </div>
</template>

<script>
import {reactive,onMounted, toRefs} from 'vue';

import {useRouter} from 'vue-router';
export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      transitionName: 'slide-left'
    })
    onMounted(()=>{
      window.onload=function () {
        document.addEventListener('touchstart',function (event) {
          if(event.touches.length>1){
            event.preventDefault();
          }
        });
        var lastTouchEnd=0;
        document.addEventListener('touchend',function (event) {
          var now=(new Date()).getTime();
          if(now-lastTouchEnd<=300){
            event.preventDefault();
          }
          lastTouchEnd=now;
        },false);
        document.addEventListener('gesturestart', function (event) {
          event.preventDefault();
        });
      }
      window.addEventListener('resize', function() {
        if (
            document.activeElement.tagName === 'INPUT' ||
            document.activeElement.tagName === 'TEXTAREA'
        ) {
          window.setTimeout(function() {
            if ('scrollIntoView' in document.activeElement) {
              document.activeElement.scrollIntoView(false)
            } else {
              document.activeElement.scrollIntoViewIfNeeded(false)
            }
          }, 0)
        }
      })
    })
    router.beforeEach((to, from) => {
      if (to.meta.index > from.meta.index) {
        state.transitionName = 'slide-left' // 向左滑动
      } else if (to.meta.index < from.meta.index) {
        // 由次级到主级
        state.transitionName = 'slide-right'
      } else {
        state.transitionName = ''   // 同级无过渡效果
      }
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>
<style lang="less">
@import './common/style/mixin';
html, body {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
  -moz-text-size-adjust: 100% !important;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
.router-view{
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active{
  height: 100%;
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  backface-visibility: hidden;
}
.slide-right-enter{
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active{
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter{
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active{
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.van-badge--fixed {
  z-index: 1000;
}
.div-btn{
  position: absolute;
  bottom: 0;
  z-index: 9999;
  width: 100%;
  .div-btn-fl{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    .div-left{
      width: 120px;
      background: #fff;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-top: 1px solid #eeee;
    }
    .div-right{
      display: flex;
      flex: 1;
      height: 40px;
      color: #fff;
      align-items: center;
      justify-content: center;
      background: #06B48D;
    }
  }
}
.btn{
  height: 40px;
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: center;
  line-height: 40px;
  background: #06B48D;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #FFFFFF;

}
.van-radio__icon--checked .van-icon {
  color: #fff;
  background-color: #06B48D !important;
  border-color: #06B48D !important;
}
.van-radio__label {
  color: #333 !important;
  font-size: 14px;
}
.el-table td, .el-table th.is-leaf {
  .border-1px(#eee)  !important;
}
.el-table--border::after, .el-table--group::after, .el-table::before {
  background-color: #EEE !important;
}
//.el-table thead {
//  color: #333 !important;
//}
.el-table--enable-row-hover .el-table__body tr:hover>td{

  background-color: #06B48D !important;

}
.suspension{
  height: 30px;
  display: flex;
  font-size: 14px;
  background: #f9cd91;
  flex-direction: column;
  justify-content: center;
  .fl-wrap{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding:0  20px 0 20px;
    justify-content: space-between;
    .span-left{
      //float: left;
    }
    .span-close{
       display: inline-block;
       width: 14px;
       height: 14px;
    }
  }

}
.div-bz {
  height: 44px;
  font-size: 14px;
  box-sizing: border-box;
  line-height: 44px;
  color: #06B48D;
  //border-bottom: 1px solid #eee;
  .border-1px(#eee);
  padding-left: 20px;
}
.van-divider{
  color :#EEEEEE !important;
  margin: 0 !important;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;

}
.van-checkbox__icon .van-icon {
  width: 1.5em !important;
  height: 1.5em !important;
}
.van-checkbox__icon {
  height: 1.5em !important;

}
</style>
