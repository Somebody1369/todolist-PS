<template>
  <header>
    <img src="@/assets/imgs/logo.png" alt="logo" />
    <button @click="openModal">Create</button>
    <div v-if="modalVisible">
      <TodoModal @close="closeModal" />
      <div class="modal-overlay" @click="closeModal" />
    </div>
  </header>
</template>

<script>
import { ref, computed } from "vue";
import TodoModal from "@/components/TodoModal.vue";

export default {
  name: "HeaderApp",
  components: {
    TodoModal,
  },
  setup() {
    const modalOpen = ref(false);

    function openModal() {
      modalOpen.value = true;
    }

    function closeModal() {
      modalOpen.value = false;
    }

    const modalVisible = computed(() => modalOpen.value);

    return {
      modalVisible,
      openModal,
      closeModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

header {
  margin: 40px auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 50px;
  }

  button {
    margin: 0 0 0 auto;

    &:hover {
      color: $main-color;
      background-color: $primary-color;
    }
  }
}
</style>
