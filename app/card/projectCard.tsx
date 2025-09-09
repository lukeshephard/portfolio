import Platform from "../utils/platform";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Laptop, LaptopMinimal, LucideIcon, Monitor, Smartphone, Tablet, Tv, TvMinimal } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ProjectCard({title, platforms, imagesData, description, devInfo}: {title: string, platforms: Platform[], description: string, imagesData: {fileName: string, alt:string}[], devInfo: string}) {
    const [selectedPlatform, setSelectedPlatform] = useState<Platform | undefined>()

    useEffect(() => {
        if (window.innerWidth < 640) {
            setSelectedPlatform(Platform.Phone);
        } else if (window.innerWidth < 1024) {
            setSelectedPlatform(Platform.Tablet);
        } else if (window.innerWidth < 1536) {
            setSelectedPlatform(Platform.Laptop);
        } else {
            setSelectedPlatform(Platform.Desktop);
        }
    }, [])


    function generatePlatformIcons() {
        if (selectedPlatform === undefined) {
            return null;
        }
        return platforms.map(platform => {
            const iconMap: {[key in Platform]: LucideIcon} = {
                "PHONE": Smartphone,
                "TABLET": Tablet,
                "LAPTOP": Laptop,
                "DESKTOP": Monitor
            }

            const currentPlatform = iconMap[platform]

            return React.createElement(currentPlatform, {
                key: title + platform,
                size: 36,
                className: `${currentPlatform === iconMap[selectedPlatform] ? "text-logo" : "text-black"}`,
                onClick: () => setSelectedPlatform(platform)
            })
        })
    }


    const imageSlides = selectedPlatform !== undefined ? imagesData.map(imageData => <SwiperSlide key={imageData.fileName}><img className="m-auto max-w-full max-h-150" src={`/images/projects/${title}/${imageData.fileName}/${selectedPlatform.toLowerCase()}.png`} alt={`${imageData.alt}`}/></SwiperSlide>) : null

    return (
        <div className={"w-screen py-10 flex flex-col items-center gap-y-10"}>
            <h2 className="text-6xl text-text-title no-underline">{title}</h2>
            <p className="p-3 lg:w-1/3 lg:p-0">{description}</p>
            <div className="w-full p-3 lg:w-1/2 lg:max-h-150 lg:p-0">
                <Swiper
                modules={[Navigation, Pagination, A11y]}
                navigation
                pagination={{clickable: true}}
                slidesPerView={1}>
                    {imageSlides}
                </Swiper>
            </div>
            <div>
                <p>Supported Devices:</p>
                <p className="project-platforms text-left my-auto flex gap-3 pt-3">{generatePlatformIcons()}</p>
            </div>
            <p className="p-3 lg:w-1/3 lg:p-0">{devInfo}</p>
        </div>
    )
}