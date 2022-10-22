<template>
  <div class="item">
    <button
        v-if="isFolder"
        @click="onToggleCollapse"
    >
      {{ isCollapsed ? '+' : '-' }}
    </button>
    <h4 class="item__title">{{ title }}</h4>
    <template
        v-if="isFolder"
    >
      <button
          class="item__action"
          @click="onAddFile(id)"
      >Add File
      </button>
      <button
          class="item__action"
          @click="onAddFolder(id)"
      >Add Folder
      </button>
    </template>
    <button
        v-if="id !== 0"
        class="item__action"
        @click="onRemove(id)"
    >X
    </button>

    <div
        class="item__sub-item"
        v-show="!isCollapsed"
    >
      <Item
          v-for="subItem in children"
          :key="subItem.id"
          :id="subItem.id"
          :title="subItem.title"
          :children="subItem.children"
          :is-folder="subItem.hasOwnProperty('children')"
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
    onAddFile(id) {
      this.$emit('add-file', id);
    },
    onAddFolder(id) {
      this.$emit('add-folder', id);
    },
    onToggleCollapse() {
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
