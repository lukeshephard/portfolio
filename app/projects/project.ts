import dayjs, { Dayjs } from "dayjs";
import { NameLink } from "../template/link/nameLink";
import { NavLink } from "../template/link/navLink";
import { Language } from "./language";
import { projectDatabase } from "./projectDatabase";

type ProjectObject = {
    name: string;
    title: string;
    summary: string;
    description: string;
    languages: Language[];

    created: Dayjs;
    lastEdited: Dayjs;

    isPrivate: boolean;
    isWebsite: boolean;
    
    hasMainImage: boolean;
}

export class Project {
    private name: string;
    private title: string;
    private summary: string;
    private description: string;
    private languages: Language[];

    private created: Dayjs;
    private lastEdited: Dayjs;

    private isPrivate: boolean;
    private isWebsite: boolean;

    private mainImagePath: string;

    private informationLink: NavLink;
    private githubLink: NameLink;
    private websiteLink: NameLink;

    public static ALL_PROJECTS(): {[key: string]: Project} { // Gets every project
        return ALL_PROJECTS;
    }

    public static CreateFromObject(obj : {[key: string]: unknown}) { // Creates a project from an object with any keys (every parameter is optional)
        const objWithDefaults = structuredClone(obj);
        objWithDefaults.name = obj.name ? obj.name as string : "";
        objWithDefaults.title = obj.title ? obj.title as string : "Unnamed Project";
        objWithDefaults.summary = obj.summary ? obj.summary as string : "";
        objWithDefaults.description = obj.description ? obj.description as string : "";
        objWithDefaults.languages = obj.languages ? obj.languages as Language[] : [];

        objWithDefaults.created = obj.created ? dayjs.unix(obj.created as number) : dayjs(null)  
        objWithDefaults.lastEdited = obj.lastEdited ? dayjs.unix(obj.lastEdited as number) : dayjs(null);

        objWithDefaults.isPrivate = obj.isPrivate == undefined ? false: obj.isPrivate as boolean
        objWithDefaults.isWebsite = obj.isWebsite == undefined ? true : obj.isWebsite as boolean

        objWithDefaults.hasMainImage = obj.hasMainImage == undefined ? true : obj.hasMainImage as boolean

        return new Project(objWithDefaults as ProjectObject)
    }

    public static getProjectByName(name: string) {
        if (!(name in ALL_PROJECTS)) {
            return Project.CreateFromObject({})
        }
        return ALL_PROJECTS[name]
    }

    private constructor(obj: ProjectObject) { // Always has to go through CreateFromObject
        this.name = obj.name;
        this.title = obj.title;
        this.summary = obj.summary;
        this.description = obj.description;
        this.languages = obj.languages;

        this.created = obj.created;
        this.lastEdited = obj.lastEdited;

        this.isPrivate = obj.isPrivate;
        this.isWebsite = obj.isWebsite;

        this.mainImagePath = obj.hasMainImage ? "/images/projects/" + this.name + "/main.png" : "";

        this.informationLink = new NavLink(this.title, "/projects/view?name=" + this.name);
        this.websiteLink = new NameLink(this.title + " - website", "https://" + this.name + ".ShephardLuke.co.uk", obj.isWebsite);
        this.githubLink = new NameLink(this.title + " - GitHub repository", "https://github.com/ShephardLuke/" + this.name, !obj.isPrivate)

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

    getIsWebsite() {
        return this.isWebsite;
    }

    getMainImagePath() {
        return this.mainImagePath;
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

