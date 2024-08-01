/// <reference path='./base-component.ts' />
/// <reference path='../decorators/autobind.ts'/>
/// <reference path='../utils/validation.ts'/>
/// <reference path='../Model/drag-and-drop.ts'/>
/// <reference path='../Model/project.ts'/>
/// <reference path='../state/project-state.ts'/>

namespace App {
    // Project List Class
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
        assignedProjects: Project[];
    
        constructor(private type: 'active' | 'finished') {
            super('project-list', 'app', false, `${type}-projects`);
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
    
        configure() {
            this.element.querySelector('ul')!.addEventListener('dragover', this.dragOverHandler);
            this.element.querySelector('ul')!.addEventListener('drop', this.dropHandler);
            this.element.querySelector('ul')!.addEventListener('dragleave', this.dragLeaveHandler);
            projectState.addListener((projects: Project[]) => {
                const relevantProjects = projects.filter(prj => {
                    if (this.type === 'active') {
                        return prj.status === ProjectStatus.ACTIVE;
                    }
                    return prj.status === ProjectStatus.FINISHED;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }
    
        @AutoBind
        dragOverHandler(event: DragEvent): void {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault(); // To overcome the default behaviour of javaScript 'not to allow drop'
                this.element.querySelector('ul')!.classList.add('droppable')
            }
    
        }
    
        @AutoBind
        dropHandler(event: DragEvent): void {
            projectState.moveProject(event.dataTransfer!.getData('text/plain'), this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED)
        }
    
        @AutoBind
        dragLeaveHandler(event: DragEvent): void {
            this.element.querySelector('ul')!.classList.remove('droppable')
        }
    
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector('ul')!.id = listId;
            this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECTS`;
        }
    
        private renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
            listEl.innerHTML = '';
            for (const prjItem of this.assignedProjects) {
                new ProjectItem(listEl.id, prjItem);
            }
        }
    }
    
}