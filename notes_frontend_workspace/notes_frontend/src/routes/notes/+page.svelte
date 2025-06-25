<script lang="ts">
	import { notesStore, type Note } from '$lib/stores/notesStore';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let notes: Note[] = [];
	onMount(() => {
		notesStore.init();
		notesStore.subscribe(list => notes = list);
	});
	function openNote(id: string) {
		goto(`/notes/${id}`);
	}
	function newNote() {
		const note = notesStore.addNote('', '');
		goto(`/notes/${note.id}/edit`);
	}
</script>
<main class="notes-list-main">
	<header>
		<h2>All Notes</h2>
		<button class="primary" on:click={newNote}>+ New Note</button>
	</header>
	{#if notes.length === 0}
		<p class="empty">No notes found. Click "New Note" to create your first one!</p>
	{:else}
		<ul class="notes-list">
			{#each notes as note}
			<li on:click={() => openNote(note.id)}>
				<div>
					<span class="title">{note.title || "Untitled"}</span>
					<small>{new Date(note.updated_at).toLocaleDateString()}</small>
				</div>
				<span class="goto">→</span>
			</li>
			{/each}
		</ul>
	{/if}
</main>
<style>
.notes-list-main {
	max-width: 700px;
	margin: 0 auto;
	padding: 1.2em 0.5em;
}
header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.2em;
}
h2 {
	margin: 0;
}
button.primary {
	background: var(--color-theme-1, #4F8A8B);
	color: #fff;
	border: none;
	border-radius: 6px;
	padding: 0.45em 1.2em;
	font-size: 1rem;
	cursor: pointer;
	font-weight: 600;
}
.empty {
	color: #adadbd;
	text-align: center;
	font-style: italic;
	margin-top: 3em;
}
.notes-list {
	list-style: none;
	margin: 0;
	padding: 0;
}
.notes-list li {
	padding: 0.95em 0.8em;
	margin-bottom: 0.8em;
	background: var(--color-bg-1);
	box-shadow: 0 1.8px 5px #dde5ef28;
	border-radius: 6px;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: background 0.13s;
}
.notes-list li:hover, .notes-list li:focus {
	background: var(--color-theme-2, #FBD46D);
}
.notes-list .title {
	font-weight: 700;
	color: #424d52;
}
.goto {
	font-size: 1.3em;
	color: #bbb;
	padding-left: 0.5em;
}
small {
	font-size: 0.93em;
	color: #8fa2bb;
	padding-left: 0.7em;
}
</style>
