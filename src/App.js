var testTemplate = require("./test.hbs");

export default class App {
  constructor() {
    this.app = document.createElement('div');
    document.body.appendChild(this.app);
    this.render();
  }

  render() {
    var context = {
      title: "My New Post",
      body: "This is my first post!"
    };
    var html = testTemplate(context);
    this.app.innerHTML = html;
  }

}