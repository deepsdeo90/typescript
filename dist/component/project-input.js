var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "./base-component.js";
import { validate } from "../utill/validation.js";
import { autobind } from "../decorator/autobind.js";
import { projectState } from "../state/project-state.js";
export class ProjectInput extends Component {
    constructor() {
        console.log("inout");
        super("project", "app", true);
        this.titleInputElement = this.divElement.querySelector("#title");
        this.descriptionInputElement = this.divElement.querySelector("#description");
        this.peopleInputElement = this.divElement.querySelector("#people");
        this.configure();
    }
    configure() {
        this.divElement.addEventListener('submit', this.submitHandler);
    }
    rendercontent() {
    }
    gatherUserInput() {
        const enteredtitle = this.titleInputElement.value;
        const entereddescription = this.descriptionInputElement.value;
        const enteredpeople = this.peopleInputElement.value;
        const validationRuleForTitle = {
            value: enteredtitle,
            required: true,
            minLength: 5,
            maxLength: 15
        };
        const validationRuleForDescription = {
            value: entereddescription,
            required: true,
            minLength: 5,
            maxLength: 100
        };
        const validationRuleForPeople = {
            value: enteredpeople,
            required: true,
            min: 1,
            max: 11
        };
        const isValid = validate(validationRuleForTitle) && validate(validationRuleForDescription) && validate(validationRuleForPeople);
        if (!isValid) {
            alert("Invalid Input!!");
            return;
        }
        else {
            return [enteredtitle, entereddescription, +enteredpeople];
        }
    }
    clearInput() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);
            this.clearInput();
        }
    }
}
__decorate([
    autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], ProjectInput.prototype, "submitHandler", null);
//# sourceMappingURL=project-input.js.map