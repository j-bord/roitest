<template>
  <div class="mt-5">
    <v-btn v-show="doneData.length" @click='order = !order'>
      <span v-if="order">по возрастанию</span>
      <span v-else>по убыванию</span>
    </v-btn>
    <v-treeview
      :items="items"
      activatable
      item-key="name"
      open-on-click
    >
      <template v-slot:append="{ item }">
        {{ item.phone }}
      </template> 
    </v-treeview>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    order: true
  }),
  computed: {
    ...mapGetters(['doneData']),
    items() {
      return this.sortItems(this.doneData.slice(), 'name', this.order)
    }
  },
  methods: {
    sortItems(data, field, order) {
      data.sort(this.sortWithOrder(field, order))
      data.forEach(data => {
        if(data.children.length) {
          this.sortItems(data.children, field, order)
        }
      });
      return data
    },

    sortWithOrder(field, order) {
      if(order) return (a, b) => a[field] > b[field] ? 1 : -1
      return (a, b) => a[field] > b[field] ? -1 : 1
    },
    
    toggle: function(todo) {
      todo.done = !todo.done
    }
  }
}
</script>