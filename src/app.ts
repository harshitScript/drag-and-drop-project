// Project State Mangement Singleton Class
class ProjectState {
    private listners: Array<any> = [];
    private projects: Array<any> = [];
    private static instance: ProjectState
    private constructor() {

    }

    static getInstance() {
        if (this.instance) {
            return this.instance
        }
        this.instance = new ProjectState()
        return this.instance
    }

    addListner(listnerfn: any) {
        this.listners.push(listnerfn);
    }

    addProject(title: string, description: string, people: number) {
        const newProject = { title, description, people };
        this.projects.push(newProject);
        for (const listnerfn of this.listners) {
            listnerfn(this.projects.slice());// new copy of the array
        }
    }
}

const projectState = ProjectState.getInstance();


// VALIDATION
interface Validatable {
    value: string | number;
    required: boolean;
    maxLength?: number;
    minLength?: number;
    max?: number;
    min?: number;
}

function valiadte(validatableInput: Validatable) {
    let isValid = true
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().length !== 0
    }
    if (validatableInput.maxLength) {
        isValid = isValid && validatableInput.value.toString().length <= validatableInput.maxLength
    }
    if (validatableInput.minLength) {
        isValid = isValid && validatableInput.value.toString().length >= validatableInput.minLength
    }
    if (validatableInput.max) {
        isValid = isValid && typeof validatableInput.value === 'number' && validatableInput.value < validatableInput.max
    }
    if (validatableInput.min) {
        isValid = isValid && typeof validatableInput.value === 'number' && validatableInput.value > validatableInput.min
    }
    return isValid
}


// AutoBind Decorator
function AutoBind(_: any, ___: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    return {
        configurable: true,
        enumerable: true,
        get() {
            const originalMethod = descriptor.value;
            return originalMethod.bind(this)
        }
    }
}

// Project List class
class ProjectList {
    templeteElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: any[];
    constructor(private type: 'active' | 'finished') {
        this.templeteElement = document.querySelector('#project-list')!
        this.hostElement = document.querySelector('#app')!
        this.assignedProjects = [];
        const importedNode = document.importNode(this.templeteElement.content, true); //? used to select the entire content of dom element.
        this.element = <HTMLElement>importedNode.firstElementChild!;
        this.element.id = `${this.type}-projects`;
        projectState.addListner((projects: any[]) => {
            this.assignedProjects = projects
            this.renderProjects();
        })
        this.attach();
        this.renderContent();
    }

    private renderProjects() {
        const listEl = <HTMLUListElement>document.querySelector(`#${this.type}-projects-list`)!
        for (const prjItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = prjItem.title
            listEl.appendChild(listItem)
        }
    }

    private renderContent() {
        const listId = `${this.type}-projects-list`
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()}-PROJECTS`;
    }

    private attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
}


// Project Input Class
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
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);
        }
        this.clearInputs()
    }

    private clearInputs() {
        this.titleInputElememt.value = ''
        this.descriptionInputElememt.value = ''
        this.peopleInputElememt.value = ''
    }

    private gatherUserInput(): [string, string, number] | void {
        const title = this.titleInputElememt.value
        const description = this.descriptionInputElememt.value
        const people = this.peopleInputElememt.value
        if (valiadte({ value: title, required: true, minLength: 1, maxLength: 15 }) &&
            valiadte({ value: description, required: true, minLength: 10, maxLength: 50 }) &&
            valiadte({ value: +people, required: true, min: 1, max: 10 })) {
            return [title, description, +people]
        }
        alert('Not valid values')
        return;
    }

    private configure() {
        this.formElement.addEventListener('submit', this.submitHandler)
    }

    private attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
    }
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');