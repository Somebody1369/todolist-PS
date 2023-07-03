import { defineStore } from "pinia";
import { todoData } from "@/data";
import { ref } from "vue";

export const useTodoListStore = defineStore({
  id: "store",
  state: () => ({
    todos: ref([]),
  }),
  getters: {
    items: (state) => state.todos,
  },
  actions: {
    addItem(item) {
      this.todos.push({ ...item, status: false });
      this.saveItemsToStorage();
    },
    changeStatus(item) {
      item.status = !item.status;
      this.saveItemsToStorage();
    },
    removeItem(item) {
      const index = this.todos.indexOf(item);
      if (index !== -1) {
        this.todos.splice(index, 1);
        this.saveItemsToStorage();
      }
    },
    saveItemsToStorage() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    loadItemsFromStorage() {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        this.todos = JSON.parse(storedTodos);
      }
    },
    emulateDataFetch() {
      const hasVisited = localStorage.getItem("hasVisited");
      if (hasVisited) {
        this.loadItemsFromStorage();
      } else {
        localStorage.setItem("hasVisited", "true");
        this.todos = todoData;
        this.saveItemsToStorage();
      }
    },
  },
});
