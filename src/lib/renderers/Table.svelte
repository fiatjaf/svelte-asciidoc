<script lang="ts">
  import {Table} from '@asciidoctor/core'

  import {getLineNumber} from '../utils'

  export let table: Table

  let classes = [
    'frame-' + table.getAttribute('frame', 'all', 'table-frame'),
    'grid-' + table.getAttribute('grid', 'all', 'table-grid')
  ]

  let stripes = table.getAttribute('stripes', null, 'table-stripes')

  if (stripes) {
    classes.push('stripes-' + stripes)
  }

  let autowidth = table.hasAutowidthOption()
  let tablewidth = table.getAttribute('tablepcwidth')
  let width: string | null = null

  if (autowidth && !table.hasAttribute('width')) {
    classes.push('fit-content')
  } else if (tablewidth == 100) {
    classes.push('stretch')
  } else {
    width = `${tablewidth}%`
  }

  if (table.hasAttribute('float')) classes.push(table.getAttribute('float'))
  if (table.getRole()) classes.push(table.getRole() || '')

  const rowCount = table.getRowCount()
  const columns = table.getColumns() as any
  const headRows = table.getHeadRows()
  const bodyRows = table.getBodyRows()
  const footRows = table.getFootRows()

  const title = table.getTitle()
  const id = table.getId()
  const slug = id || slugify(title || '')

  function cellProps(cell: Table.Cell) {
    return {
      colSpan: cell.getColumnSpan(),
      rowSpan: cell.getRowSpan(),
      className: getCellClass(cell),
      style: cell.getStyle()
    }
  }

  function getCellClass(cell: Table.Cell): string {
    return `tableblock halign-${(cell as any).getAttribute('halign')} valign-${(cell as any).getAttribute('valign')}`
  }

  function slugify(text: string): string {
    return text
      .toString() // Cast to string (optional)
      .normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string
      .replace(/[\u0300-\u036f]/g, '') // Removes the normalized accents the accents
      .toLowerCase() // Convert the string to lowercase letters
      .trim() // Remove whitespace from both sides of a string (optional)
      .replace(/\s+/g, '_') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/-$/g, '') // Remove trailing -
  }
</script>

<table
  class={'tableblock ' + classes.join(' ')}
  style:width={width ? width + 'px' : ''}
  {...getLineNumber(table)}
>
  {#if table.hasTitle()}
    <caption class="title">
      {#if !id}
        <!-- svelte-ignore a11y-missing-content -->
        <a class="anchor" id={slug}></a>
      {/if}
      <a href={`#${slug}`}>{table.getCaptionedTitle()}</a>
    </caption>
  {/if}

  {#if rowCount > 0}
    <colgroup>
      {#each columns as col}
        <col style="width: {col.getAttribute('colpcwidth')}%" />
      {/each}
    </colgroup>
  {/if}

  {#each headRows as row}
    <thead>
      <tr>
        {#each row as cell}
          <th class={getCellClass(cell)}>{@html cell.getText()}</th>
        {/each}
      </tr>
    </thead>
  {/each}

  <tbody>
    {#each bodyRows as row}
      <tr>
        {#each row as cell}
          {#if cell.getStyle() === 'asciidoc'}
            <td {...cellProps(cell)}>
              <div class="content">{@html cell.getContent() || ''}</div>
            </td>
          {:else if cell.getStyle() === 'literal'}
            <td {...cellProps(cell)}>
              <div class="literal">
                <pre>{@html cell.getContent() || ''}</pre>
              </div>
            </td>
          {:else if cell.getStyle() === 'header'}
            <th {...cellProps(cell)}>
              <p class="tableblock">{@html cell.getContent() || ''}</p>
            </th>
          {:else}
            <td {...cellProps(cell)}>
              {#each cell.getContent() as c}
                <p class="tableblock">{c}</p>
              {/each}
            </td>
          {/if}
        {/each}
      </tr>
    {/each}
  </tbody>

  {#each footRows as row}
    <tfoot>
      <tr>
        {#each row as cell}
          <td class={getCellClass(cell)}>
            <p class="tableblock">
              {@html cell.getText()}
            </p>
          </td>
        {/each}
      </tr>
    </tfoot>
  {/each}
</table>
