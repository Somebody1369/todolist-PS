<template>
  <Header />
  <main>
    <TodoList />
  </main>
</template>

<script>
import Header from "@/components/Header.vue";
import TodoList from "@/components/TodoList.vue";

export default {
  components: {
    TodoList,
    Header,
  },
};
</script>

<style lang="scss" scoped></style>
