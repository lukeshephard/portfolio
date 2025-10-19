import { Code } from "lucide-react";

// Link to repository
export default function RepositoryLink() {
    return (
        <a href="https://github.com/lukeshephard/portfolio" target="_blank" rel="noopener noreferrer" className="m-auto cursor-pointer hover:text-link-hover active:text-link-active">{<Code className="size-9"/>}</a>
    )
}