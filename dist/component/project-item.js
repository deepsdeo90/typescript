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
import { autobind } from "../decorator/autobind.js";
export class ProjectItem extends Component {
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
//# sourceMappingURL=project-item.js.map