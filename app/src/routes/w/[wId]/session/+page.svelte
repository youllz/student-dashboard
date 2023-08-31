<script lang="ts">
    import { Button, DatePicker, DatePickerInput, Modal, TextArea, TextInput, Tile } from 'carbon-components-svelte';
import type { PageData } from './$types';
	import { Label, User } from 'carbon-icons-svelte';
    import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { page } from '$app/stores';
	import type { RecordModel } from 'pocketbase';
    import {getDateOnly} from '$lib/uitils'
    
    export let data;


    let workspace: RecordModel 
    let allSession: RecordModel[] = []

    $: ({currentWorkspace} = data)
    $: ({allSessionsForCurrentWorkspace} = data)


    $: if(currentWorkspace !== undefined) {
        workspace = currentWorkspace
    }
    $: if(allSessionsForCurrentWorkspace !== undefined) {
        allSession = allSessionsForCurrentWorkspace
    }

    
    
    
    let open = false;



    const { form, enhance } = superForm(data.form, {
        onResult({result}) {
            console.log(result)

            switch (result.status) {
                case 204:
                    open = false

                    break;
            
                default:
                    break;
            }
        },
    });

</script>

<section>


  

    <div class="title">
        <h1>
            {workspace.name}
        </h1>
        <p>
            {workspace.description}
        </p>
        <small>{(workspace.beginning_of_the_year).split(' ')[0]} &nbsp; {(workspace.end_of_the_year).split(' ')[0]} </small>
    </div>
     <!-- <SuperDebug data={$form} /> -->
    <div class="container">
        
                {#if allSession.length !== 0}
                   <div class="session-container">
                    
                       <div class="header">
                            <span>
                                <User size={32} />
                            </span>
                           <h4>
                               Your session
                           </h4>
                       </div>
                       <div class="card-container">
                    {#each allSession as session}
                    <a href="/w/{$page.params.wId}/session/{session.id}">
                        <div>
                            <h5>
                                {session.name}
                            </h5>
                            <p>
                                {session.description}
                            </p>
                            <small>
                                {getDateOnly(session.beginning_of_the_session)} &nbsp; {getDateOnly(session.end_of_the_session)}
                            </small>
                        </div>
                    </a>
                    
                    {/each}
                   </div>


               
                   </div>
        
                    {:else}
                    
                    <h2>
                        your workspace is currently empty
                    </h2>
                    <div class="create-f-board">
                        <Button size="lg"  on:click={() => (open = true)}>
                            Create your first session
                        </Button>
                        <Modal passiveModal bind:open modalHeading="Create sessionn" on:open on:close style="flex-grow: 1">
                            <form use:enhance action="?/createSession" method="POST">
                                <DatePicker bind:valueFrom={$form.beginning_of_the_session} bind:valueTo={$form.end_of_the_session} datePickerType="range" on:change>
                                    <DatePickerInput name="beginning_of_the_session" labelText="Start date" placeholder="mm/dd/yyyy" />
                                    <DatePickerInput name="end_of_the_session" labelText="End date" placeholder="mm/dd/yyyy" />
                                  </DatePicker>
                                  <div>
                                    <label for="name">name</label>
                                    <TextInput bind:value={$form.name} type="text" required autocomplete="off" name="name" id="name" placeholder="name"/>
                                  </div>
                                  <div>
                                    <label for="description">description</label>
                                    <TextArea   bind:value={$form.description} autocomplete="off" name="description" id="description" placeholder="name"/>
                                  </div>
                                  <Button size="field" type="submit" style="flex-grow: 1;">
                                    Create
                                  </Button>
                            </form>
                    
                          </Modal>
                    </div>
                {/if}
    </div>
</section>


<style lang="scss">
.container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--cds-spacing-07);
}
    
section {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: var(--cds-spacing-05);
}

form {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: var(--cds-spacing-07);
    margin-top: var(--cds-spacing-05);
}

.title {
    width: 100%;
    min-height: 8rem;
    background-color: var(--cds-ui-01, #f4f4f4);
    padding: var(--cds-spacing-05, 1rem);
}

.session-container {
    // background-color: rebeccapurple;
    width: 100%;
} 

.header {
    display: flex;
    align-items: center;
    gap: var(--cds-spacing-02);
}

a {
    text-decoration: none;
}

.card-container {
    margin-top: var(--cds-spacing-07);
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: minmax(150px, auto);
    gap: var(--cds-spacing-05);
    // background-color: rebeccapurple;

    > a div {
        background-color: var(--cds-ui-02);
        padding: var(--cds-spacing-05, 1rem);
        color: var(--cds-text-01, #161616);
        
        &:hover {
            background-color: var(--cds-hover-ui);
        }

        h5 {
            font-size: 1.2rem;
            margin-bottom: var(--cds-spacing-05);
        }

        small {
            padding-top: var(--cds-spacing-03);
        }
    }


}

</style>