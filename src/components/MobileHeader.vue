<template>
  <header class="mobile-header visible-xs">
    <div class="mobile-header__container">
      <div class="mobile-header__menu">
        <div class="mobile-header__logo font-small sans-serif">
          makaroni4.com
        </div>

        <BarIcon class="mobile-header__bar-icon" />
      </div>
    </div>
  </header>
</template>

<script>
import BarIcon from '@/assets/images/bars-solid.svg';

export default {
  name: 'MobileHeader',
  components: {
    BarIcon,
  },
};
</script>

<style lang="scss">
.mobile-header {
  padding: $px24;

  background-color: $purple-5;

  &__menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    color: $white;
  }

  &__bar-icon {
    width: $px24;

    color: $white;
  }
}
</style>
