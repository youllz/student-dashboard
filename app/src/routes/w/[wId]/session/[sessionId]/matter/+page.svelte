<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, enhance } = superForm(data.form, {
		invalidateAll: true,

		id: data.form.id,
		onResult({ result }) {
			console.log($form);
			switch (result.status) {
				case 204:
					// goto(`/w/${$page.params.wId}/session/${$page.params.sessionId}/matter/$`)
					break;
			}
		}
	});
</script>
