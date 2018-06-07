import appTemplate from "./app.hbs";
import {
  addFamilyMember,
  removeFamilyMember,
  shuffleFamilyMembers
} from "../actions";
import "./app.scss";

export default class App {
  constructor(store) {
    this.store = store;
    this.store.subscribe(this.render.bind(this));

    this.app = document.createElement("div");
    document.body.appendChild(this.app);
  }

  bindEventListeners() {
    const form = document.querySelector("#member-registration-form");
    form.addEventListener("submit", evt => {
      evt.preventDefault();

      if (form.name.value && form.spouse.value) {
        this.store.dispatch(
          addFamilyMember({
            name: form.name.value,
            spouse: form.spouse.value
          })
        );
        this.store.dispatch(
          addFamilyMember({
            name: form.spouse.value,
            spouse: form.name.value
          })
        );
      } else {
        this.store.dispatch(
          addFamilyMember({
            name: form.name.value,
            spouse: form.spouse.value
          })
        );
      }
    });

    const memberlist = document.querySelectorAll(
      "#member-list .member-list-icon"
    );
    memberlist.forEach(member => {
      member.addEventListener("click", evt => {
        const name = evt.target.getAttribute("data-name");
        this.store.dispatch(removeFamilyMember({ name }));
      });
    });

    const shuffleButton = document.querySelector(".button-shuffle");
    shuffleButton.addEventListener("click", evt => {
      this.store.dispatch(shuffleFamilyMembers());
    });
  }

  render() {
    const state = this.store.getState();

    var context = {
      familyMembers: state.familyMembers,
      isDrawDone: state.isDrawDone
    };

    var html = appTemplate(context);
    this.app.innerHTML = html;

    this.bindEventListeners();
  }
}
