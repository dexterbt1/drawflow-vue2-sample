<template>
	<div id="app">
	  <nav class="top-toolbar">
		<select v-model="selectedNodeType">
            <option value="">-- select --</option>
			<option v-for="nsmv in NodesSelectionMap" v-bind:value="nsmv.selfKey">{{ nsmv.displayName }}</option>
		</select>
		<button @click="addNodeX">Add Node</button>
		<div style="float: right">
			<button @click="exportDF">Export</button>
			<button @click="importDF">Import</button>
		</div>
	  </nav>
	  <div id="drawflow"></div>
	</div>
</template>

<style scoped>
  #app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
  }
  nav.top-toolbar {
	padding: 10px;
	box-shadow: 3px 5px 20px #8883;
  }
  nav.top-toolbar select {
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

  // FIXME: quite a monolith example - might need refactor and design this in their proper classes, components, etc 


  /*eslint-disable */

  import Vue from 'vue'

  import Drawflow from 'drawflow'

  import TriggerOnly from './components/nodes/TriggerOnly.vue'
  import PipeOne from './components/nodes/PipeOne.vue'
  import SinkTwoInp from './components/nodes/SinkTwoInp.vue'

  const NODES_SELECTION_MAP = {
	'trigger': { 
		selfKey: 'trigger',   // reverse lookup
		displayName: 'Trigger',
		nodeType: 'TriggerOnly', 
		nodeModule: TriggerOnly, 
		defaultProps: { 
			triggerType: "1",
		}, 
		defaultOptions: {
			testOptionHere: "hi there",
			moreOptComplex: { foo: ['bar', 1234] },
		},
	},
	'pipe-one': {
		selfKey: 'pipe-one',   // reverse lookup
		displayName: 'Pipe One',
		nodeType: 'PipeOne', 
		nodeModule: PipeOne, 
		defaultProps: { 
		}, 
		defaultOptions: {
		},
	},
	'sink-two': {
		selfKey: 'sink-two',   // reverse lookup
		displayName: 'Sink Two',
		nodeType: 'SinkTwoInp', 
		nodeModule: SinkTwoInp,
		defaultProps: { 
		}, 
		defaultOptions: {
		},
	},
  };

  export default {

	name: 'App',

	components: { 
	  //TriggerOnly,
	  // ... ??
	},

	data() {
	  return {
		NodesSelectionMap: NODES_SELECTION_MAP,  // needed to render the dropdown
		exportValue: null,
		selectedNodeType: '',
	    sampleGreeting: 'hello world',
	  };
	},

	mounted() {

	  // init
	  const id = document.getElementById("drawflow");
	  Vue.prototype.$df = new Drawflow(id, Vue, this);
	  
	  // the act of registering is a mapping of the String name to the class and default props/opts
	  // this should be done during mounted() time
	  // see the mapping in the above config
	  // ---
	  Object.entries(NODES_SELECTION_MAP).forEach((nsmv) => {
		const [nk, nconf] = nsmv;
		// deep copy props and opts, to ensure fresh copy
		const props = JSON.parse(JSON.stringify(nconf.defaultProps));
		const opts = JSON.parse(JSON.stringify(nconf.defaultOptions));
		// .. 
		this.$df.registerNode(nconf.nodeType, nconf.nodeModule, props, opts);
		console.log('ok df.registeredNode() ...', nconf.nodeType, nconf.nodeModule, props, opts);
	  });
	  
	  // required start
	  this.$df.start();

	  // initial configuration of nodes ... do it here ... import etc..
	  //this.$df.addNode('HelloWorld', 0, 1, 150, 100, 'HelloWorld', {select_type: "1"}, 'HelloWorld', 'vue');
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
		const ntypek = this.$data.selectedNodeType;
		if (ntypek.length <= 0) { return; }
		if (!(ntypek in NODES_SELECTION_MAP)) { return; }
		const nconf = NODES_SELECTION_MAP[ntypek];
		console.log('selectedNodeType to add:', ntypek, nconf);
		this.$df.addNode(
			nconf.nodeType,
			nconf.nodeModule.methods.INPUTS_COUNT(), 
			nconf.nodeModule.methods.OUTPUTS_COUNT(), 
			100, 100, nconf.nodeType, {}, nconf.nodeType, 'vue');
	  },
  
	}
  
  }
</script>
  