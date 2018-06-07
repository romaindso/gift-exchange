import {
  ADD_FAMILY_MEMBER,
  REMOVE_FAMILY_MEMBER,
  SHUFFLE_FAMILY_MEMBERS,
  RESET_STATE
} from "../actions";

const initialState = {
  familyMembers: [],
  isDrawDone: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAMILY_MEMBER: {
      return {
        ...state,
        familyMembers: [...state.familyMembers, action.familyMember]
      };
    }

    case REMOVE_FAMILY_MEMBER: {
      const newState = {
        ...state,
        familyMembers: state.familyMembers.filter(member => {
          return member.name !== action.familyMember.name
        })
      }

      return newState;
    }

    case SHUFFLE_FAMILY_MEMBERS: {
      const newState = {
        familyMembers: state.familyMembers.map(member => {
          return {
            ...member
          };
        }),
        isDrawDone: false
      };

      newState.familyMembers.forEach((member, index) => {
        findReceiver(member, newState.familyMembers);
      });

      return newState;
    }

    case RESET_STATE: {
      return initialState;
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
