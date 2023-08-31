<script lang="ts">
	import { Header, SkipToContent, HeaderNav, HeaderNavItem, HeaderNavMenu,  Breadcrumb, BreadcrumbItem, TooltipDefinition, Popover, Button, ButtonSet, TextInput, TextArea } from 'carbon-components-svelte';
    import type { LayoutData } from './$types';
	import { TrashCan, Close, Add } from 'carbon-icons-svelte';
    
    export let data: LayoutData;



    let isSideNavOpen = false;
    let open = true;
    let ref:HTMLDivElement;

</script>

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


  <main>
    <aside>
        <div class="header">
            <div  bind:this={ref}  style:position="relative"> 
                <Button icon={Add} on:click={() => (open = !open)}>Add matter</Button>
                <Popover
                  bind:open
                  align="bottom-left"
                  on:click:outside={({ detail }) => {
                    console.log("on:click:outside");
                    open = ref.contains(detail.target);
                  }}
                >
                  <div class="aside-pop_container" >
                    <div class="content">
                        <form action="?/createMatter" method="POST">
                            <div>
                                <label for="name">Matter name</label>
                                <TextInput type="text" name="name" id="name" placeholder="Matter name" required autocomplete="off"/>
                            </div>
                            <div>
                                <label for="description">Matter name</label>
                                <TextArea  name="description" id="description" placeholder="Matter description" autocomplete="off"/>
                            </div>
                            
                            <div class="footer">
                                <ButtonSet >
                                    <Button type="button" size="field" kind="secondary">Cancel</Button>
                                    <Button type="submit" size="field" >Submit</Button>
                                </ButtonSet>
                            </div>
                        </form>
                        </div>
                    </div>
                </Popover>
            </div>
        </div>
    </aside>
    
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
        width: 248px;
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
            background-color: var(--cds-ui-01);
            border-bottom: 0.1px solid var(--cds-border-strong);
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

            >  div {
                display: flex;
                flex-direction: column;
                gap: var(--cds-spacing-03);
            }
        }

        

       
    }

    :global(.bx--btn-set button) {
        flex-grow: 1;
        flex-basis: 0;
    }
  </style>
  
  