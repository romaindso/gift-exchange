import {
  ADD_FAMILY_MEMBER,
  REMOVE_FAMILY_MEMBER,
  SHUFFLE_FAMILY_MEMBERS,
  RESET_STATE
} from "../actions/actionTypes";

const initialState = {
  familyMembers: [],
  isDrawDone: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAMILY_MEMBER: {
      const newfamilyMembers = [...state.familyMembers, action.familyMember]

      const familyLength = newfamilyMembers.length;
      const membersWithSpouse = newfamilyMembers.filter(member => {
        return member.spouse
      }).length;

      console.log('familyLength', familyLength);
      console.log('totalCouples', membersWithSpouse);
      const isDrawPossible = checkDrawValidity(familyLength, membersWithSpouse);
      console.log('isDrawnPossible', isDrawPossible);

      return {
        ...state,
        familyMembers: newfamilyMembers
      };
    }

    case REMOVE_FAMILY_MEMBER: {
      let familyMembersReduced = state.familyMembers.reduce((total, member) => {
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

      const newState = {
        ...state,
        familyMembers: familyMembersReduced
      }

      return newState;
    }

    case SHUFFLE_FAMILY_MEMBERS: {
      const newState = {
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

const checkDrawValidity = (familyLength, membersWithSpouse) => {
  if (familyLength <= 1 ||
    membersWithSpouse === 2 && familyLength === 2 ||
    familyLength === 3 && membersWithSpouse === 2
  ) {
    return false
  }

  return true;
}

export default reducer;
