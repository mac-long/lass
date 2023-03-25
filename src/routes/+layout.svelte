<script>
	import '@fontsource/poppins/700.css';
	import '../app.postcss';
</script>


<header class="w-screen flex items-center justify-between p-16">
<h1 class="text-3xl">
	<a href="/">League Tables</a>
</h1>
	<nav class="space-x-4">
		<a href="/">Home</a>
		<a href="/login">Login</a>
		<a href="/register">
			<button>Register</button>
		</a>
	</nav>
</header>
<main>
	<slot />
</main>
<footer class="text-center">
	<span>© {new Date().getFullYear()} <a href="/">League Tables</a></span>
</footer>