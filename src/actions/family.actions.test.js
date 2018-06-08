
import {
  addFamilyMember,
  removeFamilyMember,
  shuffleFamilyMembers,
  resetState
} from "./family.actions";

describe('Family actions', () => {

  test('ADD_FAMILY_MEMBER', () => {
    const familyMember = {
      name: "Romain",
      spouse: "Amélie"
    };

    expect(addFamilyMember(familyMember)).toMatchSnapshot();
  });

  test('REMOVE_FAMILY_MEMBER', () => {
    const familyMember = {
      name: "Romain",
      spouse: "Amélie"
    };

    expect(removeFamilyMember(familyMember)).toMatchSnapshot();
  });

  test('SHUFFLE_FAMILY_MEMBERS', () => {
    expect(shuffleFamilyMembers()).toMatchSnapshot();
  });

  test('RESET_STATE', () => {
    expect(resetState()).toMatchSnapshot();
  });

});