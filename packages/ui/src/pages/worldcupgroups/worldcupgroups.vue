<template>
  <div>
    <Logo :is-international="isInternational" />
    <hr style="width:75%">
    <h4 class="align">What is this?</h4>
    <h4 class="align">This is a ranked list of the 2022 World Cup groups ranked via SPI.</h4>
    <hr style="width:75%">
    <br />
    <template v-for="group in initialData.groups">
      <h2 style="text-align:center">{{ group.title }} -  Average SPI: {{ group._avgSPI }}</h2>
      <hr style="width:45%">
      <table style="max-width:800px;" class="info-table">
        <tr>
            <th>Team</th>
            <th>SPI</th>	
        </tr>
        <tr v-for="(team, index) in group.teams">
          <td>{{ index + 1 }}. <a :href="team.teamLink">{{ team.team.name }}</a></td>
          <td style="padding-right:5px;padding-left:5px">{{ team.SPI_ }}</td>
        </tr>
      </table>
    </template>
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
import { getWorldcupgroups } from '@/api';

const { meta } = useMeta({});

const route = useRoute();
const initialData = ref({});
const isInternational = ref(route.fullPath.includes('/international'));

onMounted(async () => {
  meta.meta = [];
  const res = await getWorldcupgroups();

  initialData.value = res.data ?? {};

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
    content: 'Soccer,club,football,SPI,soccer power index,ranking,association football,futbol,best leagues,best national teams',
  }, {
    name: 'author',
    content: 'Joe Mecca',
  }, {
    name: 'viewport',
    content: 'width=device-width, initial-scale=0.9',
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
