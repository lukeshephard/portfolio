import { Code, ExternalLink } from "lucide-react";
import { useState } from "react";

// Link to repository
export default function RepositoryLink() {
    return (
        <a href="https://github.com/lukeshephard/personal-website" target="_blank" className="m-auto cursor-pointer hover:text-link-hover active:text-link-active">{<Code className="size-9"/>}</a>
    )
}