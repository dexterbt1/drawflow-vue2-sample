<template>
    <div class="node-trigger-only">
        <h1>Trigger</h1>
        <section class="form">
            <select df-trigger_type v-model="trigger_type">
                <option value="">-- select --</option>
                <option value="1">on message</option>
                <option value="2">on mention</option>
                <option value="3">on conversation expiry </option>
            </select>
        </section>
        <section class="info-block">
            <span v-if="trigger_type > 0">
                {{ trigger_type }}
            </span>
        </section>
    </div>
</template>

<script>

export default {
    name: 'TriggerOnly',
    methods: {
      // note, we've turned these into metadata methods
      INPUTS_COUNT() { return 0 },
      OUTPUTS_COUNT() { return 1 },
    },
    data() {
      return {
        // NOTE: findings, current Drawflow implem .data uses snake_case naming convention when exporting/importing ...
        //       avoid other cases (camelCase, ALL_CAPs, WeiRD_CApping, etc)
        trigger_type: "",
      }  
    },
    mounted() {
      // for init, called once, to capture on mount
      // use this to initialize especially during import()
      this.$nextTick(() => {
        const id = this.$el.parentElement.parentElement.id;
        const d = this.$df.getNodeFromId(id.slice(5));
        this.trigger_type = d.data.trigger_type;
        console.log('TriggerOnly node-id=', id, 'data=', d.data, this.trigger_type);
      });
    },
}
</script>

<style > 
/*
    IMPORTANT
        you cannot do scoped styles, as the .drawflow-node is shared across the entire canvas;
        some node-specific style override here, make sure to put a specific class name (component name or css-class)
        if these are repeated, these may be refactored into their own scss
*/

.drawflow .drawflow-node.selected .node-trigger-only h1 {  /* uses css-class */
    background: #fcebf8;
}

.node-trigger-only h1 {
    margin: 0;
    padding: 5px;
    font-size: 1.4rem;
    background: #ebf6fc;
    border-bottom: 2px solid #444;
}
.node-trigger-only {
    margin: 0;

    .form {
        padding: 15px;
    }
    .info-block {
        padding: 15px;
    }

}



</style>