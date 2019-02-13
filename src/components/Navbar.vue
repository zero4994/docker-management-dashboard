<template>
  <div>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossorigin="anonymous"
    >
    <nav class="navbar fixed-top navbar-light bg-docker-blue mb-5">
      <h1 class="navbar-brand text-black">
        <i class="text-black fab fa-docker pr-2"></i> Docker Management Dashboard
      </h1>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.bg-docker-blue {
  background-color: #0db7ed;
}

.navbar {
  -webkit-box-shadow: 0px 3px 18px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 3px 18px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 3px 18px 0px rgba(0, 0, 0, 0.75);
}
</style>
