export abstract class Component<T extends HTMLElement, U extends HTMLElement>{
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
