import { reducer, INITIAL_STATE } from './family.reducer';
import {
  ADD_FAMILY_MEMBER,
  REMOVE_FAMILY_MEMBER,
  SHUFFLE_FAMILY_MEMBERS,
  CHECK_DRAW,
  RESET_STATE
} from "../actions/actionTypes";
import deepFreeze from 'deep-freeze';

describe("Family reducer", () => {

  test("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(
      INITIAL_STATE
    )
  });

  test("should add the given member", () => {
    const action = {
      type: ADD_FAMILY_MEMBER,
      familyMember: {
        name: 'Romain',
        spouse: 'Amélie'
      }
    }

    deepFreeze(INITIAL_STATE);
    const result = reducer(INITIAL_STATE, action);

    expect(result).toEqual({
      familyMembers: [{
        name: "Romain",
        spouse: "Amélie",
      }],
      isDrawValid: false,
      isDrawDone: false,
    });
  });

  test("should remove the given member and clean relationship", () => {
    const action = {
      type: REMOVE_FAMILY_MEMBER,
      familyMember: {
        name: "Romain",
        spouse: "Amélie"
      }
    }
    const state = {
      familyMembers: [{
        name: "Romain",
        spouse: "Amélie"
      },
      {
        name: "Amélie",
        spouse: "Romain"
      }, {
        name: "Tom",
        spouse: ""
      }],
      isDrawValid: false,
      isDrawDone: false
    }

    deepFreeze(state);
    const result = reducer(state, action);

    expect(result).toEqual({
      familyMembers: [{
        name: "Amélie",
        spouse: ""
      }, {
        name: "Tom",
        spouse: ""
      }],
      isDrawValid: false,
      isDrawDone: false,
    });
  });

  test("should shuffle all family members", () => {
    const state = {
      familyMembers: [{
        name: "Tom",
        spouse: ""
      },
      {
        name: "Clara",
        spouse: ""
      }],
      isDrawValid: true,
      isDrawDone: false
    }

    deepFreeze(state);
    const result = reducer(state, {
      type: SHUFFLE_FAMILY_MEMBERS
    });

    expect(result).toEqual({
      familyMembers: [{
        name: "Tom",
        spouse: "",
        receiver: "Clara",
        isAlreadyAGiver: true
      },
      {
        name: "Clara",
        spouse: "",
        receiver: "Tom",
        isAlreadyAGiver: true
      }],
      isDrawValid: true,
      isDrawDone: true,
    });
  });

  test("should reset the state", () => {
    deepFreeze(INITIAL_STATE);
    const result = reducer(INITIAL_STATE, {
      type: RESET_STATE,
    });

    expect(result).toEqual(INITIAL_STATE);
  });
});