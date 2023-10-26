<template>
    <div class="node-trigger-only">
        <h1>Trigger</h1>
        <section class="form">
            <select df-triggerType v-model="triggerType">
                <option value="">-- select --</option>
                <option value="1">on message</option>
                <option value="2">on mention</option>
                <option value="3">on conversation expiry </option>
            </select>
        </section>
        <section class="info-block">
            <span v-if="triggerType > 0">
                {{ triggerType }}
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
        triggerType: "",
      }  
    },
    mounted() {
      this.$nextTick(() => {
        const id = this.$el.parentElement.parentElement.id;
        const data = this.$df.getNodeFromId(id.slice(5));
        this.triggerType = data.data.triggerType;
        console.log('TriggerOnly node-id=', id, 'data=', data, this.triggerType);
      });
    },
}
</script>

<style>

/* some node-specific style override here ... */


.drawflow .drawflow-node {
    background: #ebf1f2;
    padding: 0;
    width: auto;
	padding-bottom: 1rem;
}
.drawflow .drawflow-node.selected {
    background: #ebcece;
}

.drawflow .drawflow-node.selected .node-trigger-only h1 {
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

.drawflow .drawflow-node .input, 
.drawflow .drawflow-node .output {
    /* e.g. instead, we want this bigger and rounded */
    width: 25px;
    height: 25px;
    border-radius: 20%;
    border-width: 4px;
    border-color: #777;
}



</style>