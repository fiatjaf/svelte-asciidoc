<script lang="ts">
  export interface Props {
    node: any
  }

  let {node = $bindable()}: Props = $props()
  node.noop = 3
</script>

<hr />
