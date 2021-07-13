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
    constructor() {
        super();
        this.projects = [];
    }
    addProject(title, description, people) {
        const newProject = new Project(Math.random.toString(), title, description, people, ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find(prj => prj.id == projectId);
        if (project && project.status != newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
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
class ProjectItem extends Component {
    constructor(hostId, project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.rendercontent();
        this.configure();
    }
    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        }
        else {
            return `${this.project.people} persons`;
        }
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.dropEffect = 'move';
    }
    dragEndHandler(_) {
    }
    rendercontent() {
        this.divElement.querySelector("header").textContent = this.project.title;
        this.divElement.querySelector("h3").textContent = this.persons + ' assigned';
        this.divElement.querySelector("div").textContent = this.project.description;
    }
    configure() {
        this.divElement.addEventListener('dragstart', this.dragStartHandler);
        this.divElement.addEventListener('dragend', this.dragEndHandler);
    }
}
__decorate([
    autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectItem.prototype, "dragEndHandler", null);
class ProjectList extends Component {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects-list`);
        this.type = type;
        this.assignedProjects = [];
        this.rendercontent();
        this.configure();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const list = this.divElement.querySelector('div');
            list.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData('text/plain');
        projectState.moveProject(prjId, this.type == 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    dragLeaveHandler(event) {
        event.preventDefault();
        const list = this.divElement.querySelector('div');
        list.classList.remove('droppable');
    }
    rendercontent() {
        const listId = `${this.type}-projects`;
        this.divElement.querySelector('div').id = listId;
        this.divElement.querySelector('h1').textContent = this.type.toUpperCase() + ' PROJECTS';
        this.divElement.querySelector('h1').className = this.type + '-header';
    }
    configure() {
        this.divElement.addEventListener('dragover', this.dragOverHandler);
        this.divElement.addEventListener('dragleave', this.dragLeaveHandler);
        this.divElement.addEventListener('drop', this.dropHandler);
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
        const listEl = document.getElementById(`${this.type}-projects`);
        listEl.innerHTML = "";
        for (const projectItem of this.assignedProjects) {
            new ProjectItem(this.divElement.querySelector('div').id, projectItem);
        }
    }
}
__decorate([
    autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectList.prototype, "dropHandler", null);
__decorate([
    autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectList.prototype, "dragLeaveHandler", null);
class ProjectInput extends Component {
    constructor() {
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
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
