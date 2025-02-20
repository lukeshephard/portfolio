import dayjs, { Dayjs } from "dayjs";
import { NameLink } from "../template/link/nameLink";
import { NavLink } from "../template/link/navLink";
import { Language } from "./store/language";
import { projectDatabase } from "./store/projectDatabase";
import { Release } from "./store/release";

type ProjectObject = { // Type to turn objects into valid Projects, an oject MUST have all of these properties
    name: string;
    title: string;
    latestRelease: Release

    summary: string;
    description: string;
    languages: Language[];

    created: Dayjs;

    isPrivate: boolean;
    isWebsite: boolean;
    
    hasMainImage: boolean;
}

export class Project {
    private name: string;
    private title: string;
    private latestRelease: Release;

    private summary: string;
    private description: string;
    private languages: Language[];

    private created: Dayjs;

    private isPrivate: boolean;
    private isWebsite: boolean;

    private mainImagePath: string;

    private informationLink: NavLink;
    private githubLink: NameLink;
    private websiteLink: NameLink;
    private latestReleaseLink: NameLink;

    public static ALL_PROJECTS(): {[key: string]: Project} { // Gets every project
        return ALL_PROJECTS;
    }

    public static CreateFromObject(obj : {[key: string]: unknown}) { // Creates a project from an object with any keys (every parameter is optional)
        const objWithDefaults = structuredClone(obj);
        objWithDefaults.name = obj.name ? obj.name as string : "";
        objWithDefaults.title = obj.title ? obj.title as string : "Unnamed Project";
        objWithDefaults.latestRelease = obj.latestRelease ? obj.latestRelease as Release : new Release("-1", "No version", NaN)

        objWithDefaults.summary = obj.summary ? obj.summary as string : "";
        objWithDefaults.description = obj.description ? obj.description as string : "";
        objWithDefaults.languages = obj.languages ? obj.languages as Language[] : [];

        objWithDefaults.created = obj.created ? dayjs.unix(obj.created as number) : dayjs(null)  

        objWithDefaults.isPrivate = obj.isPrivate == undefined ? false: obj.isPrivate as boolean
        objWithDefaults.isWebsite = obj.isWebsite == undefined ? true : obj.isWebsite as boolean

        objWithDefaults.hasMainImage = obj.hasMainImage == undefined ? true : obj.hasMainImage as boolean

        return new Project(objWithDefaults as ProjectObject)
    }

    public static getProjectByName(name: string) { // Get project from the hashmap
        if (!(name in ALL_PROJECTS)) {
            return Project.CreateFromObject({})
        }
        return ALL_PROJECTS[name]
    }

    private constructor(obj: ProjectObject) { // Always has to go through CreateFromObject
        this.name = obj.name;
        this.title = obj.title;
        this.latestRelease = obj.latestRelease;

        this.summary = obj.summary;
        this.description = obj.description;
        this.languages = obj.languages;

        this.created = obj.created;

        this.isPrivate = obj.isPrivate;
        this.isWebsite = obj.isWebsite;

        this.mainImagePath = obj.hasMainImage ? "/images/projects/" + this.name + "/main.png" : "";

        this.informationLink = new NavLink(this.title, "/projects/view?name=" + this.name);
        this.websiteLink = new NameLink(this.title + " - website", "https://" + this.name + ".ShephardLuke.co.uk", obj.isWebsite);
        this.githubLink = new NameLink(this.title + " - GitHub repository", "https://github.com/ShephardLuke/" + this.name, !obj.isPrivate)
        this.latestReleaseLink = new NameLink(this.getLatestRelease().getFullVersion(), "https://github.com/ShephardLuke/" + this.name + "/releases/tag/v" + encodeURIComponent(this.latestRelease.getVersion()), this.latestRelease.getDate().isValid() && !obj.isPrivate)

    }

    getName() {
        return this.name;
    }

    getTitle() {
        return this.title;
    }

    getLatestRelease() {
        return this.latestRelease;
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

    getLatestReleaseLink() {
        return this.latestReleaseLink
    }
}

function createProjects(): {[key: string]: Project} { // Create a hashmap of projects from a list of objects
    const allProjects: {[key: string]: Project} = {}
    for (let i = 0; i < projectDatabase.length; i++) {
        allProjects[projectDatabase[i].name] = (Project.CreateFromObject(projectDatabase[i]))
    }
    return allProjects
}

const ALL_PROJECTS: {[key: string]: Project} = createProjects()

