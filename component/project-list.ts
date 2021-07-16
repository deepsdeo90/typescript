import { autobind } from "../decorator/autobind";
import { Component } from "./base-component";
import { DragTarget } from "../models/drag-drop";
import { Project, ProjectStatus} from "../models/project";
import { projectState} from "../state/project-state";
import { ProjectItem } from "./project-item";

export class ProjectList extends Component<HTMLDivElement, HTMLDivElement> implements DragTarget{
    assignedProjects: Project[];

    constructor( private type: 'active' | 'finished' ){
        super("project-list","app",false,`${type}-projects-list`);
        this.assignedProjects = [];
        
        this.rendercontent();
        this.configure();
    }

    @autobind
    dragOverHandler(event: DragEvent): void {
        if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){
            event.preventDefault();
            const list = this.divElement.querySelector('div')!;
            list.classList.add('droppable');
        }
        
    }

    @autobind
    dropHandler(event: DragEvent): void {
       const prjId = event.dataTransfer!.getData('text/plain');
       projectState.moveProject(prjId, this.type == 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }

    @autobind
    dragLeaveHandler(event: DragEvent): void {
        event.preventDefault();
        const list = this.divElement.querySelector('div')!;
        list.classList.remove('droppable');
    }

    public rendercontent(): void {
        const listId = `${this.type}-projects`;
            this.divElement.querySelector('div')!.id = listId;
            this.divElement.querySelector('h1')!.textContent = this.type.toUpperCase() + ' PROJECTS';
            this.divElement.querySelector('h1')!.className = this.type+'-header';
  
      }

      public configure(){
          this.divElement.addEventListener('dragover', this.dragOverHandler);
          this.divElement.addEventListener('dragleave', this.dragLeaveHandler);
          this.divElement.addEventListener('drop', this.dropHandler);

        projectState.addListener((projects: any[])=>{
            const releventProject = projects.filter(prj =>{
                if(this.type === 'active'){
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = releventProject;
            this.renderProjects();
        });
      }
    private renderProjects(){
        const listEl = document.getElementById(`${this.type}-projects`);
        listEl!.innerHTML = "";
        for(const projectItem of this.assignedProjects){
            new ProjectItem(this.divElement.querySelector('div')!.id, projectItem);
        }
    }
}
