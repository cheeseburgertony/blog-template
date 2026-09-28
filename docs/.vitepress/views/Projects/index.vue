<template>
  <VPTeamPage>
    <VPTeamPageTitle>
      <template #title>🎯 Projects ✨</template>
      <template #lead>My Open Source Projects</template>
    </VPTeamPageTitle>
    <div class="px-6 md:px-12 lg:px-16">
      <template v-if="projectsInfo.length > 0">
        <div class="ProjectsContent">
          <ProjectCard
            v-for="(item, index) in projectsInfo"
            :key="index"
            v-bind="item"
          />
        </div>
      </template>
      <div v-else class="text-center text-lg text-gray-500">
        <div>🚧 No projects added yet.</div>
        <br />
        <div>Add projects in <code>projectsInfo.ts</code>.</div>
      </div>
    </div>
  </VPTeamPage>
</template>

<script setup>
import { VPTeamPage, VPTeamPageTitle } from "vitepress/theme";
import ProjectCard from "./ProjectCard.vue";
import { projectsInfo } from "../../userConfig/projectsInfo";
</script>

<style scoped>
.ProjectsContent {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
  max-width: 1152px;
  gap: 24px;
  margin: 0 auto;
  padding-bottom: 24px;
}
</style>
