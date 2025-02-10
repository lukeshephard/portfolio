import { NameLink } from "../template/link/nameLink";
import { NavLink } from "../template/link/navLink";
import { projectDatabase } from "./projectDatabase";

export class Project {
    private name: string;
    private title: string;
    private summary: string;
    private description: string;
    private lastEdited: Date;

    private isPrivate: boolean;
    private informationLink: NavLink;
    private isWebsite: boolean;
    private githubLink: NameLink;
    private websiteLink: NameLink;

    public static ALL_PROJECTS(): {[key: string]: Project} { // Gets every project
        return ALL_PROJECTS;
    }

    public static CreateFromObject(obj : {[key: string]: unknown}) { // Creates a project from an object with any keys (every parameter is optional)
        const pName = obj.name ? obj.name as string : "";
        const pTitle = obj.title ? obj.title as string : "Unnamed Project";
        const pSummary = obj.summary ? obj.summary as string: "";
        const pDescription = obj.description ? obj.description as string : "";
        const pLastEdited = obj.lastEdited ? new Date(obj.lastEdited as number) : new Date(NaN);

        const pIsPrivate = obj.isPrivate == undefined ? false: obj.isPrivate as boolean
        const pIsWebsite = obj.isWebsite == undefined ? true : obj.isWebsite as boolean

        return new Project(pName, pTitle, pSummary, pDescription,  pLastEdited, pIsPrivate, pIsWebsite)
    }

    public static getProjectByName(name: string) {
        if (!(name in ALL_PROJECTS)) {
            return Project.CreateFromObject({})
        }
        return ALL_PROJECTS[name]
    }

    private constructor(name: string, title: string, summary: string, description: string, lastEdited: Date, isPrivate: boolean, isWebsite: boolean) { // Always has to go through CreateFromObject
        this.name = name;
        this.title = title;
        this.summary = summary;
        this.description = description;
        this.lastEdited = lastEdited;

        this.isPrivate = isPrivate;
        this.isWebsite = isWebsite;
        this.informationLink = new NavLink(this.title, "/projects/view?name=" + this.name);
        this.websiteLink = new NameLink(this.title + " website", "https://" + this.name + ".ShephardLuke.co.uk", isWebsite);
        this.githubLink = new NameLink(this.title + " on Github", "https://github.com/ShephardLuke/" + this.name, !isPrivate)

    }

    getName() {
        return this.name;
    }

    getTitle() {
        return this.title;
    }

    getSummary() {
        return this.summary;
    }

    getDescription() {
        return this.description;
    }

    getLastEdited() {
        return this.lastEdited;
    }

    getIsPrivate() {
        return this.isPrivate;
    }

    getInformationLink() {
        return this.informationLink;
    }

    getWebsiteLink() {
        return this.websiteLink;
    }

    getGithubLink() {
        return this.githubLink;
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

