<template>
  <VPTeamPage>
    <VPTeamPageTitle>
      <template #title>🎨 Friends 🙌</template>
      <template #lead
        >Awesome Friends from Diverse Fields of Expertise</template
      >
    </VPTeamPageTitle>
    <div class="px-6 md:px-12 lg:px-16">
      <div v-if="friendsInfo.length" class="FriendsContent">
        <FriendsCard
          v-for="(item, index) in friendsInfo"
          :key="index"
          v-bind="item"
        ></FriendsCard>
      </div>
      <p v-else class="pb-8 text-center text-gray-500">
        Add friend links in <code>friendsInfo.ts</code>.
      </p>
    </div>
  </VPTeamPage>
</template>

<script setup>
import { VPTeamPage, VPTeamPageTitle } from "vitepress/theme";
import { friendsInfo } from "../../userConfig/friendsInfo";
import FriendsCard from "./FriendsCard.vue";
</script>

<style scoped>
.FriendsContent {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(336px, 1fr));
  max-width: 1152px;
  gap: 24px;
  margin: 0 auto;
  padding-bottom: 24px;
  justify-content: center;
}
</style>
