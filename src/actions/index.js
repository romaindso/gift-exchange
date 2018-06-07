export const ADD_FAMILY_MEMBER = "ADD_FAMILY_MEMBER";
export const REMOVE_FAMILY_MEMBER = "REMOVE_FAMILY_MEMBER";
export const SHUFFLE_FAMILY_MEMBERS = "SHUFFLE_FAMILY_MEMBERS";
export const RESET_STATE = "RESET_STATE";

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

export const resetState = () => {
  return {
    type: RESET_STATE
  };
};
