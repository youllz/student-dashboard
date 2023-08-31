<script lang="ts">
     import {
    Header,
    HeaderNav,
    HeaderNavItem,
    HeaderNavMenu,
    SkipToContent,
    Content,
    Grid,
    Row,
    Column,
    Accordion, AccordionItem, 
    Breakpoint,
    Button,
    Link,
    Tile,
    Modal,
    FluidForm,

	TextInput,

	TextArea,
  DatePicker, DatePickerInput


  } from "carbon-components-svelte";
  import {Add, CicsSystemGroup } from 'carbon-icons-svelte'
  import { superForm } from 'sveltekit-superforms/client';
  import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { RecordModel } from "pocketbase";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

    export let data;


    $: ({allWorksapces} = data)
    let allWorksapcesData: RecordModel[] = [] 
    
   $: if(allWorksapces !== undefined) {
      allWorksapcesData = allWorksapces
    }
    
    
    type BreakpointSize = "sm" | "md" | "lg" | "xlg" | "max";

     let isSideNavOpen = false;
     let open = false;


  let size:BreakpointSize;
  let events:any = [];


  const { form, enhance } = superForm(data.form, {
    invalidateAll: true,
    onResult({result}) {
      console.log(result)
     switch (result.status) {
      case 204:
        open = false
        goto(`/w/${result.data.workspaceId.id}/session`,{replaceState: true})
        break;
     
      default:
        break;
     }
    },
  });

  

</script>

<Breakpoint bind:size on:change={(e) => (events = [...events, e.detail])} />
  
  <Header company="IBM" platformName="Carbon Svelte" bind:isSideNavOpen>
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
  </Header>
  
  <Content >
  <!-- <SuperDebug data={$form} /> -->
  <div class="content">
      <Grid padding>
        <Row>
        {#if size !== 'md' && size !== 'sm'}
            <Column sm={1} md={1} lg={3} >
              <div>
                <Tile>
                  <div class="title">
                    <span>Worksapces</span>

                    <Button size="small" kind="tertiary" iconDescription="add new workspace" icon={Add} on:click={() => (open = true)}/>
                    <Modal passiveModal  bind:open modalHeading="Add new workspace" on:open on:close>
                     <div class="add-w">
                      <form use:enhance action="/w?/createWorkspace" method="POST">
                        <header>
                          <h2>
                            Let's build a Workspace
                          </h2>
                          <p>
                            Boost your productivity by making it easier for everyone to access boards in one location.
                          </p>
                        </header>
                        <DatePicker datePickerType="range" bind:valueFrom={$form.beginning_of_the_year} bind:valueTo={$form.end_of_the_year} on:change>
                         <DatePickerInput   labelText="Start date" name="beginning_of_the_year" autocomplete="off" required placeholder="mm/dd/yyyy" />
                         <DatePickerInput   labelText="End date" name="end_of_the_year" autocomplete="off" required placeholder="mm/dd/yyyy" />
                       </DatePicker>
                       <TextInput bind:value={$form.name} type="text" name="name" required autocomplete="off" labelText="workspace name"/>
                       <div class="text-area"><TextArea bind:value={$form.description} labelText="" name="description" placeholder="Enter a description..." /></div>
                      <Button type="submit" size="field" style="width: 100%; justify-content: center;">
                        Continue
                      </Button>
                      </form>

                     </div>
                    </Modal>
                  </div>
                  
                </Tile>
                <Accordion size="sm">
                {#each allWorksapcesData as item}
               
                  <AccordionItem title={item.name} >
                    <Button kind={$page.url.pathname === `/w/${item.id}/session`? 'secondary' : 'ghost'} size="field" icon={CicsSystemGroup} href="/w/{item.id}/session" style="width: 100%;">
                      
                      <span>session</span>
                    </Button>
                  
                   <!-- <Button href="" kind="ghost" style="width: 100%;">
                    session
                   </Button> -->
                  </AccordionItem>
                  <!-- <AccordionItem title="Natural Language Understanding">
                    <p>
                      Analyze text to extract meta-data from content such as concepts, entities,
                      emotion, relations, sentiment and more.
                    </p>
                  </AccordionItem>
                  <AccordionItem title="Language Translator">
                    <p>
                      Translate text, documents, and websites from one language to another.
                      Create industry or region-specific translations via the service's
                      customization capability.
                    </p>
                  </AccordionItem> -->
                  {/each}
                </Accordion>
              </div>
            </Column>
        {/if}
          <Column sm={4} md={8} lg={13} >
           
            <slot/>
          </Column>
        </Row>
      </Grid>
  </div>
</Content>  


<style lang="scss">
  :global(.bx--accordion__content) {
    padding: 0;
    padding-left: 8px;
  }
  
 .title {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
 }

 .add-w {
  width: 100%;
  height: 100%;

  .text-area {
    width: 100%;
    height: auto;
    position: relative;
  }

  header {
    margin-bottom: var(--cds-spacing-09);

    h2 {
      margin-bottom: var(--cds-spacing-05);
    }
  }

 }
</style>

