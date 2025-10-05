"use client"

import Platform from "../utils/platform";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { FolderCode, House, Laptop, LucideIcon, Smartphone, Tablet } from "lucide-react";
import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import ExportedImage from "next-image-export-optimizer";

export default function ProjectCard({id, title, platforms, imagesData, description, devInfo, links}: {id:string, title: string, platforms: Platform[], description: string, imagesData: {name: string, alt:string}[], devInfo: string, links?: {website?: string, repository?: string}}) {
    const [selectedPlatform, setSelectedPlatform] = useState<Platform | undefined>()

    // Default selected platform depending on window width, matches tailwind values and website style
    useEffect(() => {
        if (platforms.includes(Platform.Phone) && window.innerWidth < 640) {
            setSelectedPlatform(Platform.Phone);
        } else if (platforms.includes(Platform.Tablet) && window.innerWidth < 1024) {
            setSelectedPlatform(Platform.Tablet);
        } else if (platforms.includes(Platform.Laptop)) {
            setSelectedPlatform(Platform.Laptop);
        } else {
            setSelectedPlatform(platforms[0]);
        }
    }, [platforms])

    // Creates a button for each supported platform
    function generatePlatformIcons(): ReactNode {
        if (selectedPlatform === undefined) {
            return null;
        }
        return platforms.map(platform => {
            const iconMap: {[key in Platform]: LucideIcon} = {
                "PHONE": Smartphone,
                "TABLET": Tablet,
                "LAPTOP": Laptop,
            }

            const currentPlatform = iconMap[platform]

            return React.createElement(currentPlatform, {
                key: title + platform,
                size: 48,
                className: `${currentPlatform === iconMap[selectedPlatform] ? "text-link border-[4px] p-[5px]" : "text-text border-1 border-[2px] p-[7px]"} hover:text-link-hover active:text-link-active rounded-lg`,
                onClick: () => setSelectedPlatform(platform)
            })
        })
    }

    // Returns a p tag with the supplied links
    function generateLinks(): ReactNode {
        if (links === undefined) {
            return null;
        }

        const linksList = []

        if (links.website) {
            linksList.push(<a href={links.website} target="_blank" className="flex gap-1"><House className="my-auto"/>Homepage</a>)
        }

        if (links.repository) {
            linksList.push(<a href={links.repository} target="_blank" rel="noopener noreferrer" className="flex gap-1"><FolderCode className="my-auto"/>Repository</a>)
        }

        let fullText = <>{linksList[0]}</>;

        for (let i = 1; i < linksList.length; i++) {
            fullText = <>{fullText} | {linksList[i]}</>
        }
        
        return <p className="flex gap-3">{fullText}</p>

    }

    const imageSlides = selectedPlatform !== undefined ? imagesData.map(imageData => <SwiperSlide key={imageData.name}><ExportedImage width={1920} height={1080} sizes="(max-width: 768px) 100vw, 50vw" className="mx-auto w-full h-auto max-h-120 object-contain" src={`/images/projects/${id}/${imageData.name}/${selectedPlatform.toLowerCase()}.png`} alt={`${imageData.alt}`}/></SwiperSlide>) : null

    return (
        <div className={"w-screen py-10 flex flex-col items-center gap-y-10"} id={id}>
            <h2 className="text-5xl text-text-title no-underline">{title}</h2>
            {generateLinks()}
            <p className="p-3 md:w-2/3 lg:w-1/3 md:p-0">{description}</p>
            <div className="w-full p-3 md:w-1/2 md:max-h-120 md:p-0">
                <Swiper
                modules={[Navigation, Pagination, A11y]}
                navigation
                pagination={{clickable: true}}
                style={{
                    "--swiper-pagination-bullet-size": "0.75rem",
                    "--swiper-pagination-bullet-horizontal-gap": "0.4rem",
                } as CSSProperties}
                slidesPerView={1}>
                    {imageSlides}
                </Swiper>
            </div>
            <div>
                <p>View on supported platforms:</p>
                <p className="my-auto flex justify-center gap-3 pt-3">{generatePlatformIcons()}</p>
            </div>
            <p className="p-3 md:w-2/3 lg:w-1/3 md:p-0">{devInfo}</p>
        </div>
    )
}