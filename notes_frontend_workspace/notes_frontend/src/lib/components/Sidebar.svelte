<script lang="ts">
	import { notesStore, type Note } from '../stores/notesStore';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { derived } from 'svelte/store';

	let notes: Note[] = [];
	let activeId: string | null = null;

	const notesSubscription = notesStore.subscribe(list => {
		notes = list;
	});
	
	// Watch for URL and highlight active
	const pagePath = derived(page, $page => $page.url.pathname);

	$pagePath.subscribe(path => {
		const match = /^\/notes\/([^/]+)/.exec(path);
		activeId = match ? match[1] : null;
	});

	onMount(() => {
		notesStore.init();
	});

	function newNote() {
		const created = notesStore.addNote('', '');
		goto(`/notes/${created.id}/edit`);
	}
	function selectNote(id: string) {
		goto(`/notes/${id}`);
	}
</script>

<aside class="sidebar">
	<header>
		<h1>✍️ Notes</h1>
		<button class="primary" on:click={newNote} title="Create new note">+ New Note</button>
	</header>
	<nav>
		<ul>
			{#if notes.length === 0}
				<li class="empty">No notes yet.</li>
			{:else}
				{#each notes as note}
				<li class={note.id === activeId ? 'active' : ''} on:click={() => selectNote(note.id)} tabindex="0" title={note.title}>
					<span class="title">{note.title || "Untitled"}</span>
					<small>{new Date(note.updated_at).toLocaleDateString()}</small>
				</li>
				{/each}
			{/if}
		</ul>
	</nav>
</aside>

<style>
.sidebar {
	background: var(--color-bg-2);
	border-right: 1px solid #e1e6f0;
	padding: 0 0.5rem;
	min-width: 220px;
	max-width: 320px;
	width: 24vw;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	height: 100vh;
	overflow-y: auto;
	position: sticky;
	top: 0;
}

header {
	margin-top: 1.3rem;
	margin-bottom: 0.5rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

h1 {
	font-size: 1.1rem;
	font-weight: 600;
	margin: 0 0 0.3rem;
	color: var(--color-theme-2, #4F8A8B);
	letter-spacing: 0.03em;
}

button.primary {
	background: var(--color-theme-1, #4F8A8B);
	color: #fff;
	border: none;
	border-radius: 6px;
	padding: 0.4em 1em;
	font-size: 1rem;
	margin-bottom: 0.5rem;
	cursor: pointer;
	transition: filter 0.15s;
}
button.primary:hover {
	filter: brightness(0.92);
}

nav {
	flex: 1 1 auto;
	overflow-y: auto;
	width: 100%;
}

ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

li {
	padding: 0.7em 0.4em 0.67em;
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	cursor: pointer;
	border-bottom: 1px solid #e4e9f3;
	border-radius: 4px;
	transition: background 0.12s;
}
li.active {
	background: linear-gradient(90deg, var(--color-theme-2, #FBD46D) 0 70%, transparent 80% 100%);
	color: #1f2e2e;
	font-weight: 700;
}
li.empty {
	color: #9aafbd;
	font-style: italic;
	cursor: default;
	border-bottom: none;
}
li .title {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	max-width: 140px;
	font-size: 1rem;
}
small {
	color: #adbaca;
	font-size: 0.84em;
	padding-left: 0.25em;
}
@media (max-width: 700px) {
	.sidebar {
		min-width: 0;
		max-width: none;
		width: 100vw;
		height: auto;
		border-right: none;
		border-bottom: 1px solid #e1e6f0;
		flex-direction: row;
		overflow-x: auto;
		overflow-y: hidden;
		position: static;
		padding: 0 0.5rem 0 0.5rem;
	}
	header {
		margin: 1rem 0.4rem 1rem 0;
	}
	nav {
		width: 100%;
	}
	ul {
		width: 100%;
		display: flex;
		overflow-x: auto;
		gap: 0.5rem;
	}
	li {
		display: block;
		min-width: 140px;
		border-bottom: 2px solid #eee;
		max-width: 220px;
		margin-bottom: 0.3rem;
	}
}
</style>
