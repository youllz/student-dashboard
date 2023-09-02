<script lang="ts">
	import { Tabs, Tab, TabContent,  DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    ToolbarMenu,
    ToolbarMenuItem,
    Button,Modal, Popover, Link, TextInput, NumberInput, Select, SelectItem, TextArea, DatePicker, DatePickerInput, ButtonSet } from 'carbon-components-svelte';
    // import Chart from 'chart.js/auto';

    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
	import { Launch } from 'carbon-icons-svelte';
	import { getDateOnly } from '$lib/uitils';
	import { panelIsOpen } from '$lib/store';
	import { page } from '$app/stores';
	import Line from '$lib/components/Line.svelte';
    
    export let data: PageData;

    // $:console.log(data)

    $: ({allNote} = data)
    
    $: currentMatter = data.matters?.find((item) => item.id === $page.params.matterId)

    // interface DataTableOjec {
    //     id: string,
    //     note: number,
    //     type: string,
    //     factor: number,
    //     description: string,
    //     date: string
    // }


    
    let addNoteFormEl:HTMLFormElement
    let addNotePop:HTMLDivElement
    let addNoteModal = false
    let notefactor: number
    let type: string


    const {
       form,
       enhance 
      } = superForm(data.addNoteForm, {
      id: data.addNoteForm.id,
      resetForm: true
    });


    let chart: HTMLCanvasElement


    // let dataTable: DataTableOjec[] = []
    // $: if(allNote !== undefined) {
      
    //   let dataTable = allNote?.map((item) => {
    //    return {
    //     id: item.id,
    //     note: item.note,
    //     type: item.type,
    //     factor: item.factor,
    //     description: item.description,
    //     date: item.date
  
    //    }
    //   })

    // }
    
    let filteredRowIds: any[] = [];
    
</script>

<section>

  <div class="note-container">
   <div class="note-header">
      <div class="note-header-content">
        <h2>Notes</h2>
        <h3>
        {currentMatter?.name }
        </h3>
        <p>{currentMatter?.description} </p>
      </div>
      <div class="modal-container">
        <Button kind="tertiary" on:click={() => (addNoteModal = true)}>Add note</Button>

        <Modal passiveModal
        bind:open={addNoteModal}
        modalHeading="Create database"
        primaryButtonText="Confirm"
        secondaryButtonText="Cancel"
       
        on:open
        on:close
        
      >
        <p>Create a new Cloudant database in the US South region.</p>
        <br />
        <form action="?/addNote" bind:this={addNoteFormEl} method="POST" use:enhance>
          <div>
            <DatePicker datePickerType="single"  bind:value={$form.date} on:change >
              <DatePickerInput name="date" labelText="date" required placeholder="mm/dd/yyyy" />
            </DatePicker>
          </div>

          <div>
            <NumberInput
            label="note"
              placeholder="Enter note off matter"
              name="note"
              min={0}
              max={20}
              required
              bind:value={$form.note}
            />
          </div>
          <div>
            <NumberInput
            label="Factor"
              placeholder="Enter note off matter"
              name="Factor"
              required
              value={1}
              min={1}
              max={5}

            />
          </div>

          <div>
            <Select
  labelText="Type note"
  required
  name="type"
  bind:selected={$form.type}
  helperText="Carbon offers 4 themes (2 light, 3 dark)"
  on:change={(e) => {
 
  }}
>
  <SelectItem  value="homework" text="homework" />
  <SelectItem  value="school question" text="school question" />
  <SelectItem  value="exam" text="exam" />
</Select>
  <!-- <input type="hidden" name="type" bind:value={$form.type} > -->
          </div>
          


          <div>
            <TextArea bind:value={$form.description} labelText="descrption" name="description"/>

          </div>



         
         
          <div>
            <ButtonSet>
              <Button type="button" kind="secondary">Cancel</Button>
              <Button type="submit">Submit</Button>
            </ButtonSet>
          </div>
        </form>
      </Modal>
      </div>
      <div>
      </div>

  </div>
<div class="table-container" style="--h: {$panelIsOpen? '283px' : '33px'}">
  <DataTable
    headers={[
      { key: "note", value: "Note", },
      { key: "type", value: "Type",  },
      { key: "factor", value: "Factor" },
      { key: "description", value: "description", width: '30%'  },
      { key: "date", value: "Date",  },
    ]}
    rows={allNote?.map((item) => {
      return {
       id: item.id,
       note: item.note,
       type: item.type,
       factor: item.factor,
       description: item.description,
       date: getDateOnly(item.date)
  
      }
     })}
  >
  
    <svelte:fragment slot="cell-header" let:header>
      {#if header.key === "port"}
        {header.value} (network)
      {:else}
        {header.value}
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="cell" let:row let:cell>
      {#if cell.key === "rule" && cell.value === "Round robin"}
        <Link
          icon={Launch}
          href="https://en.wikipedia.org/wiki/Round-robin_DNS"
          target="_blank">{cell.value}</Link
        >
      {:else}
        {cell.value}
      {/if}
    </svelte:fragment>
    <Toolbar>
      <ToolbarContent>
        <ToolbarSearch
          persistent
          value=""
          shouldFilterRows
          bind:filteredRowIds
        />
      </ToolbarContent>
    </Toolbar>
  </DataTable>
</div>

   </div>

   <div class="chart-container">
      <div class="chart-container-header">
        <h1>
          Satistic
        </h1>
        <div>
          <Select
  labelText="Chart"
  selected="g10"
  on:change={(e) => console.log("value", e)}
>
  <SelectItem value="white" text="White" />
  <SelectItem value="g10" text="Gray 10" />
  <SelectItem value="g80" text="Gray 80" />
  <SelectItem value="g90" text="Gray 90" />
  <SelectItem value="g100" text="Gray 100" />
</Select>
        </div>
      </div>

      <div class="chart-content">
        <Line/>
        <div class="chart-number">
          <div class="chart-number-content">
            <div>
              <span>
                highest note
              </span>
              <div class="__content">
                <div>
                  <span>
                    Note: &nbsp;
                  </span>
                  <span>
                    15
                  </span>
                </div>
                <div>
                  <span>Type: &nbsp;</span>
                  <span>exam</span>
                </div>
                <div>
                  <span>
                    Factor: &nbsp;
                  </span>
                  <span>
                    2
                  </span>
                </div>
            </div>
            </div>
            <div>
              <span>
                highest note
              </span>
              <div class="__content">
                <div>
                  <span>
                    Note: &nbsp;
                  </span>
                  <span>
                    15
                  </span>
                </div>
                <div>
                  <span>Type: &nbsp;</span>
                  <span>exam</span>
                </div>
                <div>
                  <span>
                    Factor: &nbsp;
                  </span>
                  <span>
                    2
                  </span>
                </div>
            </div>
            </div>
            <div>
            </div>
          </div>
          <div class="moyen">
            <span>
              Average
            </span>
          </div>
        </div>
      </div>
   </div>
   

</section>


<style lang="scss">
  section {
    width: 100%;
    min-height: 20rem;
    /* background-color: red; */
    padding:1rem;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5vw;
  }

  .note-container {
    width: 95%;
  }

  .note-header {
    min-height: 6rem;
    width: 100%;
    background-color: var(--cds-ui-01);
    padding: 1rem;

  }
  .note-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    // background-color: red;

    div:first-child {
      flex-basis: 400px;
      // background-color: red;
    }
   

  }
  
  .modal-container {
    // background-color: rebeccapurple;
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-basis: 0;

    form > div {
      margin-top: var(--cds-spacing-05);
    }
  }
 
  .table-container {
    max-width: calc(100dvw - var(--h));
    width: 100%;
  }

  .chart-container {
        width: 95%;
        height: auto;

        .chart-container-header {
          width: 100%;
          background-color: var(--cds-ui-01);
          min-height: 6rem;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
          
        }

        .chart {
          width: 100%;
        }

        .chart-content {
          width: 100%;
          display: flex;
        }

        .chart-number {
          flex-basis: 30rem;
        }

        .chart-number-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 5rem;

          > div {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .__content {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(100px, auto));
            gap: 1rem;
          }
        }
    }

    
</style>
