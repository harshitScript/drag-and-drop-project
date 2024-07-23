"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function AutoBind(target, methodName, descriptor) {
    return {
        configurable: true,
        enumerable: true,
        get() {
            const originalMethod = descriptor.value;
            return originalMethod.bind(this);
        }
    };
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
        console.log(this.titleInputElememt.value);
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
