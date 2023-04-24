import { useEffect, useState } from "react"
import Nav from "@/components/Nav";
import Aside from "@/components/Aside";
import { removeBannerAd } from "@/helper/functions";
import MobileNav from "@/components/MobileNav";

export default function Home(this: any) {
  const [files, setFiles] = useState();

  

  useEffect(() => {
    const obj = fetch("/api/retrieve").then((res) => res.json()).then((data) => {
      setFiles(data);
    }).catch((err) => {
      console.log(err);
    });

  }, []);
  


  return (
      <div className='min-h-screen'>
        <Nav />
        <div className="min-h-[calc(100vh-96px)] w-[100%] flex">
          <div className='hidden sm:block'>
            <Aside files={files}/>
          </div>
          <div className="flex flex-col flex-1 bg-white min-h-full mt-6 rounded-3xl space-y-4 z-10 mr-4">
              <div className="m-6 ">
                <div id="bannerAd1" className="relative h-[200px] bg-cover bg-no-repeat bg-center bg-[url(https://img.freepik.com/free-vector/data-storage-technology-vector-illustration_1441-2000.jpg?w=1380&t=st=1682101462~exp=1682102062~hmac=f1eddb7e6971d8e5af1815ada6e7b1562a9e387a6b962d1c4d5299850f0c6c19)] rounded-3xl">
                  <span className="absolute text-gray-300 top-0 right-0 my-2 text-center mx-5 cursor-pointer text-2xl" onClick={ () => {removeBannerAd(1)} }>x</span>
                </div>
                  
              </div>
              <div className="mx-6 flex flex-col h-[580px] bg-[#010409] rounded-3xl">
                <video autoPlay loop muted className="h-[100%]">
                  <source src="https://v4.cdnpk.net/videvo_files/video/free/video0468/large_watermarked/_import_6166ec628fdab6.53885345_FPpreview.mp4" type="video/mp4" />
                </video>
              </div>
          </div>
        </div>
        <MobileNav files={files}/>
      </div>
   
    
  )
}
