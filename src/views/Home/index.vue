<template>
  <div class="home">
    <div class="home__logo">
      <div class="title">Panjir</div>
      <div class="subtitle">Pantau Banjir</div>
    </div>
    <TweetList/>
    <div id="chartdiv">

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import TweetList from "./components/TweetList";
import jakartaJSON from "@/data/jakarta.json";
// import { download } from "@/helper";

export default {
  name: "Home",
  components: {
    TweetList
  },
  data() {
    return {
      floodData: [
        {
          title: "Cimahi",
          latitude: -6.87222,
          longitude: 107.5425
        },
        {
          title: "Duren Sawit",
          latitude: -6.229541,
          longitude: 106.918153,
          tweetNum: 10,
          confidence: 10
        }
      ]
    };
  },
  mounted() {
    console.log(
      "jakarta",
      jakartaJSON.features[0].geometry.coordinates[0][0].map(([lat, long]) => [
        lat * 256,
        long * 256
      ])
    );
    this.compressJSONdownload();
    // this.setupMap();
  },
  methods: {
    compressJSONdownload() {
      // const data = {
      //   ...jakartaJSON,
      //   geometry: jakartaJSON.
      // };
      
      // download(JSON.stringify(data), 'test', 'json');
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
        polygonTemplate.tooltipText =
          "{RW}, Kel. {KEL_NAME}, Kec. {KEC_NAME}, {KAB_NAME}";
        polygonTemplate.polygon.fillOpacity = 0.6;

        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = chart.colors.getIndex(0);

        // Add image series
        var imageSeries = chart.series.push(new am4maps.MapImageSeries());
        imageSeries.mapImages.template.propertyFields.longitude = "longitude";
        imageSeries.mapImages.template.propertyFields.latitude = "latitude";
        imageSeries.mapImages.template.tooltipText = "{title}";
        imageSeries.mapImages.template.propertyFields.url = "url";

        var circle = imageSeries.mapImages.template.createChild(am4core.Circle);
        circle.radius = 3;
        circle.propertyFields.fill = "color";

        var circle2 = imageSeries.mapImages.template.createChild(
          am4core.Circle
        );
        circle2.radius = 3;
        circle2.propertyFields.fill = "color";

        circle2.events.on("inited", function(event) {
          animateBullet(event.target);
        });

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
    position: absolute;
    left: 2rem;
    top: 2rem;
    text-align: left;

    .title {
      font-weight: bold;
      font-size: 2.5rem;
      text-transform: uppercase;
      color: #fc6A6a;
    }
    .subtitle {
      font-size: 1.6rem;
      letter-spacing: .25rem;
      color: #775353;
    }
  }
}
</style>
