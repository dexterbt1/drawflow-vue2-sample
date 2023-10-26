<template>
    <div>
       <select df-select_type @change="onMyChange">
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
    name: 'HelloWorld',
    props: {
        select_type: String,
    },
    methods: {
        'onMyChange': function () {
            console.log(`New select type: ${this.select_type}`, this);
        },
    }
}
</script>