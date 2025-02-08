import { NameLink } from "../template/link/nameLink";
import { Project } from "./project";

export default function ProjectDisplay({project}: {project: Project}) {
    let element;
    if (project.getIsPrivate()) {
        element = <p className="text-2xl text-gray-600">(Private) {project.getTitle()}</p>
    } else {
        const link = "https://" + project.getName() + ".ShephardLuke.co.uk";
        element = new NameLink(project.getTitle(), link).generateElement();
    }
    return (
        <div>
            {element}
        </div>
    )
}