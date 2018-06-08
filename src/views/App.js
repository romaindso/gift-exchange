import appTemplate from "./app.hbs";
import {
  addFamilyMember,
  removeFamilyMember,
  shuffleFamilyMembers,
  resetState
} from "../actions/family.actions";
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
    if (form) {
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
              spouse: ""
            })
          );
        }
      });
    }

    const memberlist = document.querySelectorAll(
      ".member-list-delete-icon .fa-times"
    );
    memberlist.forEach(member => {
      member.addEventListener("click", evt => {
        const name = evt.target.getAttribute("data-name");
        const spouse = evt.target.getAttribute("data-spouse");
        this.store.dispatch(removeFamilyMember({ name, spouse }));
      });
    });

    const shuffleButton = document.querySelector(".button-shuffle");
    shuffleButton.addEventListener("click", evt => {
      this.store.dispatch(shuffleFamilyMembers());
    });

    const restartButton = document.querySelector(".button-restart");
    if (restartButton) {
      restartButton.addEventListener("click", evt => {
        this.store.dispatch(resetState());
      });
    }
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
