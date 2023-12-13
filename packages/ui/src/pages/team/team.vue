<template>
  <div>
    <h1 style="text-align:center;">{{ initialData.topTitle }}</h1>

    <hr style="width:75%">

    <table style="max-width:800px;">
      <tr>
        <th>RATING</th>
        <th>LEAGUE</th>
        <th>OFF</th>
        <th>DEF</th>
      </tr>
      <tr class="team-table">
        <td>{{ initialData.team?.SPI_ }}</td>
        <td>{{ initialData.team?.team.league }}</td>
        <td>{{ initialData.team?.offense_ }}</td>
        <td>{{ initialData.team?.defense_ }}</td>
      </tr>
    </table>

    <div style="text-align:center;list-style-position: inside;">
      <h3 style="text-align:center;">Links:</h3>

      <ul style="padding:0px">
        <li><a :href="initialData.team?.teamWikipedia">{{ initialData.team?.team?.name }} on Wikipedia</a></li>
        <li><a :href="initialData.team?.leagueSearch">{{ initialData.team?.team?.league }} on Wikipedia</a></li>
      </ul>
    </div>
    <Footer :time="initialData.time" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useMeta } from 'vue-meta';
import { onMounted, ref } from 'vue';
import Footer from '@/components/footer.vue';
import { getTeam } from '@/api';

const { meta } = useMeta({});

const route = useRoute();
const initialData = ref({});
const isInternational = ref(route.fullPath.includes('/international'));

onMounted(async () => {
  meta.meta = [];
  const res = await getTeam(route.params.id);

  initialData.value = res.data ?? {};

  meta.title = `${initialData.value.topTitle} | Football Club Team Rankings`;

  meta.meta.push({
    name: 'description',
    content: `Global football / soccer club team world rankings based on the SPI rating system. Stay up to date with the latest power rankings for ${initialData.value.topTitle}`,
  }, {
    name: 'keywords',
    content: `Soccer,club,football,SPI,soccer power index,ranking,association football,futbol,best leagues,best national teams, ${initialData.value.topTitle}, ${initialData.value.team.team.league}`,
  }, {
    name: 'author',
    content: 'Joe Mecca',
  }, {
    name: 'viewport',
    content: 'width=device-width, initial-scale=0.9',
  }, {
    property: 'og:title',
    content: initialData.value.topTitle,
  }, {
    property: 'og:description',
    content: `Global football / soccer club team world rankings based on the SPI rating system. Stay up to date with the latest power rankings for ${initialData.value.topTitle}`,
  }, {
    property: 'og:image',
    content: 'https://www.globalfootballrankings.com/share.jpg',
  }, {
    property: 'og:type',
    content: 'website',
  }, {
    property: 'twitter:card',
    content: 'summary_large_image',
  }, {
    property: 'twitter:title',
    content: initialData.value.topTitle,
  }, {
    property: 'twitter:description',
    content: `Global football / soccer club team world rankings based on the SPI rating system. Stay up to date with the latest power rankings for ${initialData.value.topTitle}`,
  }, {
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
});

</script>
