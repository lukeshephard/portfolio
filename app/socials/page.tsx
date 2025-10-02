import { BookUser, GitMerge, Mail } from "lucide-react";
import { Metadata } from "next";
import Card from "../card/card";

export const metadata: Metadata = {
    title: "Socials",
    description: "Connect with Luke Shephard on Linkedin, Github and more.",
    alternates: {
        canonical: "/socials"
    },
}

export default function Page() {
    return (
        <Card title="My Socials" mainTitle>
            <ul className="pb-2 text-md sm:text-xl [&>*]:flex [&>*]:justify-center [&>*]:whitespace-pre space-y-3">
                <li><Mail className="my-auto mr-1"/>Email: <a href="mailto:luke@lukeshephard.com" target="_blank" rel="noopener noreferrer">luke@lukeshephard.com</a></li>
                <li><GitMerge className="my-auto mr-1"/>Github: <a href="https://github.com/lukeshephard" target="_blank" rel="noopener noreferrer">lukeshephard</a></li>
                <li><BookUser className="my-auto mr-1"/>Linkedin: <a href="https://www.linkedin.com/in/luke-shephard/" target="_blank" rel="noopener noreferrer">luke-shephard</a></li>
            </ul>
        </Card>
    )
}