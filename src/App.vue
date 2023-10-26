<template>
	<div id="app">
	  <nav class="top-toolbar">
		<select v-model="selectedNodeType">
            <option value="">-- select --</option>
			<option v-for="nsmv in NodesSelectionMap" v-bind:value="nsmv.selfKey">{{ nsmv.displayName }}</option>
		</select>
		<button @click="addNodeX">Add Node</button>
		<button @click="exportDF">Export</button>
		<div style="float: right">
			<button @click="clearDF">Clear</button>
		</div>
	  </nav>
	  <div id="drawflow"></div>

	  <!-- FIXME: not componetized yet -->
	  <dialog id="exportDialog" v-bind:open="exportDialogShown">
		<div class="xp-wrap">
		  <button class="close" autofocus @click="exportDialogShown=false">Close</button>
		  <textarea>{{ exportValue }}</textarea>
		</div>
	  </dialog>
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
	background-size: 40px 40px;
    background-image: radial-gradient(circle, #aaa8 1px, #eee0 1px);
  }

  #exportDialog {
    position: absolute;
    width: 50vw;
    height: 70vh;
    top: calc(50% - 35vh);
	border: 1px solid #888;
	border-radius: 5px;
	background-color: #fafafa;
	box-shadow: 5px 5px 30px #8885;
  }
  #exportDialog .xp-wrap {
	position: relative;
	height: 100%;
  }
  #exportDialog .xp-wrap button.close {
	position: absolute;
	top: 0;
	right: 0;
  }
	
  #exportDialog .xp-wrap textarea {
	height: calc(100% - 80px);
	width: 100%;
	margin-top: 40px;
	font-family: "Courier New", monospace;
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
		exportDialogShown: false,
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

	  this.$df.on('zoom', (zoomLevel) => {
		// translate background grid also ... note above 40px grid size
		let GRID = 40;
		const dfel = document.querySelector('#drawflow');
		let g = (40 * zoomLevel).toFixed('2');
		const bgcss = String(g) + 'px ' + String(g) + 'px';
		dfel.style['background-size'] = bgcss;
		dfel.style['background-image'] = 'radial-gradient(circle, #aaa8 1px, #eee0 1px)';
		if (zoomLevel <= 0.5) {
		  dfel.style['background-image'] = 'radial-gradient(circle, #aaa3 1px, #eee0 1px)';
		}
		//console.log('zoom', zoomLevel, bgcss, dfel.style['background-size']);
	  })
	  
	  // required start
	  this.$df.start();

	  // initial configuration of nodes ... do it here ... import etc..

	  const demoDF = {"drawflow":{"Home":{"data":{"1":{"id":1,"name":"TriggerOnly","data":{"triggertype":"2"},"class":"TriggerOnly","html":"TriggerOnly","typenode":"vue","inputs":{},"outputs":{"output_1":{"connections":[{"node":"3","output":"input_1"}]}},"pos_x":50,"pos_y":150},"2":{"id":2,"name":"SinkTwoInp","data":{},"class":"SinkTwoInp","html":"SinkTwoInp","typenode":"vue","inputs":{"input_1":{"connections":[{"node":"3","input":"output_1"}]},"input_2":{"connections":[]}},"outputs":{},"pos_x":823,"pos_y":239},"3":{"id":3,"name":"PipeOne","data":{},"class":"PipeOne","html":"PipeOne","typenode":"vue","inputs":{"input_1":{"connections":[{"node":"1","input":"output_1"}]}},"outputs":{"output_1":{"connections":[{"node":"2","output":"input_1"}]}},"pos_x":473,"pos_y":402}}}}};
	  this.$df.import(demoDF);
	},

	methods: {

	  exportDF() {
		let xv = this.$df.export();
		this.exportValue = JSON.stringify(xv);
		console.log('export JSON', this.exportValue);

		this.exportDialogShown = true;	
	  },

	  clearDF() {
		this.$df.clear();
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
  