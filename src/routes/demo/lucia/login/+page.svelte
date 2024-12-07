<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h1 class="text-2xl">Login/Register</h1>
<form method="post" action="?/login" use:enhance>
	<label>
		Username
		<input name="username" class="border-2 border-blue-600" />
	</label>
	<label>
		Password
		<input type="password" name="password" class="border-2 border-blue-600" />
	</label>
	<button class="text-blue-500">Login</button>
	<button formaction="?/register" class="text-green-500">Register</button>
</form>
<p style="color: red">{form?.message ?? ''}</p>
