<template>
  <div id="app">
    <item
        :id="item.id"
        :title="item.title"
        :children="item.children"
        :is-folder="item.hasOwnProperty('children')"
        @remove="onRemove"
        @add-file="onAddFile"
        @add-folder="onAddFolder"
    />
  </div>
</template>

<script>
import Item from './components/Item.vue'

export default {
  name: 'App',
  components: {
    Item
  },
  data() {
    return {
      item: {
        "id": 0,
        "title": "Root",
        "children": [],
      },
      newId: 1,
    }
  },
  methods: {
    findItem(items, id) {
      if (id===0) return this.item;
      for (const subItem of items) {
        if (subItem.id===id) return subItem;
        if (subItem.children?.length) {
          const item = this.findItem(subItem.children, id)
          if (item) return item;
        }
      }
    },
    onAddFile(itemId = 0) {
      const title = prompt('What is your file title?')
      if (!title) return;
      const currentItem = this.findItem(this.item.children, itemId);
      currentItem.children.push({
        id: this.newId,
        title,
      })
      this.newId += 1;
    },
    onAddFolder(itemId = 0) {
      console.log((itemId))
      const title = prompt('What is your folder title?')
      if (!title) return;
      const currentItem = this.findItem(this.item.children, itemId);
      currentItem.children.push({
        id: this.newId,
        title,
        children: [],
      })
      this.newId += 1;
    },
    onRemove(id) {
      this.item.children = this.filteredItem(this.item, id)
    },
    filteredItem(items, id) {
      return items.children
          .filter((item) => item.id!==id)
          .map((item) => {
            if (!item.children) return item;
            item.children = this.filteredItem(item, id);
            return item;
          });
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
