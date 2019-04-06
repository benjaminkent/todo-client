<template lang="pug">
  .todos-container
    .header
      .title
        h1 things to do
        i.fal.fa-clipboard-list
      button.sign-out(@click="signOut") Log Out
    span.error(v-if="error")
        i.far.fa-exclamation-circle
        | {{ error }}
    input.input-todo(
      autofocus autocomplete="off"
      placeholder="Time to adult... What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo"
    )
    ul.list
      li.list-item(v-for="todo in todos" :key="todo.id" :todo="todo")
        div.todo(v-show="todo !== editedTodo" @dblclick="editTodo(todo)")
          label {{ todo.title }}
          i.fal.fa-trash-alt(@click="deleteTodo(todo)")
        hr
        div.edit(v-show="todo === editedTodo")
          input.input-edit(
            v-todo-focus
            @blur="updateTodo(todo)"
            @keyup.enter="updateTodo(todo)"
            v-model="todo.title"
          )
</template>

<script>
export default {
  name: 'todos',
  data() {
    return {
      todos: [],
      newTodo: [],
      error: '',
      editedTodo: ''
    }
  },
  create() {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/todos')
        .then(response => { this.todos = response.data })
        .catch(error => this.setError(error, "Something is afoot"))
    }
  },
  methods: {
    setError() {
      this.error = (error.response && error.response.data && error.response.data.error) || "Something is afoot"
    },
    addTodo() {
      const value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.$http.secured.post('/todos', { todo: { title: this.newTodo } })
        .then(response => {
          this.todos.push(response.data)
          this.newTodo= ''
        })
        .catch(error => this.setError(error, 'Cannot create To Do, go ahead and be lazy..'))
    },
    deleteTodo(todo) {
      this.$http.secured.delete(`/todos/${todo.id}`)
        .then(response => {
          this.todos.splice(this.todos.indexOf(todo), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete To Do, you must do it again!'))
    },
    editTodo(todo) {
      this.editedTodo = todo
    },
    updateTodo(todo) {
      this.editedTodo = ''
      this.$http.secured.patch(`/todos/${todo.id}`, { todo: { title: todo.title } })
        .catch(error => this.setError(error, 'Cannot update To Do'))
    },
    signOut() {
      this.$http.secured.delete('/signin')
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          this.$router.replace('/')
        })
        .catch(error => this.setError(error, 'Cannot log out, you live here now'))
    }
  },
  directives: {
    'todo-focus': function (el) {
      el.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.todos-container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  color: #0f0f0f;

  .error {
    color: #ff4444;
  }

  .fa-exclamation-circle {
    margin-right: 5px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    width: 75%;

    .sign-out {
      font-size: 20px;
      color: #42b983;
      margin-top: 7px;
      border: none;
      height: 22px;
      background: transparent;
      padding: 2px;
      cursor: pointer;
    }

    .sign-out:hover {
      color: #2c3e50;
    }

    .title {
      display: flex;

      h1 {
        margin: 0 0 20px 0;
        font-weight: 200;
      }

      .fa-clipboard-list {
        font-size: 34px;
        margin-left: 7px;
        color: #42b983;
      }
    }
  }


  .input-todo {
    padding: 7px 0;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-top: 20px;
    color: #42b983;
    font-size: 14px;
    width: 75%;
  }

  .input-todo::placeholder {
    color: #aaa;
    padding: 0 5px;
  }

  ul {
    margin: 30px 0 0 0;
    padding: 0;
    width: 77%;

    .list-item {
      list-style-type: none;
      cursor: pointer;
      margin: 15px 0;

      label {
        cursor: pointer;
      }

      hr {
        border: .5px solid #42b98330;
        margin-top: 3px;
      }

      .input-edit {
        width: 100%;
        padding: 7px 0;
        border-radius: 4px;
        border: 1px solid #ccc;
        margin-top: 20px;
        color: #42b983;
        font-size: 14px;
      }
    }

    .fa-trash-alt {
      visibility: hidden;
      color: #ff4444;
    }

    .list-item:hover .fa-trash-alt {
      visibility: visible;
    }

    .todo {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
