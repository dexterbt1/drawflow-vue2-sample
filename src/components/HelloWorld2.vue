<template>
    <div>
        <h2>Hello World2</h2>
       <select df-select_type v-model="select_type">
                <option value="">Select</option>
                <option value="1">Select type 1</option>
                <option value="2">Select type 2</option>
                <option value="3">Select type 3</option>
              </select>
              <div v-if="select_type">
                <p>Select type: {{ select_type }}</p>
              </div>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld2',
    data() {
        return {
            select_type: false,
        }
    },
    mounted() {
        this.$nextTick(() => {
            const id = this.$el.parentElement.parentElement.id;
            const data = this.$df.getNodeFromId(id.slice(5));
            this.select_type = data.data.select_type;
        });
    },
}
</script>