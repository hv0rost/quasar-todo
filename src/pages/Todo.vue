<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
      filled
      class="col"
      bg-color="white"
      v-model="newTask"
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
    <q-list
      class="bg-white"
      separator
      bordered
    >
      <q-item
        v-ripple
        v-for="(task, index) in tasks"
        :key="task.tile"
        @click="task.done = !task.done"
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
         <q-btn @click.stop="deleteTask(index)" flat round color="primary" icon="delete" dense/>
        </q-item-section>
      </q-item>
    </q-list>
    <div
      v-if="!tasks.length"
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
      newTask: '',
      tasks: []
    }
  },
  methods: {
    deleteTask (index) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like to delete this item?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.tasks.splice(index, 1)
        this.$q.notify({
          message: 'Item was successfully deleted!',
          color: 'purple'
        })
      })
    },
    addTask () {
      this.tasks.push({
        title: this.newTask,
        done: false
      })
      this.newTask = ''
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
