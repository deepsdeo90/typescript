class ProjectState{
    private projects: any[] = [];
    private static instance: ProjectState;
    private listener: any[] = [];

    private constructor(){

    }

    public addProject(title:string, description: string, people: number){
        const newProject = {
            id: Math.random().toString(),
            title: title,
            description:description,
            people: people
        }
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

    public addListener(listenerFn: Function){
        this.listener.push(listenerFn);
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

class ProjectList {
    templateElement : HTMLTemplateElement;
    hostElement : HTMLDivElement;
    element: HTMLDivElement;
    assignedProjects: any[];

    constructor( private type: 'active' | 'finished' ){
        this.templateElement = document.getElementById("project-list") as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLDivElement;
        this.assignedProjects = [];
        this.element.id = `${this.type}-projects`;
        projectState.addListener((projects: any[])=>{
            this.assignedProjects = projects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }

    private renderProjects(){
        const listEl = document.getElementById(`${this.type}-projects`);
        for(const projectItem of this.assignedProjects){
            const header = document.createElement('header');
                  header.innerText = projectItem.title;
            const peopleDiv = document.createElement('div');
                  peopleDiv.className = 'people';
                  peopleDiv.innerText = projectItem.people;      
            const descDiv = document.createElement('div');
                  descDiv.className = 'description';
                  descDiv.innerText = projectItem.description;

            const cardDiv = document.createElement('div');
                  cardDiv.className = 'card';
                  cardDiv.appendChild(header);
                  cardDiv.appendChild(peopleDiv);
                  cardDiv.appendChild(descDiv);

            listEl?.appendChild(cardDiv);
        }
    }

    private renderContent(){
        this.element.querySelector('h1')!.textContent = this.type.toUpperCase() + ' PROJECTS'; 
    }

    private attach(){
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}

class ProjectInput {
    templateElement : HTMLTemplateElement;
    hostElement : HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor(){
        this.templateElement = document.getElementById("project")! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        
        this.titleInputElement = this.element.querySelector("#title")! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector("#description")! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector("#people")! as HTMLInputElement;

        this.configure();
        this.attach();
        

    }
    private attach(){
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
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

    private configure(){
        this.element.addEventListener('submit', this.submitHandler)
    }
}
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');