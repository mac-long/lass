<script>
  import {enhance} from '$app/forms';
  import {theme} from '$lib/store';

  export let data;
  let {session} = data,
    loading = false;

  const handleSubmit = () => {
    loading = true;
    return async () => {
      loading = false;
    };
  };
</script>

<svelte:head>
  <title>Account | Lass</title>
</svelte:head>

<h1>Account</h1>
<form class="px-4 mx-auto mt-8 max-w-xl sm:px-0 sm:mt-0">
  <div class="form-group">
    <label for="email">Logged in As</label>
    <input class="text-center" type="text" value={session.user.email} disabled />
  </div>
</form>

<form
  class="px-4 mx-auto max-w-xl sm:px-0"
  method="post"
  action="?/signout"
  use:enhance={handleSubmit}>
  <div class="form-group">
    <select class="text-red-500" name="Theme" bind:value={$theme}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
      <option value="tsc">TSC</option>
    </select>
  </div>
  <div class="form-group">
    <button class="hover:text-white button" type="submit" disabled={loading}>Sign Out</button>
  </div>
  <div class="form-group">
    <button class="delete" formaction="?/delete">Delete Account</button>
  </div>
</form>
