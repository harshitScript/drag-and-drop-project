namespace App {
    type Listener<T> = (items: T[]) => void

    class State<T> {
        protected listeners: Listener<T>[] = [];
        constructor() { }
        addListener(listenerFn: Listener<T>) {
            this.listeners.push(listenerFn);
        }
    }

    // Project State Management Singleton Class
    export class ProjectState extends State<Project> {
        private projects: Project[] = [];
        private static instance: ProjectState

        private constructor() {
            super();
        }

        static getInstance() {
            if (this.instance) {
                return this.instance
            }
            this.instance = new ProjectState()
            return this.instance
        }

        addProject(title: string, description: string, people: number) {
            const newProject = new Project(
                Math.random().toString(),
                title,
                description,
                people,
                ProjectStatus.ACTIVE
            );
            this.projects.push(newProject);
            this.updateListeners();
        }

        moveProject(projectId: string, newStatus: ProjectStatus) {
            const project = this.projects.find(project => project.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners()
            }
        }

        private updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice()); // new copy of the array
            }
        }
    }

    export const projectState = ProjectState.getInstance();
}