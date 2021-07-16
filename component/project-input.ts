import { Component } from "./base-component";
import { validate, Validatable } from "../utill/validation";
import { autobind} from "../decorator/autobind";
import { projectState} from "../state/project-state";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor(){
        console.log("inout");
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
            projectState.addProject(title, description, people);
            this.clearInput();
        }
        
    }
  
}
