import { Draggable } from "../models/drag-drop.js"; 
import { Component } from "./base-component.js";
import { Project } from "../models/project.js";
import { autobind} from "../decorator/autobind.js";

export class ProjectItem extends Component<HTMLTemplateElement, HTMLDivElement> implements Draggable{

    private project: Project;

    get persons(){
        if(this.project.people === 1){
            return '1 person';
        }else{
            return `${this.project.people} persons`;
        }
    }
    constructor(hostId: string, project: Project){
        super('single-project',hostId, false, project.id);
        this.project = project;
        this.rendercontent();
        this.configure();
    }
    
    @autobind
    dragStartHandler(event: DragEvent){
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.dropEffect ='move';
    }

    @autobind
    dragEndHandler(_: DragEvent): void {
    }

    public rendercontent(): void {
        this.divElement.querySelector("header")!.textContent = this.project.title;
        this.divElement.querySelector("h3")!.textContent = this.persons + ' assigned';
        this.divElement.querySelector("div")!.textContent = this.project.description;

    }

    public configure(): void{
        this.divElement.addEventListener('dragstart', this.dragStartHandler);
        this.divElement.addEventListener('dragend', this.dragEndHandler);
    }
}
