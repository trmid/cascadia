<script lang="ts">
	import Router from "svelte-spa-router";
  // import Header from "./components/Header.svelte";
  import { routes } from "./routes";
</script>

<!-- Header -->
<!-- <Header /> -->

<!-- Main -->
<main>

  <!-- Router -->
	<Router {routes}/>

</main>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
  }

  main {
    margin: auto 0;
    padding: 1rem;
  }
</style>