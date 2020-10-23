<template>
  <div class="tweet-item" @click="toTweetSource">
    <div class="confidence">
      {{ confidence }}
    </div>
    <div class="content">
      <div class="user-info">
        <figure class="user-info__profile">
          <img :src="profileImg" :alt="username" />
        </figure>
        <div class="user-info__content">
          <div class="name">
            {{ name }}
          </div>
          <div class="username">@{{ username }}</div>
        </div>
      </div>
      <div class="text">
        {{ content }}
      </div>
      <div class="date">
        {{ dateFormated.precise }}
      </div>
      <div class="location">
        <img src="@/assets/img/location_on-24px.svg" alt="" class="icon" />{{
          location
        }}
      </div>
    </div>
  </div>
</template>

<script>
import spacetime from 'spacetime';

export default {
  name: "TweetItem",
  props: [
    "confidence",
    "name",
    "username",
    "profile",
    "content",
    "profileImg",
    "location",
    "tweetUrl",
    "date"
  ],
  computed: {
    dateFormated() {
      const now = spacetime.now();
      // return spacetime(this.date).since(now)
      return now.since(spacetime(this.date))
    }
  },
  methods: {
    toTweetSource() {
      var win = window.open(this.tweetUrl, "_blank");
      win.focus();
    }
  }
};
</script>

<style lang="scss" scoped>
.tweet-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid rgba(black, 0.15);
  border-radius: 0.5rem;
  text-align: left;
  cursor: pointer;

  &:not(:first-child) {
    margin-top: 1rem;
  }

  .confidence {
    font-size: 4rem;
    font-weight: bold;
    margin-right: 0.5rem;
    width: 5rem;
    display: grid;
    place-content: center;
  }

  .content {
    flex-basis: 10%;
    flex-grow: 1;
    .text {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    .date {
      border-top: 1px solid rgba(black, .15);
      padding: .5rem 0;
      font-size: .9rem;
    }
  }

  .location {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 0.8rem;
    color: #6a97fc;
    .icon {
      height: 1rem;
    }
  }
}
.user-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0.5rem;

  &__profile {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 0.5rem;
    background: rgba(grey, 0.15);
    img {
      height: 100%;
      width: 100%;
    }
  }

  &__content {
    .name {
      font-weight: bold;
      font-size: 1.2rem;
    }
    .username {
      font-weight: bold;
      color: rgba(black, 0.5);
    }
  }
}
</style>
