<script lang="ts">
	import { notesStore, type Note } from '../stores/notesStore';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { derived } from 'svelte/store';

	export let noteId: string;
	let editing = false;
	let foundNote: Note | undefined;
	let title = '';
	let content = '';
	let error = '';
	let notFound = false;

	notesStore.subscribe(list => {
		foundNote = list.find(n => n.id === noteId);
		if (foundNote) {
			title = foundNote.title;
			content = foundNote.content;
			notFound = false;
		} else {
			notFound = true;
		}
	});

	function edit() {
		editing = true;
	}

	function save() {
		if (!title.trim()) {
			error = "Title is required";
			return;
		}
		notesStore.updateNote(noteId, { title, content });
		editing = false;
		error = '';
	}
	function remove() {
		if (confirm('Delete this note?')) {
			notesStore.deleteNote(noteId);
			goto('/');
		}
	}
	function cancel() {
		if (foundNote) {
			title = foundNote.title;
			content = foundNote.content;
		}
		editing = false;
	}
</script>

{#if notFound}
	<div class="center-blank">
		<h2>Note not found</h2>
		<p>Sorry, this note does not exist.</p>
	</div>
{:else}
<div class="note-area">
	{#if editing}
	<form on:submit|preventDefault={save} class="note-form">
		<label>
			Title
			<input type="text" bind:value={title} maxlength="80" required placeholder="Note title"/>
		</label>
		<label>
			Content
			<textarea rows="9" bind:value={content} placeholder="Enter note body..." spellcheck="true"></textarea>
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
	{:else}
	<article class="note-display">
		<header>
			<h2>{title}</h2>
			<div class="note-meta">
				<span>Last updated: {foundNote && (new Date(foundNote.updated_at)).toLocaleString()}</span>
			</div>
		</header>
		<div class="note-content" style="white-space: pre-wrap;">{content || 'No content.'}</div>
		<div class="actions">
			<button class="primary" on:click={edit}>Edit</button>
			<button class="danger" on:click={remove}>Delete</button>
		</div>
	</article>
	{/if}
</div>
{/if}

<style>
.note-area {
	max-width: 760px;
	margin: 0 auto;
	box-sizing: border-box;
	width: 100%;
	padding: 2rem 0.5rem 1.5rem 0.5rem;
}
.center-blank {
	text-align: center;
	padding: 5em 0 4em 0;
	color: #748091;
	font-size: 1.15rem;
}
.note-form {
	display: flex;
	flex-direction: column;
	gap: 1em;
	background: var(--color-bg-1);
	border-radius: 7px;
	box-shadow: 0 2px 10px #dde5ef28;
	padding: 1.5em 1em 1.4em 1em;
}

.note-form label {
	font-size: 1.08rem;
	color: #4a5f7d;
	display: flex;
	flex-direction: column;
	gap: 0.4em;
	margin-bottom: 0.4em;
}
.note-form input[type="text"] {
	padding: 0.55em;
	border: 1px solid #cbe2ec;
	background: #f6fafc;
	border-radius: 4px;
	font-size: 1.08rem;
	margin-bottom: 0.25em;
}
.note-form textarea {
	padding: 0.75em;
	border: 1px solid #dbeafe;
	border-radius: 4px;
	font-family: inherit;
	font-size: 1rem;
	background: #f6fafc;
	min-height: 120px;
}
.actions {
	display: flex;
	flex-wrap: wrap;
	gap: 0.75em;
	margin-top: 1em;
}
button.primary {
	background: var(--color-theme-1, #4F8A8B);
	color: white;
	border: none;
	padding: 0.55em 1.3em;
	font-size: 1.05rem;
	cursor: pointer;
	border-radius: 5px;
	font-weight: 600;
}
button.secondary {
	background: #eef3fb;
	color: #283848;
	border: 1px solid #ccd4e0;
	padding: 0.5em 1.1em;
	border-radius: 5px;
}
button.danger {
	background: var(--color-accent, #F05D5E);
	color: white;
	border: none;
	padding: 0.5em 1em;
	border-radius: 5px;
	font-weight: 700;
	font-size: 0.97rem;
}
.error {
	color: #f05d5e;
	font-size: 1rem;
	font-weight: 700;
	margin-top: 0.7em;
}
.note-display {
	background: var(--color-bg-1);
	border-radius: 7px;
	padding: 1.7em 1.2em 1.6em;
	box-shadow: 0 2px 10px #dde5ef28;
	display: flex;
	flex-direction: column;
	gap: 0.7em;
}
.note-display header {
	margin-bottom: 0.5em;
}
.note-meta {
	font-size: 0.87em;
	color: #bbc3cb;
	margin-top: 0.25em;
}
.note-display h2 {
	margin: 0;
	color: var(--color-theme-2, #4075a6);
	letter-spacing: 0.02em;
}
.note-content {
	font-size: 1.08rem;
	color: #2c3647;
	padding: 0.56em 0 0.56em 0.1em;
}
@media (max-width: 700px) {
	.note-area {
		padding: 1em 0.2em;
	}
}
</style>
