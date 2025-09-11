import Platform from "../utils/platform";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Laptop, LucideIcon, Monitor, Smartphone, Tablet } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ProjectCard({id, title, platforms, imagesData, description, devInfo}: {id:string, title: string, platforms: Platform[], description: string, imagesData: {name: string, alt:string}[], devInfo: string}) {
    const [selectedPlatform, setSelectedPlatform] = useState<Platform | undefined>()

    useEffect(() => {
        if (platforms.includes(Platform.Phone) && window.innerWidth < 640) {
            setSelectedPlatform(Platform.Phone);
        } else if (platforms.includes(Platform.Tablet) && window.innerWidth < 1024) {
            setSelectedPlatform(Platform.Tablet);
        } else if (platforms.includes(Platform.Laptop) && window.innerWidth < 1536) {
            setSelectedPlatform(Platform.Laptop);
        } else if (platforms.includes(Platform.Desktop)) {
            setSelectedPlatform(Platform.Desktop);
        } else {
            setSelectedPlatform(platforms[0]);
        }
    }, [platforms])


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
                className: `${currentPlatform === iconMap[selectedPlatform] ? "text-logo" : "text-text"}`,
                onClick: () => setSelectedPlatform(platform)
            })
        })
    }


    const imageSlides = selectedPlatform !== undefined ? imagesData.map(imageData => <SwiperSlide key={imageData.name}><img className="m-auto max-w-full max-h-150" src={`/images/projects/${id}/${imageData.name}/${selectedPlatform.toLowerCase()}.png`} alt={`${imageData.alt}`}/></SwiperSlide>) : null

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
                <p className="my-auto flex justify-center gap-3 pt-3">{generatePlatformIcons()}</p>
            </div>
            <p className="p-3 lg:w-1/3 lg:p-0">{devInfo}</p>
        </div>
    )
}