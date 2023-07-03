<template>
  <section class="tasks-container">
    <div
      class="todo"
      v-if="!isLoading"
      v-show="showColumns"
      :class="{ 'slide-in-left': showColumns }"
    >
      <div class="column-title">
        <h2>To do</h2>
        <hr />
      </div>
      <ul v-if="todoItems.length">
        <li
          v-for="item in todoItems"
          :key="item.title"
          @click="changeStatus(item)"
          class="fade-in"
        >
          <h3>
            {{ item.title }} <span>{{ item.description }}</span>
          </h3>
          <div class="close-btn" @click="removeItem(item)" type="button">
            <span></span>
            <span class="left"></span>
          </div>
        </li>
      </ul>
      <span class="empty" v-else>Nothing here ;)</span>
    </div>

    <div
      class="todo"
      v-if="!isLoading"
      v-show="showColumns"
      :class="{ 'slide-in-right': showColumns }"
    >
      <div class="column-title">
        <h2>Done</h2>
        <hr />
      </div>
      <ul v-if="doneItems.length">
        <li
          v-for="item in doneItems"
          :key="item.title"
          @click="changeStatus(item)"
          class="fade-in"
        >
          <h3>
            {{ item.title }} <span>{{ item.description }}</span>
          </h3>
          <div class="close-btn" @click="removeItem(item)" type="button">
            <span></span>
            <span class="left"></span>
          </div>
        </li>
      </ul>
      <span class="empty" v-else>Nothing here ;)</span>
    </div>

    <div v-if="isLoading" class="preloader">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useTodoListStore } from "@/store/useTodoListStore";

export default {
  setup() {
    const store = useTodoListStore();
    const showColumns = ref(false);

    onMounted(() => {
      setTimeout(() => {
        showColumns.value = true;
      }, 500);
    });

    // Computed properties
    const todoItems = computed(() =>
      store.items.filter((item) => !item.status)
    );

    const doneItems = computed(() => store.items.filter((item) => item.status));

    // Methods
    function changeStatus(item) {
      store.changeStatus(item);
    }

    function removeItem(item) {
      store.removeItem(item);
    }

    // Loading state
    const isLoading = ref(false);

    // Load data with delay and show preloader
    function loadDataWithDelay() {
      isLoading.value = true;
      return new Promise((resolve) => {
        setTimeout(() => {
          store.emulateDataFetch();
          isLoading.value = false;
          resolve();
        }, 2000);
      });
    }

    // Load data on component mount
    onMounted(() => {
      if (!store.items.length) {
        loadDataWithDelay();
      }
    });

    return {
      store,
      todoItems,
      doneItems,
      changeStatus,
      removeItem,
      isLoading,
      showColumns,
    };
  },
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  @media screen and (max-width: 540px) {
    align-items: center;
    flex-direction: column;
  }

  .todo + .todo {
    margin: 0 0 0 20px;

    @media screen and (max-width: 540px) {
      margin: 20px 0 0 0;
    }
  }

  .todo {
    display: flex;
    align-items: center;
    flex-direction: column;

    position: relative;

    width: 90%;
    max-width: 500px;
    min-width: 250px;
    min-height: 250px;
    max-height: 80vh;

    border-radius: 30px;
    background-color: $secondary-color;

    padding: 70px 20px 40px 20px;

    @media screen and (max-width: 640px) {
      max-height: auto;
    }

    @media screen and (max-width: 300px) {
      min-width: auto;
    }

    button {
      border: none;
    }

    .column-title {
      top: 15px;
      width: 100%;
      position: absolute;

      h2 {
        text-transform: uppercase;
      }

      hr {
        width: 100%;
        height: 2px;
        border: 0;
        opacity: 0.5;
        background-color: $primary-color;
      }
    }

    .empty {
      padding: 20px 20px 40px 20px;
    }
    ul {
      width: 100%;
      padding-left: 0;
      margin: 0 auto 0 0;

      overflow-y: scroll;
      overflow-x: hidden;

      @media screen and (max-width: 640px) {
        overflow-y: hidden;
      }

      li {
        list-style-type: none;

        padding: 20px;
        margin-bottom: 10px;

        border-radius: 12px;
        background-color: $li-color;

        display: flex;
        align-items: flex-start;
        justify-content: space-between;

        .close-btn {
          position: relative;

          width: 20px;

          &:hover {
            span {
              width: 20px;
              background-color: black;
            }
          }

          span {
            position: absolute;

            height: 2px;
            width: 15px;
            background: $neutral-color;

            transform: rotate(-45deg);
          }
          .left {
            transform: rotate(45deg);
          }
        }

        h3 {
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          font-size: 20px;

          margin: 0;

          span {
            display: block;
            opacity: 0.7;

            font-size: 14px;
            line-height: 25px;
          }
        }
      }
    }
  }

  .preloader {
    margin: 0 auto;
    .lds-ellipsis {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }

    .lds-ellipsis div {
      position: absolute;
      top: 33px;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: $primary-color;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    .lds-ellipsis div:nth-child(1) {
      left: 8px;
      animation: lds-ellipsis1 0.6s infinite;
    }

    .lds-ellipsis div:nth-child(2) {
      left: 8px;
      animation: lds-ellipsis2 0.6s infinite;
    }

    .lds-ellipsis div:nth-child(3) {
      left: 32px;
      animation: lds-ellipsis2 0.6s infinite;
    }

    .lds-ellipsis div:nth-child(4) {
      left: 56px;
      animation: lds-ellipsis3 0.6s infinite;
    }

    @keyframes lds-ellipsis1 {
      0% {
        transform: scale(0);
      }

      100% {
        transform: scale(1);
      }
    }

    @keyframes lds-ellipsis3 {
      0% {
        transform: scale(1);
      }

      100% {
        transform: scale(0);
      }
    }

    @keyframes lds-ellipsis2 {
      0% {
        transform: translate(0, 0);
      }

      100% {
        transform: translate(24px, 0);
      }
    }
  }

  //Animations
  .slide-in-left {
    animation: slideInLeft 0.5s forwards;
  }

  .slide-in-right {
    animation: slideInRight 0.5s forwards;
  }

  @keyframes slideInLeft {
    from {
      left: -100%;
    }
    to {
      left: 0;
    }
  }

  @keyframes slideInRight {
    from {
      right: -100%;
    }
    to {
      right: 0;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .fade-in {
    animation: fadeIn 1s forwards;
  }
}
</style>
