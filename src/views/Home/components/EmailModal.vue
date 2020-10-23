<template>
  <div :class="['email-modal', minimize ? 'hide' : '']">
    <div class="header">
      <img
        src="@/assets/img/notifications-24px.svg"
        alt=""
        class="icon"
        @click="toggleMinimize"
      />
      <div class="header-name">
        Notifikasi
      </div>
    </div>
    <div class="content">
      <p v-if="sended && !minimize">
        Nomor anda telah terdaftar
      </p>
      <template v-else-if="!minimize">
        <p>
          Masukkan nomor anda untuk mendapatkan pemberitahuan banjir Jakarta
          secara aktual
        </p>
        <the-mask v-model="phone" :mask="['(##) ###-####-####']" />
        <button @click="sendPhoneNumber">Subscribe!</button>
      </template>

    </div>
    <img
      src="@/assets/img/close-24px.svg"
      alt=""
      class="icon--close"
      @click="toggleMinimize"
    />
  </div>
</template>

<script>
import { TheMask } from "vue-the-mask";
import { createPhoneNumber } from "@/api/tweet.js";

export default {
  name: "EmailModal",
  components: {
    TheMask
  },
  data() {
    return {
      minimize: false,
      phone: "",
      sended: false,
    };
  },
  watch: {
    minimize(val) {
      if(!val) this.sended = false;
    }
  },
  methods: {
    toggleMinimize() {
      this.minimize = !this.minimize;
    },
    async sendPhoneNumber() {
      await createPhoneNumber(this.phone);
      this.sended = true;
      const self = this;
      setTimeout(()=>{
        self.minimize = true;
      }, 5000)
    }
  }
};
</script>

<style lang="scss" scoped>
.email-modal {
  position: fixed;
  left: 2rem;
  bottom: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 5px 5px rgba(black, 0.15);
  padding: 0.5rem;
  z-index: 10;
  max-width: 20rem;
  overflow: hidden;

  &.hide {
    max-width: 3rem;
    .header {
      padding: 0.25rem;
      display: block;
      &-name {
        display: none;
      }
    }
    .icon {
      transform: scale(2);
    }

    .content {
      transform: translateX(-100%) scale(0);
      max-height: 0;
      opacity: 0;
    }

    .icon--close {
      transform: translateX(-100%) scale(0);
      max-height: 0;
      opacity: 0;
    }
  }

  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-direction: column;
    padding: 0.25rem 0.5rem 0 0.5rem;
    transition: all 0.5s;

    p {
      text-align: left;
      margin-bottom: 0.25rem;
    }

    input {
      padding: 0.25rem;
      margin-bottom: 0.5rem;
      font-size: 1rem;
      border: none;
      border-bottom: 1px solid rgba(black, 0.15);
    }

    button {
      border-radius: 0.25rem;
      border: none;
      background: burlywood;
      padding: 0.25rem;
      font-size: 0.8rem;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.2s;

      &:hover {
        background: darken(burlywood, 10);
      }
    }
  }

  .icon {
    height: 1rem;
    transition: all 0.5s;
    cursor: pointer;

    &--close {
      transition: all 0.5s;

      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
      cursor: pointer;
      height: 1.5rem;
    }
  }
}
</style>
