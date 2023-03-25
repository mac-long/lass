<script>
  export let session;
</script>

{#if session}
  <h1>Welcome {session.user.email}</h1>
  <p>I am logged in!</p>
{:else}
  <h1>I am not logged in</h1>
{/if}