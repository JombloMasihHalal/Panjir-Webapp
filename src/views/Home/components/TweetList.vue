<template>
  <div class="tweet-list">
    <div class="title">
      Daftar Tweet
    </div>
    <div class="tab">
      <div class="tab__item">
        Paling Relevan
      </div>
      <div class="tab__item">
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
        :profile="tweet.img"
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
        }
      ]
    };
  }
};
</script>

<style></style>
