"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class State {
    constructor() {
        this.listener = [];
    }
    addListener(listenerFn) {
        this.listener.push(listenerFn);
    }
}
class ProjectState extends State {
    //private listener: Listener[] = [];
    constructor() {
        super();
        this.projects = [];
    }
    addProject(title, description, people) {
        const newProject = new Project(Math.random.toString(), title, description, people, ProjectStatus.Active);
        this.projects.push(newProject);
        for (const listenerFn of this.listener) {
            listenerFn(this.projects.slice());
        }
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
}
const projectState = ProjectState.getInstance();
function autobind(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
function validate(validateInput) {
    let isValid = true;
    if (validateInput.required) {
        isValid = isValid && validateInput.value.toString().trim().length > 0;
    }
    if (validateInput.minLength != null && typeof validateInput.value === 'string') {
        isValid = isValid && validateInput.value.length > validateInput.minLength;
    }
    if (validateInput.maxLength != null && typeof validateInput.value === 'string') {
        isValid = isValid && validateInput.value.length < validateInput.maxLength;
    }
    if (validateInput.min != null && typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value > validateInput.min;
    }
    if (validateInput.max != null && typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value < validateInput.max;
    }
    return isValid;
}
class Component {
    constructor(templateId, hostElementId, positionAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.divElement = importedNode.firstElementChild;
        if (newElementId) {
            this.divElement.id = newElementId;
        }
        this.positionAtStart = positionAtStart;
        this.attach();
    }
    attach() {
        const position = this.positionAtStart ? 'afterbegin' : 'beforeend';
        this.hostElement.insertAdjacentElement(position, this.divElement);
    }
}
class ProjectList extends Component {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        /*this.templateElement = document.getElementById("project-list") as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.divElement = importedNode.firstElementChild as HTMLDivElement;
        this.divElement.id = `${this.type}-projects`;*/
        this.assignedProjects = [];
        // this.attach();
        this.rendercontent();
        this.configure();
    }
    rendercontent() {
        var _a;
        const headerElement = (_a = document.getElementById(`${this.type}-projects`)) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("h1")[0];
        console.log(document.getElementById(`${this.type}-projects`));
        if (headerElement) {
            headerElement.className = this.type + '-header';
            headerElement.innerText = this.type.toUpperCase() + ' PROJECTS';
        }
    }
    configure() {
        projectState.addListener((projects) => {
            const releventProject = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = releventProject;
            this.renderProjects();
        });
    }
    renderProjects() {
        var _a;
        const listEl = (_a = document.getElementById(`${this.type}-projects`)) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("div")[0];
        ;
        listEl.innerHTML = "";
        for (const projectItem of this.assignedProjects) {
            const header = document.createElement('header');
            header.innerText = projectItem.title;
            const peopleDiv = document.createElement('div');
            peopleDiv.className = 'people';
            peopleDiv.innerText = projectItem.people.toString();
            const descDiv = document.createElement('div');
            descDiv.className = 'description';
            descDiv.innerText = projectItem.description;
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.appendChild(header);
            cardDiv.appendChild(peopleDiv);
            cardDiv.appendChild(descDiv);
            listEl === null || listEl === void 0 ? void 0 : listEl.append(cardDiv);
        }
    }
}
class ProjectInput extends Component {
    constructor() {
        super("project", "app", true);
        /*this.templateElement = document.getElementById("project")! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;*/
        this.titleInputElement = this.divElement.querySelector("#title");
        this.descriptionInputElement = this.divElement.querySelector("#description");
        this.peopleInputElement = this.divElement.querySelector("#people");
        this.configure();
        //  this.attach();
    }
    /*
    private attach(){
        this.hostElement.insertAdjacentElement('afterbegin', super.divElement);
    }
*/
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
            console.log(title + " " + description + " " + people);
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
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
