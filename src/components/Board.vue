<template>
  <div class="boardContainerStyles">
    <AppFilters :board-filters="boardFilters" />
    <div class="container">
      <div
        class="section"
        v-for="(section, index) in sections"
        :data-section-index="index"
        :key="index"
      >
        <div
          style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          "
        >
          <h2>
            {{ section.sectionName }}
          </h2>
          <div>
            <v-chip class="ma-2" color="primary">
              <v-icon icon="mdi-dialpad" size="x-small" start></v-icon>
              {{ ticketCount(section.tasks) }}
              <v-tooltip activator="parent" location="top"
                >{{ ticketCount(section.tasks) }} tasks</v-tooltip
              >
            </v-chip>
          </div>
        </div>
        <v-divider style="margin-bottom: 2%"></v-divider>
        <draggable
          v-model="section.tasks"
          group="sections"
          :itemKey="`${index}`"
          class="task-list"
          @start="onDragStart"
        >
          <template #item="{ element }">
            <div class="task">
              {{ element.name }}
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, defineComponent, reactive, ref, computed } from "vue";
import draggable from "vuedraggable";

import AppFilters from "./utils/AppFilters.vue";

export default defineComponent({
  components: {
    draggable,
    AppFilters,
  },
  setup() {
    // must be returned by and API for fetching the board's tickets
    const sections = reactive([
      {
        sectionName: "To Do",
        tasks: [{ name: "Task 1A" }, { name: "Task 1B" }, { name: "Task 1C" }],
      },
      {
        sectionName: "In Progress",
        tasks: [{ name: "Task 2A" }, { name: "Task 2B" }, { name: "Task 2C" }],
      },
      {
        sectionName: "Done",
        tasks: [{ name: "Task 3A" }, { name: "Task 3B" }, { name: "Task 3C" }],
      },
    ]);
    // must be returned by an api for fetching team members
    const teamMembers = ref(["foo", "bar", "fizz", "buzz"]);
    const ticketCount = (tasks) => tasks.length;
    const boardFilters = [
      {
        order: 1,
        label: "assignee",
        fieldType: "v-select",
        isChipsSelect: true,
        isMultiple: true,
        items: teamMembers.value,
      },
      {
        order: 3,
        label: "assignee3",
        fieldType: "v-text-field",
        isChipsSelect: false,
        isMultiple: false,
        items: null,
      },
      {
        order: 2,
        label: "author",
        fieldType: "v-select",
        isChipsSelect: false,
        isMultiple: false,
        items: teamMembers.value,
      },
    ];
    let draggedItem = null;

    watch(
      sections,
      (newSections) => {
        console.log("Sections updated:", newSections);
      },
      { deep: true }
    );

    const onDragStart = (event) => {
      const fromSectionIndex =
        event.from.closest(".section")?.dataset?.sectionIndex;
      draggedItem = sections[fromSectionIndex].tasks[event.oldIndex];
    };

    return { sections, onDragStart, boardFilters, ticketCount };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
}

.boardContainerStyles {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.section {
  width: 30%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.task-list {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task {
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: move;
}

h2 {
  text-align: center;
  font-size: 18px;
}
</style>
