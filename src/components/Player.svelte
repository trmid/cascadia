<script type="ts" context="module">
  import { HABITAT, Habitat, WILDLIFE, Wildlife } from "./Token.svelte";
  export interface Player {
    name: string
    points: {
      wildlife: Record<Wildlife, number>
      habitat: Record<Habitat, number>
      habitatBonus: Record<Habitat, number>
      natureTokens: number
    }
  }
  export const createPlayer = (): Player => ({
    name: "",
    points: {
      wildlife: {
        bear: 0,
        elk: 0,
        salmon: 0,
        hawk: 0,
        fox: 0
      },
      habitat: {
        mountain: 0,
        forest: 0,
        prairie: 0,
        wetland: 0,
        river: 0
      },
      habitatBonus: {
        mountain: 0,
        forest: 0,
        prairie: 0,
        wetland: 0,
        river: 0
      },
      natureTokens: 0
    }
  });
  export const total = (player: Player) => {
    let total = 0;
    for(const wildlife of WILDLIFE) {
      total += player.points.wildlife[wildlife];
    }
    for(const habitat of HABITAT) {
      total += player.points.habitat[habitat];
      total += player.points.habitatBonus[habitat];
    }
    total += player.points.natureTokens;
    return total;
  };
</script>