<template>
  <Header></Header>
  <div class="courseContainer">
    <div class="courseInfoTop">
      <div class="info-container">
        <ul class="route">
          <li class="route-item" style="cursor: pointer">
            <router-link to="/course" style="color: #fff">课程</router-link>
          </li>
          <li class="route-item"><i class="el-icon-arrow-right"></i></li>
          <li class="route-item" style="cursor: pointer">
            {{ CourseInfo.discountPrice === 0 ? '免费课' : '会员课程' }}
          </li>
          <li class="route-item"><i class="el-icon-arrow-right"></i></li>
          <li class="route-item">{{ CourseInfo.courseName }}</li>
        </ul>
        <div class="name">{{ CourseInfo.courseName }}</div>
        <div class="info">
          <div class="Avat">
            <img src="../assets/img/Avat62.png" alt="" />
          </div>
          <ul class="teacherName">
            <li class="name-item">
              {{ CourseInfo.courseName }}
              <img src="../assets/img/teacherStart.png" alt="" />
            </li>
            <li class="name-item">金牌讲师</li>
          </ul>
          <ul class="access">
            <li class="access-item">难度</li>
            <li class="access-item">
              {{ courseType(CourseInfo.courseLevel) }}
            </li>
            <li class="access-item">·</li>
            <li class="access-item">时长</li>
            <li class="access-item">{{ CourseInfo.totalHour }}个小时</li>
            <li class="access-item">·</li>
            <li class="access-item">学习人数</li>
            <li class="access-item">
              {{ CourseInfo.purchaseCounter + CourseInfo.purchaseCnt }}人
            </li>
            <li class="access-item">·</li>
            <li class="access-item">综合评分</li>
            <li class="access-item">10.00</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="info-nav">
      <div class="nav-container">
        <div class="chapter-item" @click="active = true">
          <div :class="active ? 'active1' : ''">章节</div>
          <div class="line" :class="active ? 'active2' : ''"></div>
        </div>
        <div class="chapter-item" @click="active = false">
          <div :class="!active ? 'active1' : ''">下载资料</div>
          <div class="line" :class="!active ? 'active2' : ''"></div>
        </div>
      </div>
    </div>
    <div class="course" v-if="active">
      <div class="main">
        <div class="introduction">
          <div class="desc">课程暂无描述</div>
          <div class="btn">
            <button class="btn-item active">立即购买</button>
            <button class="btn-item" @click="addCart">加入购物车</button>
          </div>
        </div>
        <div class="video" v-for="item in courseChapters" :key="item.id">
          <div class="chapterName">{{ item.chapterName }}</div>
          <div class="chapterDesc">{{ item.description }}</div>
          <ul class="videos">
            <li class="video-item" v-for="k in item.children" :key="k.id">
              <div class="video-itemIcon">
                <i class="el-icon-video-camera"></i>
              </div>

              <div class="item-name">
                <span class="shipin">视频：</span>
                <span class="chapterName">{{ k.chapterName }}</span>
                <span class="free" v-if="k.publicType === 2">试看</span>
              </div>
              <button class="btn-learn" @click="goPlay(item, k.id)">
                开始学习
              </button>
              <div class="clearfloat"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="attachments.length > 0">
        <div class="down" v-for="item in attachments" :key="item.id">
          <div class="source">
            <span class="downloadCourse">{{ item.attachmentName }}</span>
            <button class="downloadbtn" @click="downloadSource(item)">
              下载资料
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <el-empty description="该课程暂无资料"></el-empty>
      </div>
    </div>
  </div>
  <Foot></Foot>
</template>

<script>
import Header from '../components/Header.vue';
import Foot from '../components/Foot.vue';
import { ref, onBeforeMount } from 'vue';
import { getDetail } from '../api/courseManagement';
import { useRoute, useRouter } from 'vue-router';
import { courseType } from '../utils/courseType';
import { useUserStore } from '@/store/user';
import { courseCheckAuth, downloadAttachment } from '../api/courseManagement';
//element-plus

import { ElMessage } from 'element-plus';

import { addShopCard } from '../api/cart';
import { createToken } from '../api/user';

export default {
  components: {
    Header,
    Foot
  },
  setup() {
    //切换课程和资料
    //切换章节和下载资料
    let active = ref(true);
    //判断资料是否存在

    // 获取路由信息
    const route = useRoute();
    let router = useRouter();
    let courseId = route.params.id;
    // 课程详情的数据
    let CourseInfo = ref({});
    //课程章节
    let courseChapters = ref([]);
    //课程资料
    let attachments = ref([]);
    //生命周期
    onBeforeMount(() => {
      getDetail({
        courseId
      }).then((res) => {
        CourseInfo.value = res.data.data;

        courseChapters.value = res.data.data.bizCourseChapters;
        attachments.value = res.data.data.bizCourseAttachments;
      });
    });

    // 下载资料
    const downloadSource = (item) => {
      // 判断登录
      if (!useUserStore().token) {
        ElMessage.info({
          message: '请先登录'
        });
        router.push('/login');
        return;
      }
      // 查询是否有下载权限
      courseCheckAuth({
        courseId: item.courseId //课程ID
      }).then((res) => {
        if (!res.data.data.hasAuth) {
          ElMessage.info({
            message: '请先购买该课程'
          });
          return;
        }
      });
      // 有下载权限，调接口下载
      downloadAttachment({
        courseId: item.courseId, //课程ID
        attachmentId: item.id //课程资料ID
      }).then((res) => {
        // 返回文件流

        const blob = new Blob([res]);
        let fileName = item.attachmentName;
        let fileUrl = item.attachmentUrl;
        const extName = fileUrl.substring(fileUrl.lastIndexOf('.'));
        fileName = fileName + extName;
        const link = document.createElement('a');
        link.download = fileName;
        link.target = '_blank';
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      });
    };
    // 开始学习
    const goPlay = (item, chapterId) => {
      // 判断登录
      if (!useUserStore().token) {
        ElMessage.info({
          message: '请先登录'
        });
        router.push('/login');
        return;
      }
      // 查询是否有权限
      courseCheckAuth({
        courseId: item.courseId //课程ID
      }).then((res) => {
        if (!res.data.data.hasAuth) {
          ElMessage.info({
            message: '请先购买该课程'
          });
          return;
        }

        //有权限
        router.push({
          path: '/coursePlay/' + item.courseId + '/' + chapterId
        });
      });
    };

    const addCart = () => {
      createToken().then((res) => {
        let token = res.data.token;
        addShopCard(
          {
            courseId,
            memberId: useUserStore().userInfo.id
          },
          token
        ).then((res) => {
          if (res.meta.code == '200') {
            ElMessage.success({
              message: '加入购物车成功～'
            });
            return;
          } else {
            ElMessage.info({
              message: '添加失败～该课程已经在购物车中了!'
            });
          }
        });
      });
    };
    return {
      active,
      CourseInfo,
      attachments,
      courseType,
      courseChapters,
      downloadSource,
      goPlay,
      addCart
    };
  }
};
</script>

<style scoped>
.courseContainer {
  width: 100%;
  height: 100%;
  background: #f8fafc;
  overflow: hidden;
}
.main {
  margin: 40px auto;
  width: 1200px;
  height: 100%;
}
.courseInfoTop {
  width: 100%;
  height: 200px;
  background-image: url('../assets/img/courseInfobg1920.png');
}
.nav-container {
  width: 1200px;
  margin: 0 auto;
  color: #333333;
  display: flex;
}
/* .chapter-item  .active{
    color: #388FFF;

} */
/* 背景部分开始 */
.courseInfoTop .info-container {
  margin: 0 auto;
  width: 1200px;
  height: 200px;
  color: #ffffff;
  z-index: 5;
}
.route {
  /*margin-left: 50px;*/
  padding-top: 20px;
  display: flex;
  font-size: 14px;
}
.route .route-item {
  margin-right: 10px;
}
.name {
  margin: 30px 0 10px 0px;
  font-size: 24px;
}
.info {
  display: flex;
  /*margin-left: 50px;*/
}
.info .Avat {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.info .Avat img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.teacherName {
  margin: 8px 0 0 8px;
}
.name-item img {
  width: 14px;
  height: 14px;
}
.access {
  margin: 0 0 0 100px;
  display: flex;
}
.access .access-item {
  margin-right: 10px;
  line-height: 60px;
}
/* 背景部分结束 */

/* 导航栏开始 */
.info-nav {
  width: 100%;

  background: #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.course {
  margin: 0 auto;
  width: 1200px;
}
.chapter {
  display: flex;
  font-weight: 600;
  color: #333333;
  margin-left: 50px;
  font-size: 20px;
}
.chapter-item {
  padding-bottom: 8px;
  font-size: 20px;
  font-weight: bold;
  line-height: 80px;
  margin-right: 70px;
  cursor: pointer;
  position: relative;
}
.chapter-item .active1 {
  color: #388fff;
}
.chapter-item .active2 {
  position: absolute;
  width: 70%;
  top: 63px;
  left: calc(30% / 2);
  height: 4px;
  background: #388fff;
  border-radius: 2px;
}

/* 导航栏结束 */
/* 课程介绍开始 */
.introduction {
  /*margin-left: 50px;*/
  /*padding: 20px;*/
  width: 1210px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.09);
}
.desc {
  padding: 20px;
  color: #474747;
  line-height: 35px;
}
.btn {
  float: right;
  margin-top: 10px;
  padding: 0 20px 20px;
}
.btn-item {
  width: 120px;
  height: 40px;
  /*margin: 0 20px 0 0;*/
  padding: 0px;
  border: 0px;
  outline: none;
  color: #f11d1d;
  border-radius: 23px;
  cursor: pointer;
}
.btn .active {
  background: #f11d1d !important;
  color: #ffffff;
  margin-right: 10px;
}
/* 课程介绍结束 */

/* 视频目录开始 */
.video {
  margin: 20px 0;
  padding: 20px;
  width: 1170px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.09);
}
.video .chapterName {
  font-weight: bold;
  font-size: 20px;
  color: #333333;
}
.video .free {
  padding-left: 20px;
  font-size: 14px;
  color: #388fff;
}
.chapterDesc {
  margin: 10px 0;
  font-size: 13px;
  color: #5c5c5c;
}
.video-item {
  height: 40px;
  line-height: 40px;
  padding: 5px 0;
  /*margin: 0 0 10px 0;*/
  border-radius: 8px;
}
.video-item:hover {
  cursor: pointer;
  background: rgba(53, 133, 255, 0.2);
  border-radius: 8px;
  color: #388fff !important;
}
.video-item .shipin {
  color: #333333;
  font-weight: bold;
}
.video-item .chapterName {
  font-size: 16px;
  font-weight: 400;
  color: #333333;
}
.video-itemIcon,
.item-name {
  float: left;
  padding-left: 10px;
}
.btn-learn {
  margin: 5px 5px 0 0;
  float: right;
  right: -100px;
  width: 80px;
  height: 30px;
  line-height: 30px;
  border: 0px;
  outline: none;
  color: #fff;
  background: #388fff;
  border-radius: 12px;
  cursor: pointer;
}
.clearfloat {
  clear: both;
}
/* 视频目录结束 */
.source {
  margin: 2px 0;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.09);
}
.down {
  margin: 10px auto !important;
  width: 1200px;
  height: 100%;
  padding: 5px;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 8px;
}
.down:first-child {
  margin: 40px 0 5px 0;
}
.downloadbtn {
  width: 100px;
  height: 30px;
  line-height: 30px;
  background: #388fff;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
</style>
