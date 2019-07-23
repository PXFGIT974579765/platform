<template>
  <div>
    <div class="header">
      <search light />
    </div>

    <div class="activity">
      <div class="activity-detail">
        <img src="~@/assets/images/activity_detail.jpg" alt />

        <div class="activity-content">
          <div class="name">
            <div class="tag">比赛</div>
            刀剑2贵州赛区英雄争霸赛
          </div>
          <div class="detail">
            <div class="read-count">
              <span class="iconfont">&#xe73b;</span>189
            </div>
            <div class="share-count">
              <span class="iconfont">&#xe748;</span>104
            </div>
            <share-button />
          </div>
          <div class="others">
            <div class="price">¥20</div>
            <div class="points">成功参与可获500积分奖励</div>
          </div>
        </div>
      </div>

      <div class="date-address">
        <div class="item date">
          <div class="item-name">日期</div>
          <div class="item-value">
            <span>6月13日</span>
            <span>星期六</span>
            <span>09:00 - 12:00</span>
          </div>
        </div>
        <div class="item address">
          <div class="item-name">地址</div>
          <div class="item-value">
            贵州大学城师范学院同心路15号（创星校园实训中心）
          </div>
        </div>
      </div>
    </div>

    <div class="people">
      <div class="people-header">
        <span>限额 80 人</span>
        <span class="registration">已有 60 人报名</span>
      </div>
      <div class="peoples">
        <img class="people-item" src="~@/assets/images/errand_avatar.png" alt />
        <img class="people-item" src="~@/assets/images/errand_avatar.png" alt />
        <img class="people-item" src="~@/assets/images/errand_avatar.png" alt />
        <img class="people-item" src="~@/assets/images/errand_avatar.png" alt />
        <img class="people-item" src="~@/assets/images/errand_avatar.png" alt />
        <img class="people-item" src="~@/assets/images/errand_avatar.png" alt />
        <img class="people-item" src="~@/assets/images/errand_avatar.png" alt />
      </div>
    </div>

    <div class="intro">
      <div class="intro-header">介绍</div>
      <p>
        首届以物联网、大数据、云计算、人工智能、互联网等产业融合发展为主题的“智能互联融合创新发展论坛”(简称：智融大会)由中国信息通信研究院主导，以“智融未来，慧聚创新”主题，针对政策、技术、应用三大方向，深入探讨智能技术与相关产业融合与创新发展，进一步加强政产学研各界的交流沟通。届时，国家发改委、工信部等有关领导，中国科学院院士、中国工程院院士等权威专家，华为、腾讯、阿里等行业领军企业高管将齐聚重庆，共筑产业“融合·创新·发展”之路。
      </p>
    </div>

    <div class="comment-block">
      <div class="comment-header">评价</div>
      <div class="comments">
        <comment />
        <comment />
        <comment />
      </div>
    </div>

    <button class="submit" @click="onSubmit">立即报名</button>
  </div>
</template>

<script>
import Search from '@/components/Search'
import Comment from '@/components/Comment'
import ShareButton from '@/components/ShareButton'

export default {
  components: {
    Search,
    Comment,
    ShareButton,
  },

  methods: {
    onSubmit() {
      this.$router.push('/activity/order')
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  padding: 10px 18px;
  background: #fff;
}

.activity {
  margin-bottom: 10px;
  padding-bottom: 15px;
  background: #fff;
}

.activity-detail {
  position: relative;

  img {
    display: block;
  }
}

.activity-content {
  position: absolute;
  left: 15px;
  right: 15px;
  top: 100%;
  margin-top: -33px;
  padding: 13px;
  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(136, 136, 136, 0.3);

  .name {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-size: 16px;
  }

  .tag {
    width: 35px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    margin-right: 8px;
    border-radius: 2px;
    font-size: 12px;
    color: #fff;
    background-image: linear-gradient(#16b459, #16b459),
      linear-gradient(#ff3434, #ff3434);
  }

  .detail {
    display: flex;
    margin-bottom: 16px;
    font-size: 12px;
    color: #9a9a9a;
  }

  .share-count {
    flex: 1;
    margin-left: 40px;
  }

  .others {
    display: flex;
    font-size: 13px;
  }

  .price {
    flex: 1;
    color: #ff9000;
  }

  .points {
    color: #06c0b5;
  }
}

.date-address {
  margin: 84px 15px 0;
  padding: 13px;
  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 0px 0px 3px 0px rgba(136, 136, 136, 0.3);
}

.item {
  display: flex;
  line-height: 1.5;
  margin-bottom: 10px;
  font-size: 13px;
  color: #878787;

  &:last-child {
    margin: 0;
  }
}

.item-value {
  flex: 1;
  margin-left: 13px;
  color: #2d2d2d;
}

.people {
  margin: 10px 0;
  padding: 15px;
  background: #fff;
}

.people-header {
  padding: 0;

  .registration {
    margin-left: 15px;
    color: #ff9000;
  }
}

.peoples {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.people-item {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.intro {
  margin: 10px 0;
  padding: 15px;
  background: #fff;

  p {
    font-size: 12px;
    line-height: 1.5;
  }
}

.intro-header,
.comment-header {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 700;
}

.comment-block {
  margin: 10px 0 30px;
  padding: 15px;
  background: #fff;
}

.submit {
  display: block;
  width: 100%;
  text-align: center;
  padding: 20px 0;
  color: #fff;
  background-color: #06c0b5;
}
</style>
