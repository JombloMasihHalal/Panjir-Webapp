<template>
  <div class="tweet-item">
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
          <div class="username">
            {{ username }}
          </div>
        </div>
      </div>
      <div class="text">
        {{ content }}
      </div>
      <div class="location">
        <img src="#" alt="" class="icon" />{{ location }}
      </div>
    </div>
  </div>
</template>

<script>
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
    "tweetURl"
  ]
};
</script>

<style lang="scss" scoped></style>
