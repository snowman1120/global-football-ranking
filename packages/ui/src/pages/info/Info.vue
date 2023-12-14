<template>
  <div>
    <div v-if="isInternational" style="text-align:center">
      <a href="/international" target="_self" style="color:white;">
        <Logo :is-international="isInternational" />
      </a>
    </div>
    <div v-else style="text-align:center">
      <a href="/" target="_self" style="color:white;">
        <Logo :is-international="isInternational" />
      </a>
    </div>
    <hr style="width:75%">
    <template v-if="isInternational && initialData.state?.title !== 'Clubs'">
      <h2 v-if="initialData.state?.title" class="align">#(state.title)</h2>
      <h2 v-else class="align">{{ initialData.state?.title }} <img class="align" :src="'/' + initialData.state?.lowercaseTitle + '.png'" height="45"></h2> 
    </template>
    <h2 v-else class="align">{{ initialData.state?.title }}</h2>

    <h4 class="align">Team rankings based on our Vantage Power Score, an international team rating system designed to be the best possible representation of their current overall strength</h4>

    <h3 class="align">AVG RATING: {{ initialData.state?.ranking.SPIAverage }} - STD DEV: {{ initialData.state?.ranking.SPIStdDev }}</h3>

    <table style="max-width:800px;" class="info-table">
      <tr>
        <td>Top: <a :href="initialData.state?.ranking.bestTeam.teamSearch">{{ initialData.state?.ranking.bestTeam.team.name }}</a> - {{ initialData.state?.ranking.bestTeam.SPI_ }}</td>
        <td>Bottom: <a :href="initialData.state?.ranking.worstTeam.teamSearch">{{ initialData.state?.ranking.worstTeam.team.name }}</a> - {{ initialData.state?.ranking.worstTeam.SPI_ }}</td>
      </tr>
    </table>
    <br>
    <Table v-if="initialData.state" :state="initialData.state" />
    <br/>
    <h3 class="align">Histogram of teams in: {{ initialData.state?.title }}</h3>
    <br/>
    <div id="chart_div" style="width: 100%; height: 35%;"></div>
    <br>
    <Footer :time="initialData.time" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useMeta } from 'vue-meta';
import { onMounted, ref } from 'vue';
import _ from 'lodash';
import Logo from '@/components/Logo.vue';
import Footer from '@/components/footer.vue';
import Table from '@/components/table.vue';
import { getCompare, getInternationalCompare, getCompare2, getInternationalCompare2, getInfo2, getInternationalInfo2, getAll, getInternationalAll } from '@/api';

const { meta } = useMeta({});

const route = useRoute();
const initialData = ref({});
const isInternational = ref(route.fullPath.includes('/international'));

onMounted(async () => {
  let res;
  meta.meta = [];
  if (isInternational.value) {
    if (route.fullPath.includes('/compare')) {
      if (Object.keys(route.params).length > 0) {
        const first = route.params.first;
        const second = route.params.second;
        res = await getInternationalCompare2(first, second);
      } else if (Object.keys(route.query).length > 0) {
        const first = route.query.first;
        const second = route.query.second;
        res = await getInternationalCompare(first, second);
      }
    } else if (route.fullPath.includes('/all')) {
      res = await getInternationalAll();
    } else if (route.fullPath.includes('/info2')) {
      res = await getInternationalInfo2();
    }
  } else {
    if (route.fullPath.includes('/compare')) {
      if (Object.keys(route.params).length > 0) {
        const first = route.params.first;
        const second = route.params.second;
        res = await getCompare2(first, second);
      } else if (Object.keys(route.query).length > 0) {
        const first = route.query.first;
        const second = route.query.second;
        res = await getCompare(first, second);
      }
    } else if (route.fullPath.includes('/all')) {
      res = await getAll();
    } else if (route.fullPath.includes('/info2')) {
      res = await getInfo2();
    }
  }

  initialData.value = res.data ?? {};

  meta.title = initialData.value.state.title || initialData.value.state.topTitle;
  if (initialData.value.state.firstLeague === initialData.value.state.otherLeague) {
    if (initialData.value.isInternational) {
      meta.meta.push({
        name: 'description',
        content: `Global football / soccer international team world rankings based on the SPI rating system. Stay up to date with the latest world rankings for ${initialData.value.state.title}`,
      });
    } else {
      meta.meta.push({
        name: 'description',
        content: `Global football / soccer league world rankings based on the SPI rating system. Stay up to date with the latest power rankings for the ${initialData.value.state.title}`,
      });
    }
  } else {
    meta.meta.push({
      name: 'description',
      content: `Compare the latest football / soccer world rankings for hundreds of men's teams across dozens of leagues. See how the rankings compare for ${initialData.value.state.title} now`,
    });
  }

  meta.meta.push({
    name: 'keywords',
    content: `Soccer,club,football,SPI,soccer power index,ranking,association football,futbol,best leagues,best national teams,${initialData.value.state.topTitle},${initialData.value.state.title},${initialData.value.state.ranking.bestTeam.team.name}`,
  }, {
    name: 'author',
    content: 'Joe Mecca',
  }, {
    name: 'viewport',
    content: 'width=device-width, initial-scale=0.9',
  });

  if (initialData.value.state.firstLeague === initialData.value.state.otherLeague) {
    if (initialData.value.state.isInternational) {
      meta.meta.push({
        property: 'og:description',
        content: `Global football / soccer international team world rankings based on the SPI rating system. Stay up to date with the latest world rankings for ${initialData.value.state.title}`,
      });
    } else {
      meta.meta.push({
        property: 'og:description',
        content: `Global football / soccer league world rankings based on the SPI rating system. Stay up to date with the latest power rankings for the ${initialData.value.state.title}`,
      });
    }
  } else {
    meta.meta.push({
      name: 'og:description',
      content: `Compare the latest football / soccer world rankings for hundreds of men's teams across dozens of leagues. See how the rankings compare for ${initialData.value.state.title} now`
    });
  }

  meta.meta.push({
    property: 'og:title',
    content: initialData.value.state.title,
  }, {
    property: 'og:image',
    content: 'https://www.globalfootballrankings.com/share.jpg',
  }, {
    property: 'og:type',
    content: 'website',
  });

  meta.meta.push({
    property: 'twitter:card',
    content: 'summary_large_image',
  }, {
    property: 'twitter:title',
    content: initialData.value.state.title,
  });

  if (initialData.value.state.firstLeague === initialData.value.state.otherLeague) {
    if (initialData.value.state.isInternational) {
      meta.meta.push({
        property: 'twitter:description',
        content: `Global football / soccer international team world rankings based on the SPI rating system. Stay up to date with the latest world rankings for ${initialData.value.state.title}`,
      });
    } else {
      meta.meta.push({
        property: 'twitter:description',
        content: `Global football / soccer league world rankings based on the SPI rating system. Stay up to date with the latest power rankings for the ${initialData.value.state.title}`,
      });
    }
  } else {
    meta.meta.push({
      property: 'twitter:description',
      content: `Compare the latest football / soccer world rankings for hundreds of men's teams across dozens of leagues. See how the rankings compare for ${initialData.value.state.title} now`,
    });
  }

  meta.meta.push({
    property: 'twitter:image',
    content: 'https://www.globalfootballrankings.com/share.jpg',
  }, {
    property: 'twitter:creator',
    content: '@LeaguesRank',
  });

  if (!isInternational.value) {
    const externalScript = document.createElement('script');
    externalScript.setAttribute('src', 'https://my.hellobar.com/5bdbd1a5d2451479440b4d307ee4d7cf35da0ec4.js');
    externalScript.setAttribute('type', 'text/javascript');
    externalScript.setAttribute('charset', 'utf-8');
    externalScript.setAttribute('async', 'async');
    document.head.appendChild(externalScript);
  }

  const chartJs = document.createElement('script');
  chartJs.setAttribute('src', 'https://www.gstatic.com/charts/loader.js');
  chartJs.setAttribute('type', 'text/javascript');
  document.head.appendChild(chartJs);

  setTimeout(() => {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
  }, 500);
});

const drawChart = () => {
  const teamData = [['Ranking', 'SPI']];
  for (const d of initialData.value.state.ranking.reversedTeams) {
      teamData.push([ d.team.name, d.SPI_ ]);
  }
  const data = google.visualization.arrayToDataTable(teamData);

  const options = {
    colors: ['orange'],
    title: `Distribution of SPI in: ${initialData.value.state.title}`,
    hAxis: {
      ticks: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
      textStyle: {color: "white"}
    },
    legend: {textStyle: {color: 'white', fontSize: 16}},
    titleTextStyle: {color: "white"},
    vAxis: {
      minorGridlines: {count: 0},
      textStyle: {color: "white"},
    },
    chartArea:{width:'95%',height:'75%',backgroundColor: "black"},
    bar: { gap: 0 },

    histogram: {
      bucketSize: 0.02,
      maxNumBuckets: 20,
      minValue: 0,
      maxValue: 100
    },
    backgroundColor: "black",
    height: 350,
  };
  const chart = new google.visualization.Histogram(document.getElementById('chart_div'));
  chart.draw(data, options);
}
</script>
