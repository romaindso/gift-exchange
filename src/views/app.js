import {
  addFamilyMember,
  removeFamilyMember,
  shuffleFamilyMembers,
  checkDraw,
  resetState
} from "../actions/family.actions";
import "./app.scss";
import Handlebars from 'handlebars';
import appTemplate from "./templates/app.hbs";
import registrationSection from './templates/registrationSection.hbs';
import shuffleSection from './templates/shuffleSection.hbs';
import tipSection from './templates/tipSection.hbs';
import actionsSection from './templates/actionsSection.hbs';
import memberListSection from './templates/memberListSection.hbs';
import resultsSection from './templates/resultsSection.hbs';

export default class App {
  constructor(store) {
    this.store = store;
    this.store.subscribe(this.render.bind(this));

    this.app = document.createElement("div");
    document.body.appendChild(this.app);
  }

  bindEventListeners() {
    this.setUpAddMemberButton();
    this.setUpRemoveMemberButtons();
    this.setUpShuffleButton();
    this.setUpRestartButton();
  }

  setUpAddMemberButton() {
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
        this.store.dispatch(checkDraw());
      });
    }
  }

  setUpRemoveMemberButtons() {
    const memberlist = document.querySelectorAll(
      ".member-list-delete-icon .fa-times"
    );
    if (memberlist) {
      memberlist.forEach(member => {
        member.addEventListener("click", evt => {
          const name = evt.target.getAttribute("data-name");
          const spouse = evt.target.getAttribute("data-spouse");
          this.store.dispatch(removeFamilyMember({ name, spouse }));
          this.store.dispatch(checkDraw());
        });
      });
    }
  }

  setUpShuffleButton() {
    const shuffleButton = document.querySelector(".button-shuffle");
    if (shuffleButton) {
      shuffleButton.addEventListener("click", evt => {
        this.store.dispatch(shuffleFamilyMembers());
      });
    }
  }

  setUpRestartButton() {
    const restartButton = document.querySelector(".button-restart");
    if (restartButton) {
      restartButton.addEventListener("click", evt => {
        this.store.dispatch(resetState());
      });
    }
  }

  render() {
    const state = this.store.getState();
    const context = {
      familyMembers: state.familyMembers,
      isDrawValid: state.isDrawValid,
      isDrawDone: state.isDrawDone
    };

    Handlebars.registerPartial('registrationSection', '{{name}}');
    Handlebars.registerPartial('shuffleSection', '{{name}}');
    Handlebars.registerPartial('tipSection', '{{name}}');
    Handlebars.registerPartial('actionsSection', '{{name}}');
    Handlebars.registerPartial('memberListSection', '{{name}}');
    Handlebars.registerPartial('resultsSection', '{{name}}');

    const html = appTemplate(context);
    this.app.innerHTML = html;

    this.bindEventListeners();
  }
}
