<template>
  <header class="mobile-header visible-xs">
    <div class="mobile-header__container">
      <div class="mobile-header__menu-bar">
        <div class="mobile-header__logo font-small sans-serif">
          makaroni4.com
        </div>

        <CloseIcon
          v-if="menuShown"
          @click.prevent="menuShown = !menuShown"
          class="mobile-header__toggle-icon" />

        <BarIcon
          v-else
          @click.prevent="menuShown = !menuShown"
          class="mobile-header__toggle-icon" />
      </div>

      <div
        v-if="menuShown"
        class="mobile-header__dropdown">
        <a
          class="mobile-header__dropdown-link font-large sans-serif no-underline"
          href="/articles">
          ARTICLES
        </a>

        <a
          class="mobile-header__dropdown-link font-large sans-serif no-underline"
          href="/articles">
          PROJECTS
        </a>

        <a
          class="mobile-header__dropdown-link font-large sans-serif no-underline"
          href="/quotes">
          QUOTES
        </a>

        <a
          class="mobile-header__dropdown-link font-large sans-serif no-underline"
          href="/notes">
          NOTES
        </a>

        <a
          class="mobile-header__dropdown-link font-large sans-serif no-underline"
          href="/articles">
          NOW
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import BarIcon from '@/assets/images/bars-solid.svg';
import CloseIcon from '@/assets/images/times-solid.svg';

export default {
  name: 'MobileHeader',
  components: {
    BarIcon,
    CloseIcon,
  },
  data() {
    return {
      menuShown: false,
    };
  },
};
</script>

<style lang="scss">
.mobile-header {
  padding: $px24;
  position: relative;

  background-color: $purple-5;

  &__container {
  }

  &__menu-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    color: $white;
  }

  &__toggle-icon {
    height: $px24;

    color: $white;
  }

  &__dropdown {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: $px32 $px24;
    z-index: 100;
    transform: translateY(100%);

    background-color: $purple-5;
  }

  &__dropdown-link {
    color: $white;

    &:not(:last-child) {
      margin-bottom: $px24;
    }
  }
}
</style>
