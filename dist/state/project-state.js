import { Project, ProjectStatus } from "../models/project.js";
class State {
    constructor() {
        this.listener = [];
    }
    addListener(listenerFn) {
        this.listener.push(listenerFn);
    }
}
export class ProjectState extends State {
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
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map