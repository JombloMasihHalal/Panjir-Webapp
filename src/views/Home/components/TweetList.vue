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
      <TweetItem 
        v-for="(tweet, index) in tweets" 
        :key="index" 
        :confidence="tweet.confidence"
        :name="tweet.name"
        :username="tweet.username"
        :profileImg="tweet.img"
        :content="tweet.content"
        :location="tweet.location"
        :tweet-url="tweet.tweet_url"
        />
    </div>
  </div>
</template>

<script>
import TweetItem from './TweetItem';

export default {
  name: "TweetList",
  components: {
    TweetItem
  },
  data() {
    return {
      filter: 'relevant',
      tweets: [
        {
          confidence: 10,
          img:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhurd.house.gov%2Fsites%2Fhurd.house.gov%2Ffiles%2Ffeatured_image%2FBreakingNews.jpeg&f=1&nofb=1",
          username: "RelevanNews",
          name: "Relevan News",
          content:
            "Banjir setinggi 2 meter terjadi di daerah sekitar GOR Jakarta Timur",
          location: "GOR Jakarta Timur",
          tweet_url: "#"
        },
        {
          confidence: 10,
          img:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhurd.house.gov%2Fsites%2Fhurd.house.gov%2Ffiles%2Ffeatured_image%2FBreakingNews.jpeg&f=1&nofb=1",
          username: "RelevanNews",
          name: "Relevan News",
          content:
            "Banjir setinggi 2 meter terjadi di daerah sekitar GOR Jakarta Timur",
          location: "GOR Jakarta Timur",
          tweet_url: "#"
        },
        {
          confidence: 10,
          img:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhurd.house.gov%2Fsites%2Fhurd.house.gov%2Ffiles%2Ffeatured_image%2FBreakingNews.jpeg&f=1&nofb=1",
          username: "RelevanNews",
          name: "Relevan News",
          content:
            "Banjir setinggi 2 meter terjadi di daerah sekitar GOR Jakarta Timur",
          location: "GOR Jakarta Timur",
          tweet_url: "#"
        },
        {
          confidence: 10,
          img:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhurd.house.gov%2Fsites%2Fhurd.house.gov%2Ffiles%2Ffeatured_image%2FBreakingNews.jpeg&f=1&nofb=1",
          username: "RelevanNews",
          name: "Relevan News",
          content:
            "Banjir setinggi 2 meter terjadi di daerah sekitar GOR Jakarta Timur",
          location: "GOR Jakarta Timur",
          tweet_url: "#"
        },
        {
          confidence: 10,
          img:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhurd.house.gov%2Fsites%2Fhurd.house.gov%2Ffiles%2Ffeatured_image%2FBreakingNews.jpeg&f=1&nofb=1",
          username: "RelevanNews",
          name: "Relevan News",
          content:
            "Banjir setinggi 2 meter terjadi di daerah sekitar GOR Jakarta Timur",
          location: "GOR Jakarta Timur",
          tweet_url: "#"
        }
      ]
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
