<template>
  <div class="verification-code">
    <van-icon name="cross" :size="16" class="close" @click="onClose" />

    <div class="title">输入短信验证码</div>

    <div class="contact">
      <div class="phone">{{ user.phone }}</div>
      <div class="btn" v-if="time <= 0" @click="onGetCode">点击获取验证码</div>
      <div class="btn btn-time" v-else>{{ time }}</div>
    </div>

    <div class="inputs">
      <input
        v-for="(v, i) in values"
        :key="i"
        :value="v"
        :ref="`input${i}`"
        type="text"
        @input="onInput(i, $event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      time: 0,
      values: ['', '', '', '', '', ''],
    }
  },

  beforeDestroy() {
    window.clearInterval(this.timer)
  },

  methods: {
    reset() {
      this.time = 0
      window.clearInterval(this.timer)
    },

    onClose() {
      this.$emit('close')
    },

    setTimer() {
      this.time = 60

      this.timer = setInterval(() => {
        this.time--
        if (this.time <= 0) {
          this.reset()
        }
      }, 1000)
    },

    onInput(index, event) {
      const value = event.data
      this.$set(this.values, index, value)

      if (index < this.values.length - 1) {
        this.focus(index + 1)
      }

      if (this.values.every(x => x && x.length > 0)) {
        this.reset()
        this.$emit('submit', this.values.join(''))
      }
    },

    onGetCode() {
      this.$http
        .post('/api-sms/sms-internal/code', { phone: this.user.phone })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.$toast('已发送验证码到手机')
            this.setTimer()
            this.focus(0)
          }
        })
    },

    focus(index) {
      const refs = this.$refs[`input${index}`]
      if (refs && refs[0]) {
        refs[0].focus()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.verification-code {
  position: relative;
  text-align: center;
  padding: 30px 20px;
}

.close {
  position: absolute;
  top: 12px;
  right: 12px;
  color: #adadad;
}

.title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 25px;
}

.contact {
  display: flex;
  justify-content: center;
  align-items: center;
}

.phone {
  margin-right: 10px;
}

.btn {
  padding: 5px 5px;
  border: 1px solid #ddd;
  border-radius: 2px;
}

.btn-time {
  text-align: center;
  width: 45px;
}

.inputs {
  display: flex;
  justify-content: center;
}

input {
  width: 34px;
  height: 34px;
  text-align: center;
  margin: 25px 8px 0 0;
  border: 1px solid #ddd;

  &:last-child {
    margin-right: 0;
  }
}
</style>
