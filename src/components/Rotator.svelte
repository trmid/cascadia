<script type="ts">
  export let i: number;
  export let min: number;
  export let max: number;

  const minus = () => {
    if(--i < min) i = max;
  };
  const plus = () => {
    if(++i > max) i = min;
  };
</script>

<div id="container">
  <button on:click={minus}><i class="icofont-caret-left"></i></button>
  <div id="showcase">
    <slot></slot>
  </div>
  <button on:click={plus}><i class="icofont-caret-right"></i></button>
</div>

<style>
  #container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    width: 400px;
    max-width: 100%;
  }

  #showcase {
    height: 48px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    font-size: 32px;
    cursor: pointer;
    border: none;
    background-color: transparent;
    width: 48px;
    height: 48px;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
</style>