<template>
  <div>
    <div class="nav-tabs-navigation">
      <div class="nav-tabs-wrapper">
        <slot name="nav" />
      </div>
    </div>
    <div>
      <slot name="content" />
    </div>
  </div>
</template>
