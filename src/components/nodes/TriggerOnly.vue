<template>
    <div class="node-trigger-only">
        <h1>Trigger</h1>
        <select df-select_type @change="onMyChange">
            <option value="">-- select --</option>
            <option value="1">on message</option>
            <option value="2">on mention</option>
            <option value="3">on conversation expiry </option>
        </select>
        <div v-if="select_type">
            <p>Select type: {{ select_type }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TriggerOnly',
    props: {
        select_type: String,
    },
    methods: {
        getConfig: function() {
            return { inputs: 0, outputs: 1 };
        },
        onMyChange: function() {
            console.log('TriggerOnly onMyChange()', this, this.select_type);
        },
    }
}
</script>

<style scoped>
.node-trigger-only h1 {
    border: 1px solid red;
    padding: 5px;
}

</style>