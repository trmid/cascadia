<script>
  import Scorecard from "../components/Scorecard.svelte";
</script>

<section>
  <h1>Cascadia Scorecard</h1>
  <Scorecard />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    height: 100%;
  }

  h1 {
    font-size: 32px;
    background-color: #fffe;
    color: #222;
    border-radius: 24px;
    padding: 12px 24px;
  }
</style>