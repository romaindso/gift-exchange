import {
  ADD_FAMILY_MEMBER,
  REMOVE_FAMILY_MEMBER,
  SHUFFLE_FAMILY_MEMBERS,
  RESET_STATE,
  CHECK_DRAW
} from './actionTypes';

export const addFamilyMember = familyMember => {
  return {
    type: ADD_FAMILY_MEMBER,
    familyMember: {
      name: familyMember.name,
      spouse: familyMember.spouse
    }
  };
};

export const removeFamilyMember = familyMember => {
  return {
    type: REMOVE_FAMILY_MEMBER,
    familyMember: {
      name: familyMember.name,
      spouse: familyMember.spouse
    }
  };
};

export const shuffleFamilyMembers = () => {
  return {
    type: SHUFFLE_FAMILY_MEMBERS
  };
};

export const checkDraw = () => {
  return {
    type: CHECK_DRAW
  };
};

export const resetState = () => {
  return {
    type: RESET_STATE
  };
};