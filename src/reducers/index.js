import {
  ADD_FAMILY_MEMBER,
  REMOVE_FAMILY_MEMBER,
  SHUFFLE_FAMILY_MEMBERS
} from "../actions";

const initialState = {
  familyMembers: [],
  isDrawDone: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAMILY_MEMBER: {
      return {
        familyMembers: [...state.familyMembers, action.familyMember],
        isDrawDone: false
      };
    }

    case REMOVE_FAMILY_MEMBER: {
      const newState = {
        familyMembers: state.familyMembers.map(member => {
          return {
            name: member.name,
            spouse: member.spouse,
            receiver: member.receiver
          };
        }),
        isDrawDone: false
      };
      const memberIndexToRemove = newState.familyMembers.findIndex(
        el => el.name === action.familyMember.name
      );
      newState.familyMembers.splice(memberIndexToRemove, 1);
      return newState;
    }

    case SHUFFLE_FAMILY_MEMBERS: {
      const newState = {
        familyMembers: state.familyMembers.map(member => {
          return {
            name: member.name,
            spouse: member.spouse,
            receiver: member.receiver
          };
        }),
        isDrawDone: true
      };

      newState.familyMembers.forEach((member, index) => {
        console.log(findReceiver(member, newState.familyMembers));
      });

      return newState;
    }

    default:
      return state;
  }
};

const findReceiver = (member, familyMembers) => {
  const receiverIndex = Math.floor(Math.random() * familyMembers.length);
  if (
    member.name === familyMembers[receiverIndex].name ||
    member.name === familyMembers[receiverIndex].spouse ||
    familyMembers[receiverIndex].isAlreadyAGiver
  ) {
    return findReceiver(member, familyMembers);
  } else {
    member.receiver = familyMembers[receiverIndex].name;
    familyMembers[receiverIndex].isAlreadyAGiver = true;
    return member;
  }
};

export default reducer;
