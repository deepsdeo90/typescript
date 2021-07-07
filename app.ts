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
        
        if(enteredtitle.trim().length == 0 || entereddescription.trim().length == 0 || enteredpeople.trim().length == 0){
            alert("Invalid Input!!");
            return;
        }else{
            return [enteredtitle, entereddescription, +enteredpeople];
        }
        
    }
    @autobind
    private submitHandler(event:Event){
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if(Array.isArray(userInput)){
            const [title, description, people] = userInput;
            console.log(title+" "+description+" "+people);
        }
        
    }

    private configure(){
        this.element.addEventListener('submit', this.submitHandler)
    }
}
const projectInput = new ProjectInput();