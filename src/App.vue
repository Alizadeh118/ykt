<template>
  <item
      :id="item.id"
      :title="item.title"
      :children="item.children"
      :is-folder="!!item.children"
      @remove="onRemove"
      @create="onCreate"
  />
</template>

<script>
import Item from './components/Item.vue'
import itemFactory from "./itemFactory";

export default {
  name: 'App',
  components: {
    Item
  },
  data() {
    return {
      item: itemFactory('Root', true),
    }
  },
  methods: {
    findItem(items, id) {
      if (id === 0) return this.item;
      for (const subItem of items) {
        if (subItem.id === id) return subItem;
        if (subItem.children?.length) {
          const item = this.findItem(subItem.children, id)
          if (item) return item;
        }
      }
    },
    filterItem(items, id) {
      return items.children
          .filter((item) => item.id !== id)
          .map((item) => {
            if (!item.children) return item;
            item.children = this.filterItem(item, id);
            return item;
          });
    },
    onCreate(parentId = 0, isFolder) {
      const title = prompt('What is the title?')
      if (!title) return;
      const newItem = itemFactory(title, isFolder);
      const parentItem = this.findItem(this.item.children, parentId);
      parentItem.children.push(newItem)
    },
    onRemove(id) {
      this.item.children = this.filterItem(this.item, id)
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
