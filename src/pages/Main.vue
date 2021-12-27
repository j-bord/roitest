<template>
  <div class="my-5 mx-5">
    <v-btn @click="showUsersForm=true">Добавить</v-btn>
    <UsersForm
      v-model="showUsersForm"
      :data="doneData"
    />
    <UsersTable
      :items="doneData"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UsersForm from '../components/UsersForm'
import UsersTable from '../components/UsersTable'

export default {
  components: {
    UsersForm,
    UsersTable
  },
  data: () => ({
    showUsersForm: false,
  }),
  computed: {
    ...mapGetters(['doneData']),
    item() {
      return JSON.parse(localStorage.getItem('data'))
    }
  }
}
</script>