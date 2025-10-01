import { BookUser, GitMerge, Mail } from "lucide-react";

export default function Page() {
    return (
        <>
            <h1 className="pb-9 text-5xl">Here are my socials:</h1>
            <ul className="pb-2 text-md sm:text-xl [&>*]:flex [&>*]:justify-center [&>*]:whitespace-pre space-y-3">
                <li><Mail className="my-auto mr-1"/>Email: <a href="mailto:luke@lukeshephard.com" target="_blank">luke@lukeshephard.com</a></li>
                <li><GitMerge className="my-auto mr-1"/>Github: <a href="https://github.com/lukeshephard" target="_blank">lukeshephard</a></li>
                <li><BookUser className="my-auto mr-1"/>Linkedin: <a href="https://www.linkedin.com/in/luke-shephard/" target="_blank">luke-shephard</a></li>
            </ul>
        </>
    )
}