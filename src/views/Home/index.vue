<template>
  <div class="home">
    <div class="home__logo">
      <div class="title">Panjir</div>
      <div class="subtitle">Pantau Banjir</div>
    </div>
    <TweetList
      :list="tweetList.data"
      :loading="tweetList.loading"
      :filter="filter"
      @changeFilter="changeFilter"
    />
    <div id="chartdiv"></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import TweetList from "./components/TweetList";
import jakartaJSON from "@/data/jakarta-kecamatan.json";
import { getMapData, getTweetList } from "@/api/tweet";
// import { download } from "@/helper";

export default {
  name: "Home",
  components: {
    TweetList
  },
  data() {
    return {
      floodData: [],
      tweetList: {
        data: [],
        loading: false
      },
      selectedPoint: false,
      filter: "relevant"
    };
  },
  computed: {
    selectedLocation() {
      return (
        this.selectedPoint &&
        this.floodData.find(
          item =>
            item.longitude === this.selectedPoint[0] &&
            item.latitude === this.selectedPoint[1]
        )
      );
    }
  },
  watch: {
    selectedLocation() {
      this.tweetList.loading = true;
      this.fetchTweetList();
    },
    filter() {
      this.tweetList.loading = true;
      this.fetchTweetList();
    }
  },
  async mounted() {
    this.tweetList.loading = true;
    await this.fetchMapData();
    await this.fetchTweetList();
    this.setupMap();
  },
  methods: {
    changeFilter(value) {
      this.filter = value;
    },
    async fetchMapData() {
      const startDate = new Date("01/01/2019").toISOString();
      const endDate = new Date().toISOString();
      this.floodData = await getMapData({
        since: startDate,
        until: endDate
      }).then(response =>
        response.data.data.map(item => ({
          ...item,
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude)
        }))
      );
    },
    async fetchTweetList() {
      const startDate = new Date("01/01/2019").toISOString();
      const endDate = new Date().toISOString();
      const options = {
        since: startDate,
        until: endDate,
        sortByConfidence: this.filter === 'relevant' ? 1 : 0
      };
      if (this.selectedLocation) {
        options.latitude = this.selectedLocation.latitude;
        options.longitude = this.selectedLocation.longitude;
      }
      this.tweetList.data = await getTweetList(options).then(
        response => response.data.data
      );
      this.tweetList.loading = false;
    },
    setupMap() {
      const {
        am4core,
        am4themes_animated,
        am4maps
        // am4geodata_worldLow,
        // am4geodata_indonesiaLow
      } = window;

      am4core.ready(() => {
        const self = this;
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create map instance
        var chart = am4core.create("chartdiv", am4maps.MapChart);

        // Set map definition
        // chart.geodata = am4geodata_worldLow;
        chart.geodata = jakartaJSON;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Exclude Antartica
        polygonSeries.exclude = ["AQ"];

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;

        // Configure series
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "Kel. {KEL_NAME}, Kec. {Kecamatan}";
        polygonTemplate.polygon.fillOpacity = 0.6;
        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = chart.colors.getIndex(0);

        // Add image series
        var imageSeries = chart.series.push(new am4maps.MapImageSeries());
        imageSeries.mapImages.template.propertyFields.longitude = "longitude";
        imageSeries.mapImages.template.propertyFields.latitude = "latitude";
        imageSeries.mapImages.template.propertyFields.url = "url";
        imageSeries.mapImages.template.tooltip = new am4core.Tooltip();
        imageSeries.mapImages.template.tooltip.getFillFromObject = false;
        imageSeries.mapImages.template.tooltip.label.fontSize = 20;
        imageSeries.mapImages.template.tooltip.color = am4core.color("#000");
        imageSeries.mapImages.template.tooltip.label.propertyFields.fill =
          "color";
        imageSeries.mapImages.template.tooltip.background.propertyFields.stroke =
          "color";
        imageSeries.mapImages.template.tooltipText =
          "{title}\n [font-size:15px]Tweet: {tweetNum}\nConfidence: {confidence}";
        // imageSeries.mapImages.template.tooltip.borderRadius = 1;

        var circle = imageSeries.mapImages.template.createChild(am4core.Circle);
        circle.radius = 3;
        circle.propertyFields.fill = "color";
        circle.zIndex = 4;
        // circle.events.on("hit", handleDotClicked);

        var circle2 = imageSeries.mapImages.template.createChild(
          am4core.Circle
        );
        circle2.radius = 3;
        circle2.zIndex = 2;
        circle2.propertyFields.fill = "color";
        // circle2.dataItem = imageSeries;
        circle2.events.on("hit", handleDotClicked);

        circle2.events.on("inited", function(event) {
          animateBullet(event.target);
        });

        function handleDotClicked(event) {
          self.selectPoint(event.target.dataItem._point);
        }

        function animateBullet(circle) {
          var animation = circle.animate(
            [
              { property: "scale", from: 1, to: 5 },
              { property: "opacity", from: 1, to: 0 }
            ],
            1000,
            am4core.ease.circleOut
          );
          animation.events.on("animationended", function(event) {
            animateBullet(event.target.object);
          });
        }

        const colorSet = new am4core.ColorSet();

        imageSeries.data = this.floodData.map(item => ({
          ...item,
          color: colorSet.next()
        }));
      }); // end am4core.ready()
    },
    selectPoint(point) {
      this.selectedPoint = point;
    }
  }
};
</script>

<style lang="scss" scoped>
#chartdiv {
  width: 100vw;
  height: 100vh;
  position: fixed;
}

.home {
  position: relative;

  &__logo {
    position: fixed;
    z-index: 10;
    left: 2rem;
    top: 2rem;
    text-align: left;

    .title {
      font-weight: bold;
      font-size: 2.5rem;
      text-transform: uppercase;
      color: #fc6a6a;
    }
    .subtitle {
      font-size: 1.6rem;
      letter-spacing: 0.25rem;
      color: #775353;
    }
  }
}
</style>
