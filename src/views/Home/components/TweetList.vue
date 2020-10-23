<template>
  <div class="tweet-list">
    <div class="title">
      Daftar Tweet
    </div>
    <div class="tab">
      <div :class="['tab__item', filter === 'relevant'? 'active': '']" @click="changeFilter('relevant')">
        Paling Relevan
      </div>
      <div :class="['tab__item', filter === 'newest'? 'active': '']" @click="changeFilter('newest')">
        Terbaru
      </div>
    </div>
    <div class="content">
      <loading :active.sync="loading" 
        :can-cancel="false" 
        :is-full-page="false"></loading>
      <TweetItem 
        v-for="(tweet, index) in list" 
        :key="index" 
        :confidence="tweet.confidence"
        :name="tweet.name"
        :username="tweet.username"
        :profileImg="tweet.img"
        :content="tweet.content"
        :location="tweet.locationInfo.parsed_place_name"
        :tweet-url="tweet.tweet_url"
        />
    </div>
  </div>
</template>

<script>
import TweetItem from './TweetItem';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: "TweetList",
  components: {
    TweetItem,
    Loading
  },
  props: {
    list: {
      type: Array,
      default: ()=>[]
    },
    loading: Boolean
  },
  data() {
    return {
      filter: 'relevant',
    };
  },
  methods: {
    changeFilter(val) {
      this.filter = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.tweet-list {
  position: fixed;
  box-shadow: 0 0 5px 5px rgba(black, .15);
  top: 50%;
  right: 2rem;
  height: 90vh;
  transform: translateY(-50%);
  padding: 1rem;
  border-radius: .5rem;
  width: 25rem;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgba(white, .5);
  transition: all .2s;

  &:hover {
    background: white;
  }

  .title {
    width: 100%;
    text-align: left;
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    &__item {
      width: 45%;
      text-align: center;
      padding: .5rem;
      transition: all .2s;
      cursor: pointer;
      &.active {
        background: rgba(grey, .3);
        border-radius: .25rem;
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
