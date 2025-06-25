<script lang="ts">
	import { onMount } from 'svelte';
	import { notesStore, type Note } from '$lib/stores/notesStore';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data;
	let id = data.id;
	let foundNote: Note | undefined;
	let title = '';
	let content = '';
	let error = '';
	let loaded = false;

	function save() {
		if (!title.trim()) {
			error = "Title is required";
			return;
		}
		notesStore.updateNote(id, { title, content });
		goto(`/notes/${id}`);
	}

	function cancel() {
		goto(`/notes/${id}`);
	}

	function remove() {
		if (confirm('Delete this note?')) {
			notesStore.deleteNote(id);
			goto('/');
		}
	}

	onMount(() => {
		notesStore.init();
		const unsub = notesStore.subscribe(notes => {
			foundNote = notes.find(n => n.id === id);
			if (foundNote) {
				title = foundNote.title;
				content = foundNote.content;
			}
			loaded = true;
		});
	});
</script>
{#if loaded && foundNote}
<form on:submit|preventDefault={save} class="note-form">
	<label>
		Title
		<input type="text" bind:value={title} maxlength="80" required placeholder="Note title"/>
	</label>
	<label>
		Content
		<textarea rows="11" bind:value={content} placeholder="Enter note body..." spellcheck="true"></textarea>
	</label>
	{#if error}
	<div class="error">{error}</div>
	{/if}
	<div class="actions">
		<button type="submit" class="primary">Save</button>
		<button type="button" class="secondary" on:click={cancel}>Cancel</button>
		<button type="button" class="danger" on:click={remove}>Delete</button>
	</div>
</form>
{:else if loaded}
<div class="center-blank">
	<h2>Note not found</h2>
	<p>This note does not exist.</p>
</div>
{/if}
<style>
@import '$lib/components/NoteView.svelte';
/* Use same form/center-blank styles as NoteView.svelte */
</style>
