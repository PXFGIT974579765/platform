<template>
  <div v-show="visible" class="verification-code">
    <van-overlay v-show="visible"></van-overlay>

    <div class="verification-numbers">
      <van-icon name="cross" :size="16" class="close" @click="onClose" />

      <div class="title">输入短信验证码</div>

      <div class="contact">
        <div class="phone">{{ user.phone }}</div>
        <div class="btn" v-if="time <= 0" @click="onGetCode">
          点击获取验证码
        </div>
        <div class="btn btn-time" v-else>{{ time }}</div>
      </div>

      <div class="inputs">
        <div
          v-for="(v, i) in values"
          :key="i"
          class="verify-input"
          @click="onFocus(i)"
        >
          {{ v }}
        </div>
      </div>
    </div>

    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
const initValues = ['', '', '', '', '', '']

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      time: 0,
      current: 0,
      values: [...initValues],
      showKeyboard: false,
    }
  },

  methods: {
    reset() {
      this.time = 0
      this.values = [...initValues]
      window.clearInterval(this.timer)
    },

    onClose() {
      this.reset()
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

    onFocus(index) {
      this.current = index
      this.showKeyboard = true
    },

    onDelete() {
      if (this.values[this.current]) {
        this.$set(this.values, this.current, '')
      } else {
        this.current--
        this.$set(this.values, this.current, '')
      }
    },

    onInput(key) {
      this.$set(this.values, this.current, key)

      if (this.current < this.values.length - 1) {
        this.current++
      }

      if (this.values.every(x => !!x)) {
        this.$emit('submit', this.values.join(''))
        this.reset()
      }
    },

    onGetCode() {
      if (this.fetching) return
      this.fetching = true

      this.$http
        .post('/api-sms/sms-internal/code', { phone: this.user.phone })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.$toast('已发送验证码到手机')
            this.setTimer()
            this.onFocus(0)
          }
          this.fetching = false
        })
        .catch(() => {
          this.fetching = false
        })
    },
  },
}
</script>

<style lang="less" scoped>
.verification-code {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.verification-numbers {
  position: absolute;
  left: 20px;
  right: 20px;
  // top: 30%;
  bottom: 240px;
  z-index: 2;
  text-align: center;
  padding: 30px 20px;
  border-radius: 3px;
  background-color: #fff;
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

.verify-input {
  width: 34px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  margin: 25px 8px 0 0;
  border: 1px solid #ddd;

  &:last-child {
    margin-right: 0;
  }
}
</style>
