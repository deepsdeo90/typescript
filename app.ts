enum ProjectStatus {
    Active, Finished
}

class Project {
    constructor(public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus){
    }
}

type Listener<T> = (items: Project[]) => void;

class State<T> {
    protected listener: Listener<T>[] = [];
    public addListener(listenerFn: Listener<T>){
        this.listener.push(listenerFn);
    }
}

class ProjectState extends State<Project>{
    private projects: Project[] = [];
    private static instance: ProjectState;
    
    private constructor(){
        super();
    }

    public addProject(title:string, description: string, people: number){
        const newProject = new Project(Math.random.toString(), title,description,people, ProjectStatus.Active);

        this.projects.push(newProject);
        for(const listenerFn of this.listener){
            listenerFn(this.projects.slice());
        }
    }
    static getInstance(){
        if(this.instance){
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
}

const projectState = ProjectState.getInstance();

function autobind(
    target: any, 
    methodName: string, 
    descriptor: PropertyDescriptor) 
    {
        const originalMethod = descriptor.value;
        const adjDescriptor: PropertyDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            }
        };
        return adjDescriptor;
}

interface Validatable{
    value: string | number,
    required? : boolean,
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number
}

function validate(validateInput: Validatable){
    let isValid = true;
    if(validateInput.required){
        isValid = isValid && validateInput.value.toString().trim().length > 0;
    } 
    if(validateInput.minLength != null && typeof validateInput.value === 'string'){
        isValid = isValid && validateInput.value.length > validateInput.minLength;
    }
    if(validateInput.maxLength != null && typeof validateInput.value === 'string'){
        isValid = isValid && validateInput.value.length < validateInput.maxLength;
    }
    if(validateInput.min != null && typeof validateInput.value === 'number'){
        isValid = isValid && validateInput.value > validateInput.min;
    }
    if(validateInput.max != null && typeof validateInput.value === 'number'){
        isValid = isValid && validateInput.value < validateInput.max;
    }
    return isValid;
}

abstract class Component<T extends HTMLElement, U extends HTMLElement>{
    templateElement : HTMLTemplateElement;
    hostElement : T;
    divElement : U;
    positionAtStart: boolean;
  
    constructor(templateId: string, hostElementId: string, positionAtStart: boolean, newElementId?: string){
        this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.divElement = importedNode.firstElementChild as U;
        if(newElementId){
            this.divElement.id = newElementId;
        }
        this.positionAtStart = positionAtStart;
        this.attach();
    }

    private attach(){
        const position = this.positionAtStart ? 'afterbegin': 'beforeend';
        this.hostElement.insertAdjacentElement(position, this.divElement);
    }
    abstract rendercontent(): void;
    abstract configure(): void;
}
class ProjectList extends Component<HTMLDivElement, HTMLDivElement> {
    assignedProjects: Project[];

    constructor( private type: 'active' | 'finished' ){
        super("project-list","app",false,`${type}-projects`);
        this.assignedProjects = [];
        
        this.rendercontent();
        this.configure();
    }

    public rendercontent(): void {
        const headerElement = document.getElementById(`${this.type}-projects`)?.getElementsByTagName("h1")[0];
        console.log(document.getElementById(`${this.type}-projects`));
        
        if(headerElement){
            headerElement.className = this.type+'-header';
            headerElement.innerText = this.type.toUpperCase() + ' PROJECTS';
        }
      }

      public configure(){
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
        const listEl = document.getElementById(`${this.type}-projects`)?.getElementsByTagName("div")[0];;
        listEl!.innerHTML = "";
        for(const projectItem of this.assignedProjects){
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

            listEl?.append(cardDiv);
        }
    }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor(){
        super("project", "app", true);
        this.titleInputElement = this.divElement.querySelector("#title")! as HTMLInputElement;
        this.descriptionInputElement = this.divElement.querySelector("#description")! as HTMLInputElement;
        this.peopleInputElement = this.divElement.querySelector("#people")! as HTMLInputElement;

        this.configure();
    }
    public configure(){
        this.divElement.addEventListener('submit', this.submitHandler)
    }
    public rendercontent(){

    }
    
    private gatherUserInput(): [string, string, number] | void {
        const enteredtitle = this.titleInputElement.value;
        const entereddescription = this.descriptionInputElement.value;
        const enteredpeople = this.peopleInputElement.value;
        const validationRuleForTitle : Validatable = {
            value: enteredtitle,
            required: true,
            minLength: 5,
            maxLength: 15
        };
        const validationRuleForDescription : Validatable = {
            value: entereddescription,
            required: true,
            minLength: 5,
            maxLength: 100
        };
        const validationRuleForPeople : Validatable = {
            value: enteredpeople,
            required: true,
            min:1,
            max:11
        };

        const isValid = validate(validationRuleForTitle) && validate(validationRuleForDescription) && validate(validationRuleForPeople);

        if(!isValid){
            alert("Invalid Input!!");
            return;
        }else{
            return [enteredtitle, entereddescription, +enteredpeople];
        }
        
    }

    private clearInput(){
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';

    }

    @autobind
    private submitHandler(event:Event){
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if(Array.isArray(userInput)){
            const [title, description, people] = userInput;
            console.log(title+" "+description+" "+people);
            projectState.addProject(title, description, people);
            this.clearInput();
        }
        
    }
  
}
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');