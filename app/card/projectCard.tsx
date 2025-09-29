import Platform from "../utils/platform";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { FolderCode, House, Laptop, LucideIcon, Monitor, Smartphone, Tablet } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";

export default function ProjectCard({id, title, platforms, imagesData, description, devInfo, links}: {id:string, title: string, platforms: Platform[], description: string, imagesData: {name: string, alt:string}[], devInfo: string, links?: {website?: string, repository?: string}}) {
    const [selectedPlatform, setSelectedPlatform] = useState<Platform | undefined>()

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
                className: `${currentPlatform === iconMap[selectedPlatform] ? "text-link" : "text-text"} hover:text-link-hover active:text-link-active border-1 rounded-lg p-2`,
                onClick: () => setSelectedPlatform(platform)
            })
        })
    }

    function generateLinks(): ReactNode {
        if (links === undefined) {
            return null;
        }

        const linksList = []

        if (links.website) {
            linksList.push(<a href={links.website} target="_blank" className="flex gap-3 no-underline hover:underline"><House className="my-auto"/>Homepage</a>)
        }

        if (links.repository) {
            linksList.push(<a href={links.repository} target="_blank" className="flex gap-3 no-underline hover:underline"><FolderCode className="my-auto"/>Repository</a>)
        }

        let fullText = <>{linksList[0]}</>;

        for (let i = 1; i < linksList.length; i++) {
            fullText = <>{fullText} | {linksList[i]}</>
        }
        
        return <p className="flex gap-3">{fullText}</p>

    }


    const imageSlides = selectedPlatform !== undefined ? imagesData.map(imageData => <SwiperSlide key={imageData.name}><img className="m-auto max-w-full max-h-120" src={`/images/projects/${id}/${imageData.name}/${selectedPlatform.toLowerCase()}.png`} alt={`${imageData.alt}`}/></SwiperSlide>) : null

    return (
        <div className={"w-screen py-10 flex flex-col items-center gap-y-10"}>
            <h2 className="text-6xl text-text-title no-underline">{title}</h2>
            {generateLinks()}
            <p className="p-3 lg:w-1/3 lg:p-0">{description}</p>
            <div className="w-full p-3 lg:w-1/2 lg:max-h-120 lg:p-0">
                <Swiper
                modules={[Navigation, Pagination, A11y]}
                navigation
                pagination={{clickable: true}}
                slidesPerView={1}>
                    {imageSlides}
                </Swiper>
            </div>
            <div>
                <p>View on other platforms:</p>
                <p className="my-auto flex justify-center gap-3 pt-3">{generatePlatformIcons()}</p>
            </div>
            <p className="p-3 lg:w-1/3 lg:p-0">{devInfo}</p>
        </div>
    )
}