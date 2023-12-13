<template>
  <div>
    <Logo :is-international="isInternational" />
    <br><br>
    <div style="font-size: 2rem; font-weight: bold;">Top Leagues. Top Teams. Ranked.</div>
    <h2 v-if="isInternational" style="text-align:center">
      <a :href="initialData.prependedRelativePath + '/all'" target="_self">Clubs</a> | <a href="/" target="_self">Leagues</a> | International
    </h2>
    <h2 v-else style="text-align:center">
      <a :href="initialData.prependedRelativePath + '/all'" target="_self">Clubs</a> | Leagues | <a href="/international" target="_self">International</a>
    </h2>

    <h4 v-if="isInternational" class="align">
      <br/>
      <br><a href="/worldcupgroups">World Cup Groups Ranked</a>
    </h4>

    <p class="align">Compare two leagues together and see how the clubs rank:</p>

    <form :action="initialData.prependedRelativePath + '/compare'" class="align" target="_self">
      Compare
      <select name="first">
        <option v-for="ranking in teams" :value="ranking.uniqueID">{{ ranking.leagueModel.leagueName }}
          <template v-if="!isInternational">{{ ranking.leagueModel.flag }}</template>
        </option>
      </select>
      to
      <select name="second">
        <template v-for="(ranking, index) in teams">
          <option v-if="index === 1" :value="ranking.uniqueID" selected>{{ ranking.leagueModel.leagueName }}
            <template v-if="!isInternational">{{ ranking.leagueModel.flag }}</template>
          </option>
          <option v-else :value="ranking.uniqueID">{{ ranking.leagueModel.leagueName }}
            <template v-if="!isInternational">{{ ranking.leagueModel.flag }}</template>
          </option>
        </template>
      </select>
      <input type="submit" value="Compare">
    </form>
    <br>
    <br>
    <table>
      <tr>
        <th>LEAGUE</th>
        <th>AVG RATING</th>
        <th>STD DEV</th>
        <th>TOP TEAM</th>
        <th>BOTTOM TEAM</th>
      </tr>

      <tr v-for="(ranking, index) in teams">
        <td class="custom-align-1">{{ index }}. <a :href="initialData.prependedRelativePath + '/info2/' + ranking.uniqueID" target="_self">{{ ranking.leagueModel.leagueName }}</a> 
          <span v-if="!isInternational" :title="ranking.leagueModel.leagueCountry"> {{ ranking.leagueModel.flag }}</span>  
          <img v-else class="align" :src="'/' + ranking.leagueModel.lowercaseLeagueName + '.png'" height="25" style="padding-left:3pt" />
        </td>
        <td class="custom-align-2">{{ ranking.SPIAverage }}</td>
        <td class="custom-align-2">{{ ranking.SPIStdDev }}</td>
        <td class="custom-align-1"><a :href="ranking.bestTeam.teamLink">{{ ranking.bestTeam.team.name }}</a>: {{ ranking.bestTeam.SPI_}}</td>
        <td class="custom-align-1"><a :href="ranking.worstTeam.teamLink">{{ ranking.worstTeam.team.name }}</a>: {{ ranking.worstTeam.SPI_}}</td>
      </tr>
    </table>
  </div>
  <br>
  <Footer :time="initialData.time" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useMeta } from 'vue-meta';
import { onMounted, ref } from 'vue';
import _ from 'lodash';
import Logo from '@/components/Logo.vue';
import Footer from '@/components/footer.vue';
import { getRanking, getInternationalRanking } from '@/api';

const { meta } = useMeta({});

const route = useRoute();
const initialData = ref({});
const isInternational = ref(route.fullPath.includes('/international'));
const teams = ref([]);

onMounted(async () => {
  let res;
  meta.meta = [];
  if (isInternational.value) res = await getInternationalRanking();
  else res = await getRanking();

  initialData.value = res.data ?? {};

  teams.value = _.cloneDeep(initialData.value.state);
  meta.title = initialData.value.topTitle;
  if (!initialData.value.isInternational) {
    meta.meta = [{
      name: 'ahrefs-site-verification',
      content: 'c0a112a3627e41ad7d0b61d494564e04ffcc6858c89c3abf87a66d7ff3dd3add',
    }];
  }
  meta.meta.push({
    name: 'description',
    content: 'Football / Soccer League Rankings is a list of professional football leagues in the world and their strength Pretty simple! It takes the rankings of all clubs from FiveThirtyEight, groups them into what league they belong too, and calculates the average SPI (Soccer Power Index) and the standard deviation of the values!',
  }, {
    name: 'keywords',
    content: `Soccer,club,football,SPI,soccer power index,ranking,association football,futbol,best leagues,best national teams,${initialData.value.topTitle}`,
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
    content: 'Football / Soccer League Rankings is a list of professional football leagues in the world and their strength Pretty simple! It takes the rankings of all clubs from FiveThirtyEight, groups them into what league they belong too, and calculates the average SPI (Soccer Power Index) and the standard deviation of the values!',
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
    content: 'Football / Soccer League Rankings is a list of professional football leagues in the world and their strength Pretty simple! It takes the rankings of all clubs from FiveThirtyEight, groups them into what league they belong too, and calculates the average SPI (Soccer Power Index) and the standard deviation of the values!',
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
