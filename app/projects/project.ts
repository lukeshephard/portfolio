import { NavLink } from "../template/link/navLink";
import { projectDatabase } from "./projectDatabase";

export class Project {
    private name: string;
    private title: string;
    private isPrivate: boolean;
    private informationLink: NavLink;

    public static ALL_PROJECTS(): {[key: string]: Project} { // Gets every project
        return ALL_PROJECTS;
    }

    public static CreateFromObject(obj : {[key: string]: unknown}) { // Creates a project from an object with any keys (anything can be empty)
        const pName = obj.name ? obj.name as string : "";
        const pTitle = obj.title ? obj.title as string : "Unnamed Project";
        const pIsPrivate = obj.isPrivate ? obj.isPrivate as boolean : false;

        return new Project(pName, pTitle, pIsPrivate)
    }

    public static getPorjectByName(name: string) {
        return ALL_PROJECTS[name]
    }

    private constructor(name: string, title: string, isPrivate: boolean) {
        this.name = name;
        this.title = title;
        this.isPrivate = isPrivate;
        this.informationLink = new NavLink(this.title, "projects/view?name=" + this.name);
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

    getInformationLink() {
        return this.informationLink;
    }
}

function createProjects(): {[key: string]: Project} { // Create an array of projects from a list of objects
    const allProjects: {[key: string]: Project} = {}
    for (let i = 0; i < projectDatabase.length; i++) {
        allProjects[projectDatabase[i].name] = (Project.CreateFromObject(projectDatabase[i]))
    }
    return allProjects
}

const ALL_PROJECTS: {[key: string]: Project} = createProjects()

