import Platform from "../utils/platform";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";

export default function ProjectCard({title, platforms, imagesData, description, devInfo}: {title: string, platforms: Platform[], description: string, imagesData: {fileName: string, alt:string}[], devInfo: string}) {
    const imageSlides = imagesData.map(imageData => <SwiperSlide key={imageData.fileName}><img src={`/images/projects/${title}/${imageData.fileName}.png`} alt={imageData.alt}/></SwiperSlide>)

    return (
        <div className={"w-screen py-10 flex flex-col items-center gap-y-10"}>
            <h2 className="text-6xl text-text-title no-underline">{title}</h2>
            <p className="p-3 lg:w-1/3 lg:p-0">{description}</p>
            <div className="w-full p-3 lg:w-1/2 lg:p-0">
                <Swiper
                modules={[Navigation, Pagination, A11y]}
                navigation
                pagination={{clickable: true}}
                slidesPerView={1}>
                    {imageSlides}
                </Swiper>
            </div>
            <p className="p-3 lg:w-1/3 lg:p-0">{devInfo}</p>
        </div>
    )
}