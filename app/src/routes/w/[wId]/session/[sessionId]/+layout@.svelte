<script lang="ts">
	import {
		Header,
		SkipToContent,
		HeaderNav,
		HeaderNavItem,
		HeaderNavMenu,
		Breadcrumb,
		BreadcrumbItem,
		TooltipDefinition,
		Popover,
		Button,
		ButtonSet,
		TextInput,
		TextArea,
		Tabs,
		Tab,
		TabContent,
		HeaderUtilities,
		HeaderGlobalAction
	} from 'carbon-components-svelte';
	import type { LayoutData } from './$types';
	import {
		TrashCan,
		Close,
		Add,
		SettingsAdjust,
		OpenPanelFilledLeft,
		SidePanelClose
	} from 'carbon-icons-svelte';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { goto } from '$app/navigation';
	import type { RecordModel } from 'pocketbase';
	import { panelIsOpen } from '$lib/store';

	export let data;

	$: ({ matters } = data);

	let allMatters: RecordModel[] = [];
	let isSideNavOpen = false;
	let open = false;
	let ref: HTMLDivElement;
	let aside = true;

	$: if (matters !== undefined) {
		allMatters = matters;
	}

	const { form, enhance } = superForm(data.form, {
		invalidateAll: true,

		id: data.form.id,
		onResult({ result }) {
			switch (result.status) {
				case 204:
					open = !open;
					// goto(`/w/${$page.params.wId}/session/${$page.params.sessionId}/matter/$`)
					break;
			}
		}
	});
</script>

<Header bind:isSideNavOpen>
	<Button
		kind="ghost"
		iconDescription={$panelIsOpen ? 'close panel' : 'open panel'}
		icon={$panelIsOpen ? SidePanelClose : OpenPanelFilledLeft}
		on:click={() => ($panelIsOpen = !$panelIsOpen)}
	/>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderNav>
		<HeaderNavItem href="/" text="Link 1" />
		<HeaderNavItem href="/" text="Link 2" />
		<HeaderNavItem href="/" text="Link 3" />
		<HeaderNavMenu text="Menu">
			<HeaderNavItem href="/" text="Link 1" />
			<HeaderNavItem href="/" text="Link 2" />
			<HeaderNavItem href="/" text="Link 3" />
		</HeaderNavMenu>
	</HeaderNav>
	<!-- <HeaderUtilities>
        <HeaderGlobalAction aria-label="Settings" icon={OpenPanelFilledLeft} />
    </HeaderUtilities> -->
</Header>

<main>
	{#if $panelIsOpen}
		<aside>
			<div class="header">
				<div bind:this={ref} style:position="relative">
					<Button icon={Add} on:click={() => (open = !open)}>Add matter</Button>
					<Popover
						bind:open
						align="bottom-left"
						on:click:outside={({ detail }) => {
							open = ref.contains(detail.target);
						}}
					>
						<div class="aside-pop_container">
							<div class="content">
								<form use:enhance action="?/createMatter" method="POST">
									<div>
										<label for="name">Matter name</label>
										<TextInput
											bind:value={$form.name}
											type="text"
											name="name"
											id="name"
											placeholder="Matter name"
											required
											autocomplete="off"
										/>
									</div>
									<div>
										<label for="description">Matter name</label>
										<TextArea
											bind:value={$form.description}
											name="description"
											id="description"
											placeholder="Matter description"
											autocomplete="off"
										/>
									</div>

									<div class="footer">
										<ButtonSet>
											<Button
												on:click={() => (open = !open)}
												type="button"
												size="field"
												kind="secondary">Cancel</Button
											>
											<Button type="submit" size="field">Submit</Button>
										</ButtonSet>
									</div>
								</form>
							</div>
						</div>
					</Popover>
				</div>
			</div>
			<div class="matters-container">
				<ul>
					{#each allMatters as matter}
						<li
							class:focus={$page.url.pathname ===
								`/w/${$page.params.wId}/session/${$page.params.sessionId}/matter/${matter.id}`}
						>
							<a href="/w/{$page.params.wId}/session/{$page.params.sessionId}/matter/{matter.id}">
								{matter.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</aside>
	{/if}

	<section>
		<div class="header">
			<div>
				<Breadcrumb>
					<BreadcrumbItem href="/">
						<TooltipDefinition
							tooltipText="IBM Corporate Headquarters is based in Armonk, New York."
						>
							Dashboard
						</TooltipDefinition>
					</BreadcrumbItem>
					<BreadcrumbItem href="/reports">Annual reports</BreadcrumbItem>
					<BreadcrumbItem href="/reports/2019" isCurrentPage>2019</BreadcrumbItem>
				</Breadcrumb>
				<div />
			</div>
		</div>

		<div class="board-content">
			<slot><!-- optional fallback --></slot>
		</div>
	</section>
</main>

<style lang="scss">
	main {
		min-height: 100dvh;
		padding-top: 3rem;
		width: 100%;
		display: flex;
	}

	aside {
		width: 230px;
		height: auto;
		flex-shrink: 0;
		// background-color: var(--cds-layer);
		background-color: var(--cds-ui-01);
		border-right: 0.1px solid var(--cds-border-strong);

		.header {
			min-height: 6rem;
			padding: 1rem 2rem;
			border-bottom: 0.1px solid var(--cds-border-strong);
		}
	}

	section {
		flex-grow: 1;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;

		.board-content {
			flex-grow: 1;
			flex-shrink: 0;
		}
		.header {
			width: 100%;
			min-height: 6rem;
			// background-color: var(--cds-ui-01);
			// border-bottom: 0.1px solid var(--cds-border-strong);
			padding: 1rem 2rem;
		}
	}

	:global(.aside-pop_container) {
		width: 100%;
		min-height: 200px;

		.footer {
			width: 100%;
		}

		form {
			width: 100%;
		}

		.content form {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: var(--cds-spacing-07);
			padding: var(--cds-spacing-03);
			padding-top: var(--cds-spacing-05);

			> div {
				display: flex;
				flex-direction: column;
				gap: var(--cds-spacing-03);
			}
		}
	}

	.board-content {
		overflow-x: auto;
	}

	:global(.bx--btn-set button) {
		flex-grow: 1;
		flex-basis: 0;
	}

	.matters-container {
		width: 100%;

		ul {
			width: 100%;
			display: flex;
			flex-direction: column;
			// background-color: rebeccapurple;
		}

		li {
			width: 100%;
			// padding: 1rem;
			flex-grow: 1;
			flex-basis: 0;
			display: flex;
			flex-grow: 1;
			flex-basis: 0;
		}

		a {
			width: 100%;
			// display: inline;
		}
	}

	.focus {
		background-color: var(--cds-ui-02);
		a {
			color: var(--cds-link-02);
		}
	}
	a {
		text-decoration: none;
		color: var(--cds-text-02);
		padding: 1rem;
	}
</style>
