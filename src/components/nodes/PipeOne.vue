<template>
    <div class="node-pipe-one">
        <h1>Pipe One</h1>
        <section class="info-block">
            one input, one output
        </section>
    </div>
</template>

<script>
export default {
    name: 'PipeOne',
    methods: {
      // note, we've turned these into metadata methods
      INPUTS_COUNT() { return 1 },
      OUTPUTS_COUNT() { return 1 },
    },
    data() {
      return {
        // no data, purely sample

        // NOTE: findings, current Drawflow implem .data uses snake_case naming convention when exporting/importing ...
        //       avoid other cases (camelCase, ALL_CAPs, WeiRD_CApping, etc)
      }  
    },
    mounted() {
      this.$nextTick(() => {
        // for init, called once, to capture on mount
        // use this to initialize especially during import()
      });
    },
}
</script>

<style>
/*
    IMPORTANT
        you cannot do scoped styles, as the .drawflow-node is shared across the entire canvas;
        some node-specific style override here, make sure to put a specific class name (component name or css-class)
        if these are repeated, these may be refactored into their own scss
*/

.drawflow .drawflow-node.PipeOne {   /* uses the vue component name */
  width: 130px;
}

.drawflow .drawflow-node.selected.PipeOne h1 {   
    background: #fcebf8;
}
.drawflow .drawflow-node.PipeOne h1 {
    margin: 0;
    padding: 2px 10px;
    font-family: 'Courier New', monospace;
    font-size: 1rem;
    background: #eff0e4;
    border-bottom: 1px solid #aaa;
}

.node-pipe-one {
  .info-block {
    padding: 15px;
    text-wrap: wrap;
  }
}


</style>