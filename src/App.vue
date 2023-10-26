<template>
	<div id="app">
	  <header class="top-toolbar">
		<select v-model="selectedNodeType">
            <option value="">-- select --</option>
            <option value="trigger">Trigger</option>
            <option value="pipe">Pipe</option>
            <option value="output">Output</option>
		</select>
		<button @click="addNodeX">Add Node</button>
		<div style="float: right">
			<button @click="exportDF">Export</button>
			<button @click="importDF">Import</button>
		</div>
	  </header>
	  <div id="drawflow"></div>
	</div>
</template>

<style scoped>
  #app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
  }
  header.top-toolbar {
	padding: 10px;
	box-shadow: 3px 5px 20px #8883;
  }
  header.top-toolbar select {
	width: 15rem;
	margin: 0 7px 0 3px;
  }

  #drawflow {
	text-align: initial;
	position: relative;
	width: calc(100% - 80px - 2px); 
	height: calc(100vh - 90px);
	height: calc(100dvh - 90px);
	margin: 15px 40px 0;
	border: 1px solid #bbb;
	border-radius: 5px;
  }
</style>
  

<script>
  /*eslint-disable */
  import Drawflow from 'drawflow'
  import styleDrawflow from 'drawflow/dist/drawflow.min.css'

  import TriggerOnly from './components/nodes/TriggerOnly.vue'
  import HelloWorld from './components/HelloWorld.vue'
  import HelloWorld2 from './components/HelloWorld2.vue'
  import Vue from 'vue'

  const nodesSelectionMap = {
  	'trigger': { klass: TriggerOnly },
  };
  
  
  export default {
	name: 'App',
	components: {
	  TriggerOnly,
	  HelloWorld,
	  HelloWorld2
	},
	data() {
	  return {
	    greeting: 'hello world',
		exportValue: null,
		selectedNodeType: '',
	  };
	},
	mounted() {
	  // init
	  const id = document.getElementById("drawflow");
	  Vue.prototype.$df = new Drawflow(id, Vue, this);
	  
	  // the act of registering is a mapping of the String name to the class and default attrs/props
	  // this should be done during mounted() time
	  this.$df.registerNode('TriggerOnly', TriggerOnly, {select_type: "1"}, {});
	  this.$df.registerNode('HelloWorld', HelloWorld, {select_type: "2"}, {});
	  this.$df.registerNode('HelloWorld2', HelloWorld2,{}, {});

	  // required
	  this.$df.start();

	  // initial configuration of nodes ... do it here
	  this.$df.addNode('HelloWorld', 0, 1, 150, 300, 'HelloWorld', {select_type: "1"}, 'HelloWorld', 'vue');
	},
	methods: {
	  exportDF() {
		this.exportValue = this.$df.export();
		console.log(this.exportValue);
	  },
	  importDF() {
		this.$df.import(this.exportValue);
	  },
	  addNodeX() {
		if (this.$data.selectedNodeType.length <= 0) { return; }
		console.log('selectedNodeType to add', this.$data.selectedNodeType);
	  },
	  addnodedf() {
		this.$df.addNode('HelloWorld', 0, 1, 150, 300, 'HelloWorld', {select_type: "1"}, 'HelloWorld', 'vue');
	  },
	   addnodedf2() {
		this.$df.addNode('HelloWorld2', 1, 1, 150, 300, 'HelloWorld2', {select_type: "2"}, 'HelloWorld2', 'vue');
	  }
  
	}
  
  }
</script>
  