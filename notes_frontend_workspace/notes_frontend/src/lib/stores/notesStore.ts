import { writable } from 'svelte/store';

export interface Note {
	id: string;
	title: string;
	content: string;
	created_at: string;    // ISO Date string
	updated_at: string;    // ISO Date string
}

/**
 * Get notes from localStorage for persistence.
 */
function getStoredNotes(): Note[] {
	const stored = localStorage.getItem('notes');
	if (!stored) return [];
	try {
		const arr = JSON.parse(stored) as Note[];
		if (Array.isArray(arr)) return arr;
		return [];
	} catch {
		return [];
	}
}

/**
 * Store notes to localStorage.
 */
function storeNotes(notes: Note[]) {
	localStorage.setItem('notes', JSON.stringify(notes));
}

// PUBLIC_INTERFACE
/**
 * Svelte store that manages all notes, supports CRUD operations and persists to localStorage.
 */
function createNotesStore() {
	const { subscribe, set, update } = writable<Note[]>([]);
	let initialized = false;

	function init() {
		if (!initialized) {
			const notes = getStoredNotes();
			set(notes);
			initialized = true;
		}
	}

	return {
		subscribe,
		init,
		// PUBLIC_INTERFACE
		addNote: (title: string, content: string) => {
			const now = new Date().toISOString();
			const newNote: Note = {
				id: Math.random().toString(36).slice(2, 12) + '-' + Date.now(),
				title: title || 'Untitled',
				content: content || '',
				created_at: now,
				updated_at: now
			};
			update(notes => {
				const n = [newNote, ...notes];
				storeNotes(n);
				return n;
			});
			return newNote;
		},
		// PUBLIC_INTERFACE
		updateNote: (id: string, data: Partial<Omit<Note, 'id' | 'created_at'>>) => {
			const now = new Date().toISOString();
			update(notes => {
				const n = notes.map(note =>
					note.id === id
						? { ...note, ...data, updated_at: now }
						: note
				);
				storeNotes(n);
				return n;
			});
		},
		// PUBLIC_INTERFACE
		deleteNote: (id: string) => {
			update(notes => {
				const n = notes.filter(note => note.id !== id);
				storeNotes(n);
				return n;
			});
		},
		// PUBLIC_INTERFACE
		getNote: (id: string): Note | undefined => {
			let note: Note | undefined;
			update(notes => {
				note = notes.find(n => n.id === id);
				return notes;
			});
			return note;
		},
		// PUBLIC_INTERFACE
		setNotes: (notes: Note[]) => {
			set(notes);
			storeNotes(notes);
		},
		// PUBLIC_INTERFACE
		reset: () => {
			set([]);
			storeNotes([]);
		}
	};
}

export const notesStore = createNotesStore();

