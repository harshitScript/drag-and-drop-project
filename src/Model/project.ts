namespace App{
    export enum ProjectStatus { ACTIVE, FINISHED } // general convention of enum to use capital letters
    export class Project {
        constructor(
            public id: string,
            public title: string,
            public description: string,
            public people: number,
            public status: ProjectStatus
        ) { }
    }
}