<template>
  <table style="max-width:800px;" class="info-table">
    <tr>
      <th>TEAM</th>
      <th>RATING</th>
      <th v-if="props.state?.amountOfLeagues > 1">League</th>
      <th>OFF</th>
       <th>DEF</th>
    </tr>
    <template v-for="(team, index) in props.state?.ranking.teams">
      <tr :style="props.state?.amountOfLeagues == 2 ? (props.state?.firstLeague === team.team.leagueModel.leagueName ? 'background-color:#006600;' : 'background-color:#3300cc;') : ''">
        <td>{{ index + 1 }}. <a :href="team.teamLink">{{ team.team.name }}</a></td>
        <td style="padding-right:5px;padding-left:5px">{{ team.SPI_ }}</td>
        <td v-if="props.state?.amountOfLeagues > 1" class="custom-align-1">
          <a :href="props.state.prependedRelativePath + '/info2/' + team.team.leagueModel.uniqueID" target="_self">{{ team.team.leagueModel.leagueName }}</a>  
          <span :title="team.team.leagueModel.leagueCountry"> {{ team.team.leagueModel.flag }}</span>
        </td>
        <td class="custom-align-2">{{ team.offense_ }}</td>
	      <td class="custom-align-2">{{ team.defense_ }}</td>
      </tr>
    </template>
  </table>
</template>

<script setup lang="ts">
// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['state']);
</script>
