<template>
  <nav
    id="navbar-main"
    class="navbar is-fixed-top"
  >
    <div class="navbar-brand">
      <a
        class="navbar-item is-hidden-desktop"
      >
        <b-icon :icon="icons.menu" />
      </a>
      <div class="navbar-item has-control no-left-space-touch">
        <div class="control">
          <input
            class="input"
            placeholder="Search everywhere..."
          >
        </div>
      </div>
    </div>
    <div class="navbar-brand is-right">
      <a
        class="navbar-item navbar-item-menu-toggle is-hidden-desktop"
      >
        <b-icon
          :icon="icons.menu"
          custom-size="default"
        />
      </a>
    </div>
    <div
      class="navbar-menu fadeIn animated faster"
    >
      <div class="navbar-end">
        <a
          href="https://justboil.me/bulma-admin-template/one"
          class="navbar-item has-divider is-desktop-icon-only"
          title="About"
        >
          <b-icon
            :icon="icons.help"
            custom-size="default"
          />
          <span>About</span>
        </a>
        <a
          class="navbar-item is-desktop-icon-only"
          title="Log out"
        >
          <b-icon
            :icon="icons.logout"
          />
          <span>Log out</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mdiHelp, mdiLogout, mdiMenu } from '@mdi/js';

export default {
  name: 'NavBar',
  data: () => ({
    icons: {
      logout: mdiLogout,
      help: mdiHelp,
      menu: mdiMenu,
    },
  }),
};
</script>
