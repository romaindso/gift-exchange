import App from './App';
import { createStore } from "redux";
import reducer from "../reducers/family.reducer";

const store = createStore(
  reducer
);

describe('App', () => {

  xtest('setUpAddMemberButton should setup an eventListener that trigger a dispatch action on click', () => {
    // test is disabled, JSDOM have an issue with form.submit()
    // https://github.com/jsdom/jsdom/issues/1937
    const app = new App(store);
    app.store.dispatch = jest.fn();

    const fakeDom = document.createElement("form");
    fakeDom.id = "member-registration-form";
    fakeDom.innerHTML = `
      <input class="pure-input-1-4" type="text" id="name" placeholder="Name" required />
      <input type="text" id="spouse" placeholder="(Optional) Spouse" />
      <button type="submit" class="pure-button pure-button-primary">Add member</button>`;
    document.body.appendChild(fakeDom);

    app.setUpAddMemberButton();
    fakeDom.submit();

    expect(app.store.dispatch).toHaveBeenCalledWith({ "type": "SHUFFLE_FAMILY_MEMBERS" });
  });

  test('setUpRemoveMemberButtons should setup an eventListener that trigger a dispatch action on click', () => {
    const app = new App(store);
    app.store.dispatch = jest.fn();

    const fakeDomTD = document.createElement("td");
    fakeDomTD.className = "member-list-delete-icon";
    const fakeDomI = document.createElement("i");
    fakeDomI.className = "fa-times";
    fakeDomI.setAttribute("data-name", "Romain");
    fakeDomI.setAttribute("data-spouse", "");
    fakeDomTD.appendChild(fakeDomI);
    document.body.appendChild(fakeDomTD);

    app.setUpRemoveMemberButtons();
    fakeDomI.click();

    expect(app.store.dispatch).toHaveBeenCalledWith({
      familyMember: {
        name: "Romain",
        spouse: "",
      },
      type: "REMOVE_FAMILY_MEMBER"
    });
    expect(app.store.dispatch).toHaveBeenCalledWith({
      type: "CHECK_DRAW"
    });
  });

  test('setUpShuffleButtonshould should setup an eventListener that trigger a dispatch action on click', () => {
    const app = new App(store);
    app.store.dispatch = jest.fn();

    const fakeDom = document.createElement("div");
    fakeDom.className = "button-shuffle";
    document.body.appendChild(fakeDom);

    app.setUpShuffleButton();
    fakeDom.click();

    expect(app.store.dispatch).toHaveBeenCalledWith({ "type": "SHUFFLE_FAMILY_MEMBERS" });
  });

  test('setUpRestartButton should setup an eventListener that trigger a dispatch action on click', () => {
    const app = new App(store);
    app.store.dispatch = jest.fn();

    const fakeDom = document.createElement("div");
    fakeDom.className = "button-restart";
    document.body.appendChild(fakeDom);

    app.setUpRestartButton();
    fakeDom.click();

    expect(app.store.dispatch).toHaveBeenCalledWith({ "type": "RESET_STATE" });
  });
});