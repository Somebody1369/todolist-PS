<template>
  <div class="modal">
    <form @submit.prevent="addItemAndClear">
      <input v-model="title" type="text" placeholder="Title" />
      <textarea v-model="description" type="text" placeholder="Description" />
      <button class="add-btn" :disabled="!title || !description">Add</button>
      <button class="close-button" @click="closeModal">✕</button>
    </form>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useTodoListStore } from "@/store/useTodoListStore";

export default {
  emits: ["close"],
  setup(_, { emit }) {
    const title = ref("");
    const description = ref("");
    const store = useTodoListStore();

    function addItemAndClear() {
      if (!title.value || !description.value) return;
      store.addItem({ title: title.value, description: description.value });
      title.value = "";
      description.value = "";
      emit("close");
    }

    function closeModal() {
      emit("close");
    }

    // Close modal on Escape key press
    watchEffect(() => {
      const handleEscapeKey = (event) => {
        if (event.key === "Escape") {
          closeModal();
        }
      };
      window.addEventListener("keydown", handleEscapeKey);
      return () => {
        window.removeEventListener("keydown", handleEscapeKey);
      };
    });

    return {
      title,
      description,
      store,
      addItemAndClear,
      closeModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: 250px;
  height: 100%;
  max-height: 180px;
  background-color: $main-color;
  transform: translate(-50%, -50%);

  padding: 40px 50px;
  border-radius: 20px;
  z-index: 1000;

  form {
    display: flex;
    align-items: center;
    flex-direction: column;

    input,
    textarea {
      border: none;
      margin-bottom: 12px;
      text-transform: none;
      background-color: $secondary-color;
      width: -webkit-fill-available;
    }

    .add-btn {
      margin-top: 30px;
      padding: 8px 20px;

      color: $main-color;
      background-color: $primary-color;
      width: -webkit-fill-available;

      &:hover {
        color: $button-font;
        background-color: $main-color;
        border: 2px solid $primary-color;
      }
    }
  }
}

.close-button {
  position: absolute;
  top: -5px;
  right: -15px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
</style>
