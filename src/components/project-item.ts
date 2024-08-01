import { AutoBind } from '../decorators/autobind.js';
import { Draggable } from '../Model/drag-and-drop.js';
import { Project } from '../Model/project.js';
import Component  from './base-component.js';

// Project Item Class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    private get peopleAssignedText(): string {
        if (this.project.people > 1) {
            return `${this.project.people} persons assigned`
        }
        return `1 person assigned`

    }
    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }

    @AutoBind
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    @AutoBind
    dragEndHandler(event: DragEvent) {
        console.log("The drag ended!")
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler)
        this.element.addEventListener("dragend", this.dragEndHandler)
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.peopleAssignedText;
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}
