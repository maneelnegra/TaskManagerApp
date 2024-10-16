<template>
  <div
    style="
      display: flex;
      flex-direction: row;
      padding: 0px 20px 0px 20px;
      justify-content: space-around;
    "
  >
    <div
      v-for="(field, index) in sortedFields"
      :key="index"
      style="flex-basis: 20%"
    >
      <!-- Dynamically render the input field based on the fieldType -->
      <component
        v-model="field.modelValue.value"
        :label="field.label"
        :chips="field.isChipsSelect"
        :multiple="field.isMultiple"
        :items="field.items"
        :is="renderField(field.fieldType)"
      >
        <!-- Conditionally render the customized dropdown items for select fields with 'author' or 'assignee' label -->

        <template
          v-if="
            field.fieldType === 'v-select' &&
            (field.label === 'author' || field.label === 'assignee')
          "
          #item="{ item }"
        >
          <v-list-item
            :title="item?.value"
            @click="onSelect(item, field.isMultiple, field)"
          >
            <template #prepend>
              <v-avatar>
                <img
                  src="https://randomuser.me/api/portraits/men/85.jpg"
                  alt="Profile Photo"
                />
              </v-avatar>
            </template>
          </v-list-item>
        </template>
      </component>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, ref, watch } from "vue";
import { VSelect, VTextField } from "vuetify/components";

export default defineComponent({
  components: {
    VSelect,
    VTextField,
  },
  props: {
    boardFilters: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const sortedFields = computed(() => {
      return props.boardFilters
        .map((filter) => ({
          ...filter,
          modelValue: filter.isMultiple ? ref([]) : ref(null),
        }))
        .slice()
        .sort((a, b) => a.order - b.order);
    });

    const renderField = (fieldType) => {
      switch (fieldType) {
        case "v-text-field":
          return VTextField;
        case "v-select":
          return VSelect;
        default:
          return "div";
      }
    };

    const onSelect = (item, isMultiple, field) => {
      if (isMultiple) {
        field.modelValue.value = [...field.modelValue.value, item];
      } else {
        modelValue = item;
      }
    };

    return {
      sortedFields,
      onSelect,
      renderField,
    };
  },
});
</script>
<style scoped></style>
