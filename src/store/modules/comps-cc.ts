import { Commit, ActionTree, MutationTree } from 'vuex';
import { CompsItem, CompsContainer, CompsTree, CompQuery } from '../interfaces';
import * as types from '../mutation-types';

export interface State {
  data: CompsContainer;
  current: number;
  group: number;
  tree: CompsTree[];
}

const initState: State = {
  data: {
    service: [
      { o: 'Global', name: 'Critical Response',
      comp: 'ChartResponse', title: 'ChartResponse', type: 'global', width: 3 },
      { o: 'Service', name: 'Avg Response',
      comp: 'ChartAvgResponse', title: 'ChartAvgSLA', type: 'serviceInfo', width: 3 },
      { o: 'Service', name: 'Avg Throughput',
      comp: 'ChartAvgThroughput', title: 'ChartAvgSLA', type: 'serviceInfo', width: 3 },
      { o: 'Service', name: 'Avg SLA',
      comp: 'ChartAvgSLA', title: 'ChartAvgSLA', type: 'serviceInfo', width: 3 },
      { o: 'Service', name: 'Critical Response',
      comp: 'ChartResponse', title: 'serviceInfo', type: 'serviceInfo', width: 3 },
      { o: 'ServiceInstance', name: 'CPU',
      comp: 'ChartCpu', title: 'CPU %' , width: 3 },
      { o: 'ServiceInstance', name: 'GC',
      comp: 'ChartGC', title: 'GC ms' , width: 3 },
      { o: 'ServiceInstance', name: 'Heap',
      comp: 'ChartHeap', title: 'Heap MB' , width: 3 },
      { o: 'ServiceInstance', name: 'NonHeap',
      comp: 'ChartNonHeap', title: 'Non-Heap MB' , width: 3 },
      { o: 'Service', name: 'Slow Endpoints',
      comp: 'ChartTrace', title: 'serviceInfo', type: 'serviceInfo.getSlowEndpoint', width: 3 },
      { o: 'Service', name: 'Slow Instance Throughput',
      comp: 'ChartSlow', title: 'serviceInfo', type: 'serviceInfo.getInstanceThroughput', width: 3 },
    ],
    proxy: [
      { o: 'Global', name: 'Critical Response',
      comp: 'ChartResponse', title: 'ChartResponse', type: 'global', width: 3 },
    ],
    database: [
      { o: 'Global', name: 'Critical Response',
      comp: 'ChartResponse', title: 'ChartResponse', type: 'global', width: 3 },
      { o: 'Database', name: 'Avg Response',
      comp: 'ChartAvgResponse', title: 'ChartAvgSLA', type: 'serviceInfo', width: 3 },
      { o: 'Database', name: 'Avg Throughput',
      comp: 'ChartAvgThroughput', title: 'ChartAvgSLA', type: 'serviceInfo', width: 3 },
      { o: 'Database', name: 'Avg SLA', comp: 'ChartAvgSLA', title: 'ChartAvgSLA', type: 'serviceInfo', width: 3 },
      { o: 'Database', name: 'Critical Response',
      comp: 'ChartResponse', title: 'serviceInfo', type: 'serviceInfo', width: 3 },
    ],
  },
  current: 0,
  group: 0,
  tree: [{
    name: 'Service Dashboard',
    type: 'service',
    query:  {
      service: {},
      endpoint: {},
      instance: {},
    },
    children: [
      {
        name: 'service',
        children: [],
      },
    ],
  }, {
    name: 'Database Dashboard',
    type: 'database',
    query:  {
      service: {},
    },
    children: [
      {
        name: 'Database',
        children: [],
      },
    ],
  }],
};

// mutations
const mutations: MutationTree<State> = {
  [types.SET_COMPS_TREE](state: State, data: CompsTree[]) {
    state.tree = data;
  },
  [types.SET_GROUP_QUERY](state: State, params: CompQuery) {
    state.tree[state.group].query = params;
  },
  [types.ADD_COMPS_GROUP](state: State, params: any) {
    if (!params.name) {return; }
    state.tree.push({name: params.name, type: params.type, query: {}, children: [
      {name: 'demo', children: []},
    ]});
    window.localStorage.setItem('dashboard', JSON.stringify([... state.tree]));
  },
  [types.ADD_COMPS_TREE](state: State, params: any) {
    if (!params.name) {return; }
    state.tree[state.group].children.push({name: params.name, children: []});
    window.localStorage.setItem('dashboard', JSON.stringify([... state.tree]));
  },
  [types.DELETE_COMPS_GROUP](state: State, index: number) {
    state.tree.splice(index, 1);
    window.localStorage.setItem('dashboard', JSON.stringify([... state.tree]));
  },
  [types.DELETE_COMPS_TREE](state: State, index: number) {
    state.tree[state.group].children.splice(index, 1);
    window.localStorage.setItem('dashboard', JSON.stringify([... state.tree]));
  },
  [types.ADD_COMP](state: State, comp: CompsItem) {
    state.tree[state.group].children[state.current].children.push(comp);
    window.localStorage.setItem('dashboard', JSON.stringify([... state.tree]));
  },
  [types.DELETE_COMP](state: State, index: number) {
    state.tree[state.group].children[state.current].children.splice(index, 1);
    window.localStorage.setItem('dashboard', JSON.stringify([... state.tree]));
  },
  [types.EDIT_COMP](state: State, params: any) {
    const temp: any = state.tree[state.group].children[state.current].children[params.index];
    temp[params.type] = params.value;
    window.localStorage.setItem('dashboard', JSON.stringify([... state.tree]));
  },
  [types.SET_CURRENT_COMPS](state: State, current: number) {
    state.current = current;
  },
  [types.SET_CURRENT_GROUP](state: State, current: number) {
    state.group = current;
    state.current = 0;
  },
  [types.SWICH_COMP](state: State, params: any) {
    const tempStart: any =
    state.tree[state.group].children[state.current].children[params.start];
    state.tree[state.group].children[state.current].children[params.start] =
    state.tree[state.group].children[state.current].children[params.end];
    state.tree[state.group].children[state.current].children[params.end] = tempStart;
    state.tree = {...state.tree};
  },
};

// actions
const actions: ActionTree<State, any> = {} ;

// getters
const getters = {
};

export default {
  state: initState,
  getters,
  actions,
  mutations,
};
