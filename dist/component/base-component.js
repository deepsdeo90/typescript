export class Component {
    constructor(templateId, hostElementId, positionAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.divElement = importedNode.firstElementChild;
        if (newElementId) {
            this.divElement.id = newElementId;
        }
        this.positionAtStart = positionAtStart;
        this.attach();
    }
    attach() {
        const position = this.positionAtStart ? 'afterbegin' : 'beforeend';
        this.hostElement.insertAdjacentElement(position, this.divElement);
    }
}
//# sourceMappingURL=base-component.js.map