<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <p class="mb-0">Добавление пользователя</p>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Имя*"
              v-model="form.name"
              @input="checkForm"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Телефон*"
              type="number"
              v-model="form.phone"
              @input="checkForm"
            />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              v-if="items.length"
              v-model="form.parent_id"
              :items="items"
              item-text="name"
              item-value="id"
            />
          </v-col>
          <v-col>
            <p v-show="error">Не заполнены все обязательные поля</p>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="px-2">
        <v-btn @click="closeForm">Close</v-btn>
        <v-btn color="primary" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  props: {
    value: Boolean,
    data: Array
  },
  data: () => ({
    items: [],
    error: false,
    form: {}
  }),
  computed: {
    ...mapGetters(['doneData']),
    show: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    }
  },
  watch: {
    doneData: {
      handler: function () {
        this.getItems(this.doneData.slice())
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapActions(['setData']),
    getItems(item) {
      for(let key in item) {
        if(item[key].children.length) { 
          this.items.push(...item[key].children)
          this.getItems(item[key].children)
        } else if(!item[key].parent_id) {
          this.items.push(item[key]);
        }
      }
    },
    uuidv4() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    },
    setError(error) {
      this.error = error
    },
    checkForm() {
      this.setError(false)
    },
    closeForm() {
      this.show = false
    },
    clearForm() {
      for (const prop of Object.getOwnPropertyNames(this.form)) {
        delete this.form[prop];
      }
    },
    save() {
      if (!this.form.name || !this.form.phone) {
        this.setError(true)
        return false
      }
      this.setError(false)
      this.form.id = this.uuidv4()
      this.form.children = []
      this.setData(this.form)
      this.clearForm()
      this.closeForm()
    }
  }
}
</script>