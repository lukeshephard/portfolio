import dayjs, { Dayjs } from "dayjs";
import { NameLink } from "../template/link/nameLink";
import { NavLink } from "../template/link/navLink";
import { Language } from "./language";
import { projectDatabase } from "./projectDatabase";

export class Project {
    private name: string;
    private title: string;
    private summary: string;
    private description: string;
    private languages: Language[];

    private created: Dayjs;
    private lastEdited: Dayjs;

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
        const pSummary = obj.summary ? obj.summary as string : "";
        const pDescription = obj.description ? obj.description as string : "";
        const pLanguages = obj.languages ? obj.languages as Language[] : [];

        const pCreated = obj.created ? dayjs.unix(obj.created as number) : dayjs(null)  
        const pLastEdited = obj.lastEdited ? dayjs.unix(obj.lastEdited as number) : dayjs(null);

        const pIsPrivate = obj.isPrivate == undefined ? false: obj.isPrivate as boolean
        const pIsWebsite = obj.isWebsite == undefined ? true : obj.isWebsite as boolean

        return new Project(pName, pTitle, pSummary, pDescription, pLanguages, pCreated, pLastEdited, pIsPrivate, pIsWebsite)
    }

    public static getProjectByName(name: string) {
        if (!(name in ALL_PROJECTS)) {
            return Project.CreateFromObject({})
        }
        return ALL_PROJECTS[name]
    }

    private constructor(name: string, title: string, summary: string, description: string, languages: Language[], created: Dayjs, lastEdited: Dayjs, isPrivate: boolean, isWebsite: boolean) { // Always has to go through CreateFromObject
        this.name = name;
        this.title = title;
        this.summary = summary;
        this.description = description;
        this.languages = languages;

        this.created = created;
        this.lastEdited = lastEdited;

        this.isPrivate = isPrivate;
        this.isWebsite = isWebsite;
        this.informationLink = new NavLink(this.title, "/projects/view?name=" + this.name);
        this.websiteLink = new NameLink(this.title + " - website", "https://" + this.name + ".ShephardLuke.co.uk", isWebsite);
        this.githubLink = new NameLink(this.title + " - GitHub repository", "https://github.com/ShephardLuke/" + this.name, !isPrivate)

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

    getLanguages() {
        return this.languages;
    }

    getDescription() {
        return this.description;
    }

    getCreated() {
        return this.created;
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

