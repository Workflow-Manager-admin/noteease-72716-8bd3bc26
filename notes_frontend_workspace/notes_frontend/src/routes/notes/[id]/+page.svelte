<script lang="ts">
	import NoteView from '$lib/components/NoteView.svelte';
	import { notesStore } from '$lib/stores/notesStore';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data;
	let id = data.id;

	onMount(() => {
		notesStore.init();
	});
</script>
<NoteView noteId={id}/>
