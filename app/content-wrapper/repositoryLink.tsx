import { Code, ExternalLink } from "lucide-react";
import { useState } from "react";

// Link to repository
export default function RepositoryLink() {
    const [hovered, setHovered] = useState(false);

    return (
        <a href="https://github.com/lukeshephard/personal-website" target="_blank" className="m-auto cursor-pointer hover:text-link-hover active:text-link-active" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>{hovered ? <ExternalLink className="size-9"/> : <Code className="size-9"/>}</a>
    )
}