<script type="ts">
  import { Player, createPlayer, total } from "./Player.svelte";
  import Rotator from "./Rotator.svelte";
  import Token, { WILDLIFE, HABITAT, Habitat, Wildlife, isHabitat, isWildlife } from "./Token.svelte";

  let players: Player[] = [createPlayer(), createPlayer(), createPlayer(), createPlayer()];
  let rows: (Habitat | Wildlife | 'nature_token')[] = [...WILDLIFE, ...HABITAT, 'nature_token'];
  let playerIndex = 0;
  let row = 0;
  let editing = false;
  let pointInput: HTMLInputElement | null = null;

  $: currentRow = rows[row];
  $: (row || 1) && (playerIndex || 1) && pointInput && focusInput();
  $: pointInput?.addEventListener("keypress", e => { if(e.key === "Enter") { e.preventDefault(); cycle(); } });

  const focusInput = () => {
    setTimeout(() => {
      pointInput?.focus();
      pointInput?.select();
    }, 0);
  };

  const cycle = () => {
    if(++row >= rows.length) {
      row = 0;
      if(++playerIndex >= players.length) playerIndex = 0;
    }
  };

  const edit = (_playerIndex: number, _row: number) => {
    playerIndex = _playerIndex;
    row = _row;
    editing = true;
  };

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

<div id="container">
  {#if editing}
    {#if currentRow === rows[row]}
      <div id="editor">
        <button on:click={() => editing = false}><i class="icofont-arrow-left"></i> Back</button>
        <Rotator bind:i={playerIndex} min={0} max={players.length - 1}>
          {players[playerIndex].name ? players[playerIndex].name : `Player ${playerIndex + 1}`}
        </Rotator>
        <Rotator bind:i={row} min={0} max={rows.length - 1}>
          <div class="row-name">
            <Token type={rows[row]} /> {rows[row] === 'nature_token' ? 'Nature Token' : rows[row].charAt(0).toUpperCase() + rows[row].slice(1)}
          </div>
        </Rotator>
        <br>
        <span>
          Points:
          {#if isHabitat(currentRow)}
            <input type="number" bind:this={pointInput} class="point-input" bind:value={players[playerIndex].points.habitat[currentRow]}>
          {:else if isWildlife(currentRow)}
            <input type="number" bind:this={pointInput} class="point-input" bind:value={players[playerIndex].points.wildlife[currentRow]}>
          {:else}
            <input type="number" bind:this={pointInput} class="point-input" bind:value={players[playerIndex].points.natureTokens}>
          {/if}
        </span>
      </div>
    {/if}
  {:else}
    <table>
      <tbody>

        <!-- Names -->
        <tr>
          <th class="icon"><i class="icofont-user-alt-6"></i></th>
          {#each players as _, i}
            <th>
              <input class="name" type="text" bind:value={players[i].name} placeholder="Player {i + 1}">
            </th>
          {/each}
        </tr>

        <!-- Points -->
        {#each rows as rowId, row}
          <tr>
            <th>
              <Token type={rowId} />
            </th>
            {#each players as player, playerIndex}
              <td>
                <button class="edit" on:click={() => edit(playerIndex, row)}>
                  {#if isHabitat(rowId)}
                    {player.points.habitat[rowId]} / {player.points.habitatBonus[rowId]}
                  {:else if isWildlife(rowId)}
                    {player.points.wildlife[rowId]}
                  {:else}
                    {player.points.natureTokens}
                  {/if}
                </button>
              </td>
            {/each}
          </tr>
        {/each}

        <!-- Total -->
        <tr>
          <th>
            <div style="height:48px;display:flex;align-items:center;justify-content:center;">Total</div>
          </th>
          {#each players as player}
            <td>
              <div class="total">{total(player)}</div>
            </td>
          {/each}
        </tr>

      </tbody>
    </table>
  {/if}
</div>

<!-- Style -->
<style>
  #container {
    background-color: #fffe;
    border-radius: 24px;
    padding: 12px;
    max-width: calc(100% - 24px);
    overflow: auto;
    position: relative;
    width: max-content;
    text-align: center;
  }
  #editor {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  table {
    border-collapse: collapse;
  }
  td, th {
    padding: 6px;
    text-align: center;
  }
  .icon {
    text-align: center;
    color: #222;
  }
  .icon > i {
    font-size: 24px;
  }
  input {
    padding: 0.5rem;
    font-size: 16px;
    border-radius: 3px;
  }
  input.name,
  button.edit,
  .total {
    width: 96px;
    height: 48px;
    box-sizing: border-box;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    padding: 6px 12px;
    border: 1px solid #222;
  }
  button.edit {
    cursor: pointer;
  }
  .row-name {
    display: flex;
    align-items: center;
    gap: 24px;
  }
  .point-input {
    width: 64px;
    border-radius: 12px;
  }

  @media screen and (max-width: 720px) {
    input.name,
    button.edit,
    .total {
      width: 64px;
      padding: 6px;
    }

    th,td {
      padding: 3px;
    }
  }
</style>