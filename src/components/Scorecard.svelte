<script type="ts">
  import { Player, createPlayer, total } from "./Player.svelte";
  import Token, { WILDLIFE, HABITAT } from "./Token.svelte";

  let players: Player[] = [createPlayer(), createPlayer(), createPlayer(), createPlayer()];

  const calculateBonus = () => {
    for(const habitat of HABITAT) {
      let largest = -1;
      let secondLargest = -1;
      for(const player of players) {
        player.points.habitatBonus[habitat] = 0;
        const size = player.points.habitat[habitat];
        if(size > largest) {
          secondLargest = largest;
          largest = size;
        }
      }
      if(largest > 0) {
        const withMax = players.filter(x => x.points.habitat[habitat] == largest);
        if(withMax.length > 2) {
          withMax.forEach(player => player.points.habitatBonus[habitat] = 1);
        } else if(withMax.length > 1) {
          withMax.forEach(player => player.points.habitatBonus[habitat] = 2);
        } else {
          withMax[0].points.habitatBonus[habitat] = 3;
          const withSecondMax = players.filter(x => x.points.habitat[habitat] == secondLargest);
          if(withSecondMax.length == 1) {
            withSecondMax[0].points.habitatBonus[habitat] = 1;
          }
        }
      }
    }
  };

  $: players, calculateBonus();
</script>

<table>
  <tbody>

    <!-- Names -->
    <tr>
      <th class="icon"><i class="icofont-user-alt-6"></i></th>
      {#each players as _, i}
        <th>
          <input class="name" type="text" bind:value={players[i].name} placeholder="Player {i + 1} Name">
        </th>
      {/each}
    </tr>

    <!-- Wildlife -->
    {#each WILDLIFE as wildlife}
      <tr>
        <th>
          <Token type={wildlife} />
        </th>
        {#each players as _, i}
          <td>
            <input type="number" bind:value={players[i].points.wildlife[wildlife]}>
          </td>
        {/each}
      </tr>
    {/each}

    <!-- Habitat -->
    {#each HABITAT as habitat}
      <tr>
        <th>
          <Token type={habitat} />
        </th>
        {#each players as _, i}
          <td>
            <input type="number" bind:value={players[i].points.habitat[habitat]}>
            <span class="bonus">{players[i].points.habitatBonus[habitat]}</span>
          </td>
        {/each}
      </tr>
    {/each}

    <!-- Nature Tokens -->
    <tr>
      <th>
        <Token type="nature_token" />
      </th>
      {#each players as _, i}
        <td>
          <input type="number" bind:value={players[i].points.natureTokens}>
        </td>
      {/each}
    </tr>

    <!-- Total -->
    <tr>
      <th>
        Total
      </th>
      {#each players as player}
        <td>
          {total(player)}
        </td>
      {/each}
    </tr>

  </tbody>
</table>

<!-- Style -->
<style>
  table {
    border-collapse: collapse;
  }
  td, th {
    padding: 0.5rem;
    text-align: left;
  }
  .icon {
    text-align: center;
  }
  .icon > i {
    font-size: 24px;
  }
  input {
    padding: 0.5rem;
    font-size: 16px;
    border-radius: 3px;
  }
  input.name {
    max-width: 128px;
  }
  input[type="number"] {
    width: 64px;
  }
  .bonus {
    padding: 0.5rem;
  }
  .bonus::before {
    content: "Bonus: "
  }
</style>