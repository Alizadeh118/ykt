<template>
  <div class="item">
    <template v-if="isFolder">
      <button
          v-show="children.length"
          @click="toggleCollapse"
      >
        {{ isCollapsed ? '+' : '-' }}
      </button>
    </template>
    <h4 class="item__title">{{ title }}</h4>
    <template v-if="isFolder">
      <button @click="onCreate(id)">
        Add File
      </button>
      <button @click="onCreate(id, true)">
        Add Folder
      </button>
    </template>
    <button
        v-if="id !== 0"
        @click="onRemove(id)"
    >
      X
    </button>
    <div
        class="item__sub-item"
        v-show="!isCollapsed"
    >
      <Item
          v-for="item in children"
          :key="item.id"
          :id="item.id"
          :title="item.title"
          :children="item.children"
          :is-folder="!!item.children"
          v-on="$listeners"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Item',
  props: {
    id: Number,
    title: String,
    isFolder: Boolean,
    children: Array,
  },
  data() {
    return {
      isCollapsed: false,
    }
  },
  methods: {
    onRemove(id) {
      this.$emit('remove', id);
    },
    onCreate(id, isFolder) {
      this.$emit('create', id, isFolder);
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
  }
}
</script>
<style>
.item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1em;
}

.item__title {
  margin: .5em auto .5em 0;
}

.item__sub-item {
  flex: 1 1 100%;
  padding-left: 1.5em;
}
</style>
