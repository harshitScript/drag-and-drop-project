
function AutoBind(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    return {
        configurable: true,
        enumerable: true,
        get() {
            const originalMethod = descriptor.value;
            return originalMethod.bind(this)
        }
    }
}
class ProjectInput {
    templeteElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    formElement: HTMLFormElement;
    titleInputElememt: HTMLInputElement;
    descriptionInputElememt: HTMLTextAreaElement;
    peopleInputElememt: HTMLInputElement;
    constructor() {
        this.templeteElement = document.querySelector('#project-input')!
        this.hostElement = document.querySelector('#app')!

        const importedNode = document.importNode(this.templeteElement.content, true); //? used to select the entire content of dom element.
        this.formElement = <HTMLFormElement>importedNode.firstElementChild!;
        this.formElement.id = 'user-input'

        this.titleInputElememt = this.formElement.querySelector('#title')!
        this.descriptionInputElememt = this.formElement.querySelector('#description')!
        this.peopleInputElememt = this.formElement.querySelector('#people')!

        this.configure();
        this.attach();
    }

    @AutoBind
    private submitHandler(e: Event) {
        e.preventDefault();
        console.log(this.titleInputElememt.value);
    }

    private configure() {
        this.formElement.addEventListener('submit', this.submitHandler)
    }

    private attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
    }
}

const projectInput = new ProjectInput();