var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autobind } from "../decorator/autobind.js";
import { Component } from "./base-component.js";
import { ProjectStatus } from "../models/project.js";
import { projectState } from "../state/project-state.js";
import { ProjectItem } from "./project-item.js";
export class ProjectList extends Component {
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
//# sourceMappingURL=project-list.js.map