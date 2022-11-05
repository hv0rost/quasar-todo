<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
      filled
      class="col"
      bg-color="white"
      v-model="newTask.title"
      placeholder="Add task"
      @keyup.enter="addTask"
      dense>
        <template v-slot:append>
          <q-btn
          round
          dense
          flat
          icon="add"
          @click="addTask"
          />
        </template>
      </q-input>
    </div>

      <div
        class="text-h6 text-center text-primary"
        v-if="getUncompletedTasks.length !== 0">
      Todo
      </div>

      <q-list
      class="bg-white"
      separator
      bordered
    >
      <q-item
        v-ripple
        v-for="task in getUncompletedTasks"
        :key="task.title"
        @click="onTaskClick(task.index)"
        clickable
      >
        <q-item-section avatar>
          <q-checkbox
          v-model="task.done"
          class="no-pointer-events"
          color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{task.title}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div
        class="text-h6 text-center text-primary"
        v-if="getCompletedTasks.length !== 0">
      Done
      </div>

    <q-list
        class="bg-white"
        separator
        bordered
      >
        <q-item
          v-ripple
          v-for="task in getCompletedTasks"
          :key="task.title"
          @click="onTaskClick(task.index)"
          clickable
          :class="{'done bg-purple-1' : task.done}"
        >
          <q-item-section avatar>
            <q-checkbox
            v-model="task.done"
            class="no-pointer-events"
            color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{task.title}}</q-item-label>
          </q-item-section>
          <q-item-section
            v-if="task.done"
            side>
          <q-btn @click.stop="deleteTask(task.index)" flat round color="primary" icon="delete" dense/>
          </q-item-section>
        </q-item>
      </q-list>

    <div
      v-if="!getAllTasks.length"
      class="no-tasks absolute-center">
      <q-icon
      name="check"
      size="100px"
      color="primary" />
      <div class="text-h5 text-primary text-center">
          No tasks
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'todo-list',
  data () {
    return {
      newTask: {
        index: 0,
        title: '',
        done: false
      }
    }
  },
  computed: {
    getUncompletedTasks () {
      return this.$store.getters.getTasks.filter(task => task.done === false)
    },
    getCompletedTasks () {
      return this.$store.getters.getTasks.filter(task => task.done === true)
    },
    getAllTasks () {
      return this.$store.getters.getTasks
    }
  },
  methods: {
    deleteTask (index) {
      console.log(this.getAllTasks)
      console.log(index)
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like to delete this item?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.dispatch('deleteTask', index)
        this.$q.notify({
          message: 'Item was successfully deleted!',
          color: 'purple'
        })
      })
    },
    async addTask () {
      this.newTask.index = this.getAllTasks.length
      console.log(this.newTask.index)
      this.$store.dispatch('addTask', Object.assign({}, this.newTask))
      this.newTask.title = ''
    },
    async onTaskClick (index) {
      console.log(this.getAllTasks)
      console.log(index)
      this.$store.dispatch('updateTask', index)
    }
  }
}
</script>

<style lang="scss">
  .done {
    .q-item__label{
      text-decoration: line-through;
      color: #bbb;
    }
  }
  .no-tasks {
    opacity: 0.7;
  }
</style>
