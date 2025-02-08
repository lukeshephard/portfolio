import { projectDatabase } from "./projectDatabase";

export class Project {
    private name: string;
    private title: string;
    private isPrivate: boolean;

    public static ALL_PROJECTS() {
        return ALL_PROJECTS;
    }

    public static CreateFromObject(obj : {[key: string]: unknown}) {
        const pName = obj.name ? obj.name as string : "";
        const pTitle = obj.title ? obj.title as string : "Unnamed Project";
        const pIsPrivate = obj.isPrivate ? obj.isPrivate as boolean : false;

        return new Project(pName, pTitle, pIsPrivate)
    }

    private constructor(name: string, title: string, isPrivate: boolean) {
        this.name = name;
        this.title = title;
        this.isPrivate = isPrivate;
    }

    getName() {
        return this.name;
    }

    getTitle() {
        return this.title;
    }

    getIsPrivate() {
        return this.isPrivate;
    }
}

function createProjects(): Project[] {
    const allProjects: Project[] = []
    for (let i = 0; i < projectDatabase.length; i++) {
        allProjects.push(Project.CreateFromObject(projectDatabase[i]))
    }
    return allProjects
}

const ALL_PROJECTS: Project[] = createProjects()

