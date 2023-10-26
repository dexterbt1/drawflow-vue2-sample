<template>
    <div class="node-sinktwo">
        <h1>
          <div class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
              <path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"></path>
            </svg>
          </div>
          <span class="title-text">Sink 2</span>
        </h1>
        <section class="info-block">
          <p>
            take two inputs only, no further outputs
          </p>
        </section>
    </div>
</template>

<script>
export default {
    name: 'SinkTwoInp',
    methods: {
      // note, we've turned these into metadata methods
      INPUTS_COUNT() { return 2 },
      OUTPUTS_COUNT() { return 0 },
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
.drawflow .drawflow-node.selected.SinkTwoInp h1 {   /* uses the vue component name */
    background: #fcebf8;
}
.drawflow .drawflow-node.SinkTwoInp h1 {
    margin: 0;
    padding: 10px;
    font-family: 'Courier New', monospace;
    font-size: 22px;
    background: #eff0e4;
    background: #faf8f0;
    border-bottom: 2px solid #444;

    .logo {
      float: left;
    }
    .title-text {
      display: inline-block;
      margin-left: 37px;
    }
}

.node-sinktwo {
  .info-block {
    padding: 15px;
    text-wrap: wrap;
  }
}


</style>