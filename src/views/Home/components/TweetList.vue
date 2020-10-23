<template>
  <div class="tweet-list">
    <div class="title">
      <img
        v-if="place"
        class="back-btn"
        src="@/assets/img/arrow_back-24px.svg"
        alt=""
        @click="$emit('back')"
      />
      {{ place ? place : "Daftar Tweet" }}
    </div>
    <div class="tab">
      <div
        :class="['tab__item', filter === 'relevant' ? 'active' : '']"
        @click="changeFilter('relevant')"
      >
        Paling Relevan
      </div>
      <div
        :class="['tab__item', filter === 'newest' ? 'active' : '']"
        @click="changeFilter('newest')"
      >
        Terbaru
      </div>
    </div>
    <div class="content">
      <loading
        :active.sync="loading"
        :can-cancel="false"
        :is-full-page="false"
      ></loading>
      <div v-if="!loading && list.length === 0" class="empty">
        Tidak ada tweet yang terkait
      </div>
      <TweetItem
        v-for="(tweet, index) in list"
        :key="index"
        :confidence="tweet.confidence"
        :name="tweet.name"
        :username="tweet.username"
        :profileImg="tweet.img"
        :content="tweet.content"
        :date="tweet.dateTweetCreated"
        :location="tweet.locationInfo.parsed_place_name"
        :tweet-url="tweet.tweet_url"
      />
    </div>
  </div>
</template>

<script>
import TweetItem from "./TweetItem";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "TweetList",
  components: {
    TweetItem,
    Loading
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    loading: Boolean,
    filter: String,
    place: String
  },
  methods: {
    changeFilter(val) {
      this.$emit("changeFilter", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.tweet-list {
  position: fixed;
  box-shadow: 0 0 5px 5px rgba(black, 0.15);
  top: 50%;
  right: 2rem;
  height: 90vh;
  transform: translateY(-50%);
  padding: 1rem;
  border-radius: 0.5rem;
  width: 25rem;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgba(white, 0.5);
  transition: all 0.2s;

  &:hover {
    background: white;
  }

  .title {
    width: 100%;
    text-align: left;
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .back-btn {
      margin-right: 1rem;
      cursor: pointer;
    }
  }

  .tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    &__item {
      width: 45%;
      text-align: center;
      padding: 0.5rem;
      transition: all 0.2s;
      cursor: pointer;
      &.active {
        background: rgba(grey, 0.3);
        border-radius: 0.25rem;
      }
    }
  }

  .content {
    height: 50%;
    flex-grow: 1;
    overflow: auto;
    margin-top: 1rem;
  }
}
</style>
