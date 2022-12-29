<!-- Module -->
<script type="ts" context="module">
  export const WILDLIFE: Wildlife[] = ['bear', 'elk', 'salmon', 'hawk', 'fox'];
  export type Wildlife = 'bear' | 'elk' | 'salmon' | 'hawk' | 'fox';
  export const HABITAT: Habitat[] = ['mountain', 'forest', 'prairie', 'wetland', 'river'];
  export type Habitat = 'mountain' | 'forest' | 'prairie' | 'wetland' | 'river';
</script>

<!-- Component -->
<script type="ts">
  export let type: Wildlife | Habitat | "nature_token";
  $: folder = WILDLIFE.includes(type as any) ? 'token/' : (HABITAT.includes(type as any) ? 'tile/' : '');
</script>

<!-- Token -->
<img src="assets/{folder}{type}.jpg" alt={type} title={type.replaceAll('_', ' ')}>

<!-- Style -->
<style>
  img {
    display: block;
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
</style>