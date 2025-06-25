<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	let { children } = $props();
</script>

<div class="notes-app-layout">
	<Sidebar />
	<main class="main-slot">
		{@render children()}
	</main>
</div>
<style>
.notes-app-layout {
	display: flex;
	min-height: 100vh;
	width: 100%;
	padding: 0;
	background: var(--color-bg-2);
}
.main-slot {
	flex: 1 1 100vw;
	padding: 0.7em 0.6em;
	min-width: 0;
}
@media (max-width: 700px) {
	.notes-app-layout {
		flex-direction: column;
	}
	.main-slot {
		min-width: 0;
		padding: 0.4em 0.1em;
	}
}
</style>
