<script>

</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="../assets/logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top">
        Todo List App
      </a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/add">Add Todo</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/about">About</RouterLink>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<style scoped>
/* .navbar{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--navbar-color);
  padding: 10px;
  margin-bottom: 30px;
}
.brand {
  font-size: 2rem;
}
.logo {
  display: flex;
  align-items: center;
}
.links ul {
  display: flex;
  align-items: center;
  padding: 20px;
  margin: 0;
  list-style: none;
}
.links a {
  font-size: 30px;
  margin-left: 10px;
  text-decoration: none;
  color: var(--text-color);
}
a.router-link-active {
  color: var(--accent-color);
}
@media (max-width: 680px) {
  .navbar {
    display: block;
  }
  .links{
    margin-top: 10px;
  }
  .links ul {
    margin: 0;
    padding: 0;
  }
  .links a {
    font-size: 20px;
  }
} */
</style>