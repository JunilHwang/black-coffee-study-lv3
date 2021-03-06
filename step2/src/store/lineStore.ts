import {Store} from "~@core";
import {Line, LineRequest} from "~@domain";
import {lineService, sectionService} from "~services";

export const SET_LINES = 'SET_LINES';
export const GET_LINES = 'GET_LINES';
export const ADD_LINE = 'ADD_LINE';
export const UPDATE_LINE = 'UPDATE_LINE';
export const REMOVE_LINE = 'REMOVE_LINE';

interface LineStoreState {
  lines: Line[];
}

export const lineStore = new Store<LineStoreState>({
  state: {
    lines: lineService.getLines(),
  },

  mutations: {
    [SET_LINES](state: LineStoreState, lines: Line[]) {
      state.lines = lines
    }
  },

  actions: {

    [GET_LINES]({ commit }) {
      commit(SET_LINES, lineService.getLines());
    },

    [ADD_LINE]({ dispatch }, lineRequest: LineRequest) {
      lineService.addLine(lineRequest);
      dispatch(GET_LINES);
    },

    [UPDATE_LINE]({ dispatch }, line: Line) {
      lineService.updateLine(line);
      dispatch(GET_LINES);
    },

    [REMOVE_LINE]({ dispatch }, line: Line) {
      lineService.removeLine(line);
      dispatch(GET_LINES);
    },

  },
});
