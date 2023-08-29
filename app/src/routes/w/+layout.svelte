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
    TreeView,
  } from "carbon-components-svelte";
    export let data;


     let isSideNavOpen = false;
     
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

<Content>
  <Grid>
    <Row>
      <Column>
        <h1>Welcome</h1>
        <h2>world</h2>
      </Column>
    </Row>
  </Grid>
</Content>  

<slot/>

