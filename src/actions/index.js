export const ADD_FAMILY_MEMBER = "ADD_FAMILY_MEMBER";
export const REMOVE_FAMILY_MEMBER = "REMOVE_FAMILY_MEMBER";

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
