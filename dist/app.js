"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectStats;
(function (ProjectStats) {
    ProjectStats[ProjectStats["ACTIVE"] = 0] = "ACTIVE";
    ProjectStats[ProjectStats["INACTIVE"] = 1] = "INACTIVE";
})(ProjectStats || (ProjectStats = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class ProjectState {
    constructor() {
        this.listners = [];
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addListner(listnerfn) {
        this.listners.push(listnerfn);
    }
    addProject(title, description, people) {
        const newProject = new Project(Math.random().toString(), title, description, people, ProjectStats.ACTIVE);
        console.log(newProject);
        this.projects.push(newProject);
        for (const listnerfn of this.listners) {
            listnerfn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
function valiadte(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().length !== 0;
    }
    if (validatableInput.maxLength) {
        isValid = isValid && validatableInput.value.toString().length <= validatableInput.maxLength;
    }
    if (validatableInput.minLength) {
        isValid = isValid && validatableInput.value.toString().length >= validatableInput.minLength;
    }
    if (validatableInput.max) {
        isValid = isValid && typeof validatableInput.value === 'number' && validatableInput.value < validatableInput.max;
    }
    if (validatableInput.min) {
        isValid = isValid && typeof validatableInput.value === 'number' && validatableInput.value > validatableInput.min;
    }
    return isValid;
}
function AutoBind(_, ___, descriptor) {
    return {
        configurable: true,
        enumerable: true,
        get() {
            const originalMethod = descriptor.value;
            return originalMethod.bind(this);
        }
    };
}
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templeteElement = document.querySelector('#project-list');
        this.hostElement = document.querySelector('#app');
        this.assignedProjects = [];
        const importedNode = document.importNode(this.templeteElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        projectState.addListner((projects) => {
            const releventProjects = projects.filter(project => {
                if (this.type === 'active') {
                    return project.status === ProjectStats.ACTIVE;
                }
                else {
                    return project.status === ProjectStats.INACTIVE;
                }
            });
            this.assignedProjects = releventProjects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const listEl = document.querySelector(`#${this.type}-projects-list`);
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = `${this.type.toUpperCase()}-PROJECTS`;
    }
    attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
}
class ProjectInput {
    constructor() {
        this.templeteElement = document.querySelector('#project-input');
        this.hostElement = document.querySelector('#app');
        const importedNode = document.importNode(this.templeteElement.content, true);
        this.formElement = importedNode.firstElementChild;
        this.formElement.id = 'user-input';
        this.titleInputElememt = this.formElement.querySelector('#title');
        this.descriptionInputElememt = this.formElement.querySelector('#description');
        this.peopleInputElememt = this.formElement.querySelector('#people');
        this.configure();
        this.attach();
    }
    submitHandler(e) {
        e.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);
        }
        this.clearInputs();
    }
    clearInputs() {
        this.titleInputElememt.value = '';
        this.descriptionInputElememt.value = '';
        this.peopleInputElememt.value = '';
    }
    gatherUserInput() {
        const title = this.titleInputElememt.value;
        const description = this.descriptionInputElememt.value;
        const people = this.peopleInputElememt.value;
        if (valiadte({ value: title, required: true, minLength: 1, maxLength: 15 }) &&
            valiadte({ value: description, required: true, minLength: 10, maxLength: 50 }) &&
            valiadte({ value: +people, required: true, min: 1, max: 10 })) {
            return [title, description, +people];
        }
        alert('Not valid values');
        return;
    }
    configure() {
        this.formElement.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "submitHandler", null);
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
