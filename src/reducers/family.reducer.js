import {
  ADD_FAMILY_MEMBER,
  REMOVE_FAMILY_MEMBER,
  SHUFFLE_FAMILY_MEMBERS,
  CHECK_DRAW,
  RESET_STATE
} from "../actions/actionTypes";

export const INITIAL_STATE = {
  familyMembers: [],
  isDrawValid: false,
  isDrawDone: false
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_FAMILY_MEMBER: {
      const newfamilyMembers = [...state.familyMembers, action.familyMember]

      return {
        ...state,
        familyMembers: newfamilyMembers
      };
    }

    case REMOVE_FAMILY_MEMBER: {
      const newState = {
        ...state,
        familyMembers: state.familyMembers.map(member => {
          return {
            ...member
          };
        }),
      };

      let familyMembersReduced = newState.familyMembers.reduce((total, member) => {
        // Delete spouse for remaining couple member
        if (action.familyMember.spouse === member.name) {
          member.spouse = "";
        }
        // Keep only other members
        if (member.name !== action.familyMember.name) {
          total.push(member);
        }
        return total;
      }, []);

      newState.familyMembers = familyMembersReduced;
      return newState;
    }

    case CHECK_DRAW: {
      const familyLength = state.familyMembers.length;
      const membersWithSpouse = state.familyMembers.filter(member => {
        return member.spouse
      }).length;

      return {
        ...state,
        isDrawValid: isDrawValid(familyLength, membersWithSpouse)
      };
    }

    case SHUFFLE_FAMILY_MEMBERS: {
      const newState = {
        ...state,
        familyMembers: state.familyMembers.map(member => {
          // Clean previous shuffle
          const { receiver, isAlreadyAGiver, ...rest } = member;
          return {
            ...rest
          };
        }),
        isDrawDone: true
      };

      newState.familyMembers.forEach((member, index) => {
        findReceiver(member, newState.familyMembers);
      });

      return newState;
    }

    case RESET_STATE: {
      return INITIAL_STATE;
    }

    default:
      return state;
  }
};

// Could be improved to prevent "maximum call stack exceeded" with recursion
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

const isDrawValid = (familyLength, membersWithSpouse) => {
  if (familyLength <= 1 ||
    membersWithSpouse === 2 && familyLength === 2 ||
    familyLength === 3 && membersWithSpouse === 2
  ) {
    return false
  }

  return true;
}

export default reducer;
