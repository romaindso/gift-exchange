import { ADD_FAMILY_MEMBER, REMOVE_FAMILY_MEMBER } from "../actions";

const initialState = {
  familyMembers: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAMILY_MEMBER:
      return { familyMembers: [...state.familyMembers, action.familyMember] };

    case REMOVE_FAMILY_MEMBER:
      const newFamilyMembers = [...state.familyMembers];
      newFamilyMembers.splice(newFamilyMembers.indexOf(action.familyMember), 1);
      return { familyMembers: newFamilyMembers };

    default:
      return state;
  }
};

export default reducer;
