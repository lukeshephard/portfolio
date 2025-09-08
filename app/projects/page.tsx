'use client'
import Image from "next/image";

import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Card from "../utils/card";
import CardArray from "../utils/cardArray";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";

export default function Projects() {
  return (
      <>
          <div className="flex flex-col items-center text-text text-center">
            <CardArray>
              <Card title="Projects">
              </Card>
              <Card title="QMTrack">
                <h3 className="text-4xl">Software Engineering Project</h3>
                <div className="w-1/2">
                  <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    navigation
                    pagination={{clickable: true}}
                    slidesPerView={1}>
                    <SwiperSlide>
                      <img src="/images/projects/qmtrack/dashboard.png" alt="QMTrack dashboard page"/>
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="/images/projects/qmtrack/login.png" alt="QMTrack login page"/>
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="/images/projects/qmtrack/ec-claims.png" alt="QMTrack EC Claims page"/>
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="/images/projects/qmtrack/update-service-status.png" alt="QMTrack update service status page"/>
                    </SwiperSlide>
                  </Swiper>
                </div>

                {/* <Image
                  src="/images/projects/qmtrack/dashboard.png"
                  width={800}
                  height={800}
                  alt=""
                />
                <Image
                  src="/images/projects/qmtrack/login.png"
                  width={800}
                  height={800}
                  alt=""
                />
                <Image
                  src="/images/projects/qmtrack/ec-claims.png"
                  width={800}
                  height={800}
                  alt=""
                />
                <Image
                  src="/images/projects/qmtrack/update-service-status.png"
                  width={800}
                  height={800}
                  alt=""
                /> */}
              </Card>
            </CardArray>
          </div>
      </>
  );
}
