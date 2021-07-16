/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./component/base-component.ts":
/*!*************************************!*\
  !*** ./component/base-component.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
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


/***/ }),

/***/ "./component/project-input.ts":
/*!************************************!*\
  !*** ./component/project-input.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectInput": () => (/* binding */ ProjectInput)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./component/base-component.ts");
/* harmony import */ var _utill_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utill/validation */ "./utill/validation.ts");
/* harmony import */ var _decorator_autobind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorator/autobind */ "./decorator/autobind.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project-state */ "./state/project-state.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




class ProjectInput extends _base_component__WEBPACK_IMPORTED_MODULE_0__.Component {
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
        const isValid = (0,_utill_validation__WEBPACK_IMPORTED_MODULE_1__.validate)(validationRuleForTitle) && (0,_utill_validation__WEBPACK_IMPORTED_MODULE_1__.validate)(validationRuleForDescription) && (0,_utill_validation__WEBPACK_IMPORTED_MODULE_1__.validate)(validationRuleForPeople);
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
            _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.addProject(title, description, people);
            this.clearInput();
        }
    }
}
__decorate([
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], ProjectInput.prototype, "submitHandler", null);


/***/ }),

/***/ "./component/project-item.ts":
/*!***********************************!*\
  !*** ./component/project-item.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectItem": () => (/* binding */ ProjectItem)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./component/base-component.ts");
/* harmony import */ var _decorator_autobind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorator/autobind */ "./decorator/autobind.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


class ProjectItem extends _base_component__WEBPACK_IMPORTED_MODULE_0__.Component {
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
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_1__.autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_1__.autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectItem.prototype, "dragEndHandler", null);


/***/ }),

/***/ "./component/project-list.ts":
/*!***********************************!*\
  !*** ./component/project-list.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectList": () => (/* binding */ ProjectList)
/* harmony export */ });
/* harmony import */ var _decorator_autobind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorator/autobind */ "./decorator/autobind.ts");
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-component */ "./component/base-component.ts");
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/project */ "./models/project.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project-state */ "./state/project-state.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project-item */ "./component/project-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





class ProjectList extends _base_component__WEBPACK_IMPORTED_MODULE_1__.Component {
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
        _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.moveProject(prjId, this.type == 'active' ? _models_project__WEBPACK_IMPORTED_MODULE_2__.ProjectStatus.Active : _models_project__WEBPACK_IMPORTED_MODULE_2__.ProjectStatus.Finished);
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
        _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.addListener((projects) => {
            const releventProject = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === _models_project__WEBPACK_IMPORTED_MODULE_2__.ProjectStatus.Active;
                }
                return prj.status === _models_project__WEBPACK_IMPORTED_MODULE_2__.ProjectStatus.Finished;
            });
            this.assignedProjects = releventProject;
            this.renderProjects();
        });
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects`);
        listEl.innerHTML = "";
        for (const projectItem of this.assignedProjects) {
            new _project_item__WEBPACK_IMPORTED_MODULE_4__.ProjectItem(this.divElement.querySelector('div').id, projectItem);
        }
    }
}
__decorate([
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_0__.autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_0__.autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectList.prototype, "dropHandler", null);
__decorate([
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_0__.autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectList.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./decorator/autobind.ts":
/*!*******************************!*\
  !*** ./decorator/autobind.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autobind": () => (/* binding */ autobind)
/* harmony export */ });
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


/***/ }),

/***/ "./models/project.ts":
/*!***************************!*\
  !*** ./models/project.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectStatus": () => (/* binding */ ProjectStatus),
/* harmony export */   "Project": () => (/* binding */ Project)
/* harmony export */ });
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


/***/ }),

/***/ "./state/project-state.ts":
/*!********************************!*\
  !*** ./state/project-state.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectState": () => (/* binding */ ProjectState),
/* harmony export */   "projectState": () => (/* binding */ projectState)
/* harmony export */ });
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project */ "./models/project.ts");

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
        const newProject = new _models_project__WEBPACK_IMPORTED_MODULE_0__.Project(Math.random.toString(), title, description, people, _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active);
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


/***/ }),

/***/ "./utill/validation.ts":
/*!*****************************!*\
  !*** ./utill/validation.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validate": () => (/* binding */ validate)
/* harmony export */ });
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _component_project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component/project-input */ "./component/project-input.ts");
/* harmony import */ var _component_project_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component/project-list */ "./component/project-list.ts");


const projectInput = new _component_project_input__WEBPACK_IMPORTED_MODULE_0__.ProjectInput();
const activeProjectList = new _component_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('active');
const finishedProjectList = new _component_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('finished');
console.log('I get called from print.js! Hellow there');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90eXBlc2NyaXB0Ly4vY29tcG9uZW50L2Jhc2UtY29tcG9uZW50LnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQvLi9jb21wb25lbnQvcHJvamVjdC1pbnB1dC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0Ly4vY29tcG9uZW50L3Byb2plY3QtaXRlbS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0Ly4vY29tcG9uZW50L3Byb2plY3QtbGlzdC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0Ly4vZGVjb3JhdG9yL2F1dG9iaW5kLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQvLi9tb2RlbHMvcHJvamVjdC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0Ly4vc3RhdGUvcHJvamVjdC1zdGF0ZS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0Ly4vdXRpbGwvdmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3R5cGVzY3JpcHQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3R5cGVzY3JpcHQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90eXBlc2NyaXB0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC8uL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPLE1BQWUsU0FBUztJQU0zQixZQUFZLFVBQWtCLEVBQUUsYUFBcUIsRUFBRSxlQUF3QixFQUFFLFlBQXFCO1FBQ2xHLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQXdCLENBQUM7UUFDbEYsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBTyxDQUFD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TyxJQUFJLGFBQWEsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQztLQUNoRTtJQUNELElBQUcsYUFBYSxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksT0FBTyxhQUFhLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBQztRQUNwRSxPQUFPLEdBQUcsT0FBTyxJQUFJLGFBQWEsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQztLQUNoRTtJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7Ozs7Ozs7VUMzQkw7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTnlEO0FBQ0Y7QUFFdkQsTUFBTSxZQUFZLEdBQUcsSUFBSSxrRUFBWSxFQUFFLENBQUM7QUFDeEMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGdFQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEQsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLGdFQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQ8VCBleHRlbmRzIEhUTUxFbGVtZW50LCBVIGV4dGVuZHMgSFRNTEVsZW1lbnQ+e1xuICAgIHRlbXBsYXRlRWxlbWVudCA6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gICAgaG9zdEVsZW1lbnQgOiBUO1xuICAgIGRpdkVsZW1lbnQgOiBVO1xuICAgIHBvc2l0aW9uQXRTdGFydDogYm9vbGVhbjtcbiAgXG4gICAgY29uc3RydWN0b3IodGVtcGxhdGVJZDogc3RyaW5nLCBob3N0RWxlbWVudElkOiBzdHJpbmcsIHBvc2l0aW9uQXRTdGFydDogYm9vbGVhbiwgbmV3RWxlbWVudElkPzogc3RyaW5nKXtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0ZW1wbGF0ZUlkKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgICAgICB0aGlzLmhvc3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaG9zdEVsZW1lbnRJZCkhIGFzIFQ7XG4gICAgICAgIGNvbnN0IGltcG9ydGVkTm9kZSA9IGRvY3VtZW50LmltcG9ydE5vZGUodGhpcy50ZW1wbGF0ZUVsZW1lbnQuY29udGVudCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuZGl2RWxlbWVudCA9IGltcG9ydGVkTm9kZS5maXJzdEVsZW1lbnRDaGlsZCBhcyBVO1xuICAgICAgICBpZihuZXdFbGVtZW50SWQpe1xuICAgICAgICAgICAgdGhpcy5kaXZFbGVtZW50LmlkID0gbmV3RWxlbWVudElkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9zaXRpb25BdFN0YXJ0ID0gcG9zaXRpb25BdFN0YXJ0O1xuICAgICAgICB0aGlzLmF0dGFjaCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXR0YWNoKCl7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbkF0U3RhcnQgPyAnYWZ0ZXJiZWdpbic6ICdiZWZvcmVlbmQnO1xuICAgICAgICB0aGlzLmhvc3RFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChwb3NpdGlvbiwgdGhpcy5kaXZFbGVtZW50KTtcbiAgICB9XG4gICAgYWJzdHJhY3QgcmVuZGVyY29udGVudCgpOiB2b2lkO1xuICAgIGFic3RyYWN0IGNvbmZpZ3VyZSgpOiB2b2lkO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vYmFzZS1jb21wb25lbnRcIjtcbmltcG9ydCB7IHZhbGlkYXRlLCBWYWxpZGF0YWJsZSB9IGZyb20gXCIuLi91dGlsbC92YWxpZGF0aW9uXCI7XG5pbXBvcnQgeyBhdXRvYmluZH0gZnJvbSBcIi4uL2RlY29yYXRvci9hdXRvYmluZFwiO1xuaW1wb3J0IHsgcHJvamVjdFN0YXRlfSBmcm9tIFwiLi4vc3RhdGUvcHJvamVjdC1zdGF0ZVwiO1xuXG5leHBvcnQgY2xhc3MgUHJvamVjdElucHV0IGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRm9ybUVsZW1lbnQ+IHtcbiAgICB0aXRsZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcbiAgICBkZXNjcmlwdGlvbklucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcbiAgICBwZW9wbGVJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBjb25zb2xlLmxvZyhcImlub3V0XCIpO1xuICAgICAgICBzdXBlcihcInByb2plY3RcIiwgXCJhcHBcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMudGl0bGVJbnB1dEVsZW1lbnQgPSB0aGlzLmRpdkVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZVwiKSEgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudCA9IHRoaXMuZGl2RWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rlc2NyaXB0aW9uXCIpISBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICB0aGlzLnBlb3BsZUlucHV0RWxlbWVudCA9IHRoaXMuZGl2RWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI3Blb3BsZVwiKSEgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpO1xuICAgIH1cbiAgICBwdWJsaWMgY29uZmlndXJlKCl7XG4gICAgICAgIHRoaXMuZGl2RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEhhbmRsZXIpXG4gICAgfVxuICAgIHB1YmxpYyByZW5kZXJjb250ZW50KCl7XG5cbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBnYXRoZXJVc2VySW5wdXQoKTogW3N0cmluZywgc3RyaW5nLCBudW1iZXJdIHwgdm9pZCB7XG4gICAgICAgIGNvbnN0IGVudGVyZWR0aXRsZSA9IHRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWU7XG4gICAgICAgIGNvbnN0IGVudGVyZWRkZXNjcmlwdGlvbiA9IHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQudmFsdWU7XG4gICAgICAgIGNvbnN0IGVudGVyZWRwZW9wbGUgPSB0aGlzLnBlb3BsZUlucHV0RWxlbWVudC52YWx1ZTtcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvblJ1bGVGb3JUaXRsZSA6IFZhbGlkYXRhYmxlID0ge1xuICAgICAgICAgICAgdmFsdWU6IGVudGVyZWR0aXRsZSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgbWluTGVuZ3RoOiA1LFxuICAgICAgICAgICAgbWF4TGVuZ3RoOiAxNVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uUnVsZUZvckRlc2NyaXB0aW9uIDogVmFsaWRhdGFibGUgPSB7XG4gICAgICAgICAgICB2YWx1ZTogZW50ZXJlZGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDUsXG4gICAgICAgICAgICBtYXhMZW5ndGg6IDEwMFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uUnVsZUZvclBlb3BsZSA6IFZhbGlkYXRhYmxlID0ge1xuICAgICAgICAgICAgdmFsdWU6IGVudGVyZWRwZW9wbGUsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgIG1pbjoxLFxuICAgICAgICAgICAgbWF4OjExXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IHZhbGlkYXRlKHZhbGlkYXRpb25SdWxlRm9yVGl0bGUpICYmIHZhbGlkYXRlKHZhbGlkYXRpb25SdWxlRm9yRGVzY3JpcHRpb24pICYmIHZhbGlkYXRlKHZhbGlkYXRpb25SdWxlRm9yUGVvcGxlKTtcblxuICAgICAgICBpZighaXNWYWxpZCl7XG4gICAgICAgICAgICBhbGVydChcIkludmFsaWQgSW5wdXQhIVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gW2VudGVyZWR0aXRsZSwgZW50ZXJlZGRlc2NyaXB0aW9uLCArZW50ZXJlZHBlb3BsZV07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhcklucHV0KCl7XG4gICAgICAgIHRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLnBlb3BsZUlucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xuXG4gICAgfVxuXG4gICAgQGF1dG9iaW5kXG4gICAgcHJpdmF0ZSBzdWJtaXRIYW5kbGVyKGV2ZW50OkV2ZW50KXtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgdXNlcklucHV0ID0gdGhpcy5nYXRoZXJVc2VySW5wdXQoKTtcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheSh1c2VySW5wdXQpKXtcbiAgICAgICAgICAgIGNvbnN0IFt0aXRsZSwgZGVzY3JpcHRpb24sIHBlb3BsZV0gPSB1c2VySW5wdXQ7XG4gICAgICAgICAgICBwcm9qZWN0U3RhdGUuYWRkUHJvamVjdCh0aXRsZSwgZGVzY3JpcHRpb24sIHBlb3BsZSk7XG4gICAgICAgICAgICB0aGlzLmNsZWFySW5wdXQoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gIFxufVxuIiwiaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSBcIi4uL21vZGVscy9kcmFnLWRyb3BcIjsgXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9iYXNlLWNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdFwiO1xuaW1wb3J0IHsgYXV0b2JpbmR9IGZyb20gXCIuLi9kZWNvcmF0b3IvYXV0b2JpbmRcIjtcblxuZXhwb3J0IGNsYXNzIFByb2plY3RJdGVtIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxUZW1wbGF0ZUVsZW1lbnQsIEhUTUxEaXZFbGVtZW50PiBpbXBsZW1lbnRzIERyYWdnYWJsZXtcblxuICAgIHByaXZhdGUgcHJvamVjdDogUHJvamVjdDtcblxuICAgIGdldCBwZXJzb25zKCl7XG4gICAgICAgIGlmKHRoaXMucHJvamVjdC5wZW9wbGUgPT09IDEpe1xuICAgICAgICAgICAgcmV0dXJuICcxIHBlcnNvbic7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMucHJvamVjdC5wZW9wbGV9IHBlcnNvbnNgO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKGhvc3RJZDogc3RyaW5nLCBwcm9qZWN0OiBQcm9qZWN0KXtcbiAgICAgICAgc3VwZXIoJ3NpbmdsZS1wcm9qZWN0Jyxob3N0SWQsIGZhbHNlLCBwcm9qZWN0LmlkKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgdGhpcy5yZW5kZXJjb250ZW50KCk7XG4gICAgICAgIHRoaXMuY29uZmlndXJlKCk7XG4gICAgfVxuICAgIFxuICAgIEBhdXRvYmluZFxuICAgIGRyYWdTdGFydEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCl7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuc2V0RGF0YSgndGV4dC9wbGFpbicsIHRoaXMucHJvamVjdC5pZCk7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuZHJvcEVmZmVjdCA9J21vdmUnO1xuICAgIH1cblxuICAgIEBhdXRvYmluZFxuICAgIGRyYWdFbmRIYW5kbGVyKF86IERyYWdFdmVudCk6IHZvaWQge1xuICAgIH1cblxuICAgIHB1YmxpYyByZW5kZXJjb250ZW50KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpdkVsZW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlclwiKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QudGl0bGU7XG4gICAgICAgIHRoaXMuZGl2RWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaDNcIikhLnRleHRDb250ZW50ID0gdGhpcy5wZXJzb25zICsgJyBhc3NpZ25lZCc7XG4gICAgICAgIHRoaXMuZGl2RWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiZGl2XCIpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC5kZXNjcmlwdGlvbjtcblxuICAgIH1cblxuICAgIHB1YmxpYyBjb25maWd1cmUoKTogdm9pZHtcbiAgICAgICAgdGhpcy5kaXZFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcik7XG4gICAgICAgIHRoaXMuZGl2RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgdGhpcy5kcmFnRW5kSGFuZGxlcik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tIFwiLi4vZGVjb3JhdG9yL2F1dG9iaW5kXCI7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9iYXNlLWNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRHJhZ1RhcmdldCB9IGZyb20gXCIuLi9tb2RlbHMvZHJhZy1kcm9wXCI7XG5pbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0U3RhdHVzfSBmcm9tIFwiLi4vbW9kZWxzL3Byb2plY3RcIjtcbmltcG9ydCB7IHByb2plY3RTdGF0ZX0gZnJvbSBcIi4uL3N0YXRlL3Byb2plY3Qtc3RhdGVcIjtcbmltcG9ydCB7IFByb2plY3RJdGVtIH0gZnJvbSBcIi4vcHJvamVjdC1pdGVtXCI7XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0TGlzdCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTERpdkVsZW1lbnQ+IGltcGxlbWVudHMgRHJhZ1RhcmdldHtcbiAgICBhc3NpZ25lZFByb2plY3RzOiBQcm9qZWN0W107XG5cbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSB0eXBlOiAnYWN0aXZlJyB8ICdmaW5pc2hlZCcgKXtcbiAgICAgICAgc3VwZXIoXCJwcm9qZWN0LWxpc3RcIixcImFwcFwiLGZhbHNlLGAke3R5cGV9LXByb2plY3RzLWxpc3RgKTtcbiAgICAgICAgdGhpcy5hc3NpZ25lZFByb2plY3RzID0gW107XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlcmNvbnRlbnQoKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmUoKTtcbiAgICB9XG5cbiAgICBAYXV0b2JpbmRcbiAgICBkcmFnT3ZlckhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgICAgICBpZihldmVudC5kYXRhVHJhbnNmZXIgJiYgZXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzWzBdID09PSAndGV4dC9wbGFpbicpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLmRpdkVsZW1lbnQucXVlcnlTZWxlY3RvcignZGl2JykhO1xuICAgICAgICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKCdkcm9wcGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBAYXV0b2JpbmRcbiAgICBkcm9wSGFuZGxlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgICAgY29uc3QgcHJqSWQgPSBldmVudC5kYXRhVHJhbnNmZXIhLmdldERhdGEoJ3RleHQvcGxhaW4nKTtcbiAgICAgICBwcm9qZWN0U3RhdGUubW92ZVByb2plY3QocHJqSWQsIHRoaXMudHlwZSA9PSAnYWN0aXZlJyA/IFByb2plY3RTdGF0dXMuQWN0aXZlIDogUHJvamVjdFN0YXR1cy5GaW5pc2hlZCk7XG4gICAgfVxuXG4gICAgQGF1dG9iaW5kXG4gICAgZHJhZ0xlYXZlSGFuZGxlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLmRpdkVsZW1lbnQucXVlcnlTZWxlY3RvcignZGl2JykhO1xuICAgICAgICBsaXN0LmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3BwYWJsZScpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW5kZXJjb250ZW50KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBsaXN0SWQgPSBgJHt0aGlzLnR5cGV9LXByb2plY3RzYDtcbiAgICAgICAgICAgIHRoaXMuZGl2RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdkaXYnKSEuaWQgPSBsaXN0SWQ7XG4gICAgICAgICAgICB0aGlzLmRpdkVsZW1lbnQucXVlcnlTZWxlY3RvcignaDEnKSEudGV4dENvbnRlbnQgPSB0aGlzLnR5cGUudG9VcHBlckNhc2UoKSArICcgUFJPSkVDVFMnO1xuICAgICAgICAgICAgdGhpcy5kaXZFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gxJykhLmNsYXNzTmFtZSA9IHRoaXMudHlwZSsnLWhlYWRlcic7XG4gIFxuICAgICAgfVxuXG4gICAgICBwdWJsaWMgY29uZmlndXJlKCl7XG4gICAgICAgICAgdGhpcy5kaXZFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5kcmFnT3ZlckhhbmRsZXIpO1xuICAgICAgICAgIHRoaXMuZGl2RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCB0aGlzLmRyYWdMZWF2ZUhhbmRsZXIpO1xuICAgICAgICAgIHRoaXMuZGl2RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5kcm9wSGFuZGxlcik7XG5cbiAgICAgICAgcHJvamVjdFN0YXRlLmFkZExpc3RlbmVyKChwcm9qZWN0czogYW55W10pPT57XG4gICAgICAgICAgICBjb25zdCByZWxldmVudFByb2plY3QgPSBwcm9qZWN0cy5maWx0ZXIocHJqID0+e1xuICAgICAgICAgICAgICAgIGlmKHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJqLnN0YXR1cyA9PT0gUHJvamVjdFN0YXR1cy5BY3RpdmU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwcmouc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSByZWxldmVudFByb2plY3Q7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclByb2plY3RzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIHByaXZhdGUgcmVuZGVyUHJvamVjdHMoKXtcbiAgICAgICAgY29uc3QgbGlzdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGhpcy50eXBlfS1wcm9qZWN0c2ApO1xuICAgICAgICBsaXN0RWwhLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGZvcihjb25zdCBwcm9qZWN0SXRlbSBvZiB0aGlzLmFzc2lnbmVkUHJvamVjdHMpe1xuICAgICAgICAgICAgbmV3IFByb2plY3RJdGVtKHRoaXMuZGl2RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdkaXYnKSEuaWQsIHByb2plY3RJdGVtKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlxuZXhwb3J0IGZ1bmN0aW9uIGF1dG9iaW5kKFxuICAgIHRhcmdldDogYW55LCBcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcsIFxuICAgIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikgXG4gICAge1xuICAgICAgICBjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgICAgIGNvbnN0IGFkakRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvciA9IHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBib3VuZEZuID0gb3JpZ2luYWxNZXRob2QuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm91bmRGbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGFkakRlc2NyaXB0b3I7XG59XG4iLCIgICAgZXhwb3J0IGVudW0gUHJvamVjdFN0YXR1cyB7XG4gICAgICAgIEFjdGl2ZSwgRmluaXNoZWRcbiAgICB9XG4gICAgXG4gICAgZXhwb3J0IGNsYXNzIFByb2plY3Qge1xuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IHN0cmluZyxcbiAgICAgICAgICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nLFxuICAgICAgICAgICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgICAgICAgICBwdWJsaWMgcGVvcGxlOiBudW1iZXIsXG4gICAgICAgICAgICBwdWJsaWMgc3RhdHVzOiBQcm9qZWN0U3RhdHVzKXtcbiAgICAgICAgfVxuICAgIH1cbiIsImltcG9ydCB7IFByb2plY3QsIFByb2plY3RTdGF0dXN9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdFwiO1xuXG50eXBlIExpc3RlbmVyPFQ+ID0gKGl0ZW1zOiBQcm9qZWN0W10pID0+IHZvaWQ7XG5cbmNsYXNzIFN0YXRlPFQ+IHtcbiAgICBwcm90ZWN0ZWQgbGlzdGVuZXI6IExpc3RlbmVyPFQ+W10gPSBbXTtcbiAgICBwdWJsaWMgYWRkTGlzdGVuZXIobGlzdGVuZXJGbjogTGlzdGVuZXI8VD4pe1xuICAgICAgICB0aGlzLmxpc3RlbmVyLnB1c2gobGlzdGVuZXJGbik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdFN0YXRlIGV4dGVuZHMgU3RhdGU8UHJvamVjdD57XG4gICAgcHJpdmF0ZSBwcm9qZWN0czogUHJvamVjdFtdID0gW107XG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFByb2plY3RTdGF0ZTtcbiAgICBcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFByb2plY3QodGl0bGU6c3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBwZW9wbGU6IG51bWJlcil7XG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChNYXRoLnJhbmRvbS50b1N0cmluZygpLCB0aXRsZSxkZXNjcmlwdGlvbixwZW9wbGUsIFByb2plY3RTdGF0dXMuQWN0aXZlKTtcblxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG4gICAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG1vdmVQcm9qZWN0KHByb2plY3RJZDogc3RyaW5nLCBuZXdTdGF0dXM6IFByb2plY3RTdGF0dXMpe1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gdGhpcy5wcm9qZWN0cy5maW5kKHByaiA9PiBwcmouaWQgPT0gcHJvamVjdElkKTtcbiAgICAgICAgaWYocHJvamVjdCAmJiBwcm9qZWN0LnN0YXR1cyAhPSBuZXdTdGF0dXMpe1xuICAgICAgICAgICAgcHJvamVjdC5zdGF0dXMgPSBuZXdTdGF0dXM7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVMaXN0ZW5lcnMoKXtcbiAgICAgICAgZm9yKGNvbnN0IGxpc3RlbmVyRm4gb2YgdGhpcy5saXN0ZW5lcil7XG4gICAgICAgICAgICBsaXN0ZW5lckZuKHRoaXMucHJvamVjdHMuc2xpY2UoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGdldEluc3RhbmNlKCl7XG4gICAgICAgIGlmKHRoaXMuaW5zdGFuY2Upe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBQcm9qZWN0U3RhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgcHJvamVjdFN0YXRlID0gUHJvamVjdFN0YXRlLmdldEluc3RhbmNlKCk7XG4iLCIgICAgZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0YWJsZXtcbiAgICAgICAgdmFsdWU6IHN0cmluZyB8IG51bWJlcixcbiAgICAgICAgcmVxdWlyZWQ/IDogYm9vbGVhbixcbiAgICAgICAgbWluTGVuZ3RoPzogbnVtYmVyLFxuICAgICAgICBtYXhMZW5ndGg/OiBudW1iZXIsXG4gICAgICAgIG1pbj86IG51bWJlcixcbiAgICAgICAgbWF4PzogbnVtYmVyXG4gICAgfVxuICAgIFxuICAgIGV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZSh2YWxpZGF0ZUlucHV0OiBWYWxpZGF0YWJsZSl7XG4gICAgICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcbiAgICAgICAgaWYodmFsaWRhdGVJbnB1dC5yZXF1aXJlZCl7XG4gICAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0ZUlucHV0LnZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA+IDA7XG4gICAgICAgIH0gXG4gICAgICAgIGlmKHZhbGlkYXRlSW5wdXQubWluTGVuZ3RoICE9IG51bGwgJiYgdHlwZW9mIHZhbGlkYXRlSW5wdXQudmFsdWUgPT09ICdzdHJpbmcnKXtcbiAgICAgICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRlSW5wdXQudmFsdWUubGVuZ3RoID4gdmFsaWRhdGVJbnB1dC5taW5MZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYodmFsaWRhdGVJbnB1dC5tYXhMZW5ndGggIT0gbnVsbCAmJiB0eXBlb2YgdmFsaWRhdGVJbnB1dC52YWx1ZSA9PT0gJ3N0cmluZycpe1xuICAgICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGVJbnB1dC52YWx1ZS5sZW5ndGggPCB2YWxpZGF0ZUlucHV0Lm1heExlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBpZih2YWxpZGF0ZUlucHV0Lm1pbiAhPSBudWxsICYmIHR5cGVvZiB2YWxpZGF0ZUlucHV0LnZhbHVlID09PSAnbnVtYmVyJyl7XG4gICAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0ZUlucHV0LnZhbHVlID4gdmFsaWRhdGVJbnB1dC5taW47XG4gICAgICAgIH1cbiAgICAgICAgaWYodmFsaWRhdGVJbnB1dC5tYXggIT0gbnVsbCAmJiB0eXBlb2YgdmFsaWRhdGVJbnB1dC52YWx1ZSA9PT0gJ251bWJlcicpe1xuICAgICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGVJbnB1dC52YWx1ZSA8IHZhbGlkYXRlSW5wdXQubWF4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xuICAgIH1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgUHJvamVjdElucHV0IH0gZnJvbSBcIi4vY29tcG9uZW50L3Byb2plY3QtaW5wdXRcIjtcbmltcG9ydCB7IFByb2plY3RMaXN0IH0gZnJvbSBcIi4vY29tcG9uZW50L3Byb2plY3QtbGlzdFwiO1xuXG5jb25zdCBwcm9qZWN0SW5wdXQgPSBuZXcgUHJvamVjdElucHV0KCk7XG5jb25zdCBhY3RpdmVQcm9qZWN0TGlzdCA9IG5ldyBQcm9qZWN0TGlzdCgnYWN0aXZlJyk7XG5jb25zdCBmaW5pc2hlZFByb2plY3RMaXN0ID0gbmV3IFByb2plY3RMaXN0KCdmaW5pc2hlZCcpO1xuY29uc29sZS5sb2coJ0kgZ2V0IGNhbGxlZCBmcm9tIHByaW50LmpzISBIZWxsb3cgdGhlcmUnKTsiXSwic291cmNlUm9vdCI6IiJ9