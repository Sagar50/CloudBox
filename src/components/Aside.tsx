import React, { useEffect } from 'react'
import { Clock, FileIcon, Photo, Plus, Upload } from '../../public/icons'
import Link from "next/link";
import { useRouter } from 'next/router'
import { convBytes } from '@/helper/functions';
type Props = {
    files: any,
}

function Aside({files}: Props) {
  const router = useRouter();
  var totalSize = 0;
  var prettySize;
  function recountBytes(){
    files?.map((file:any, index: number) => {
      totalSize += file.size;
    });
    prettySize = convBytes(10737418240 - totalSize);
  }
  

  recountBytes();
 
  useEffect(() => {
    buttonStyle();
    recountBytes();
  }, [files]);

  const buttonStyle = () => {
    const filesId = document.getElementById("files")!;
    const recentId = document.getElementById("recent")!;
    const photosId = document.getElementById("photos")!;
    if(router.pathname === "/show_file") {
      filesId.classList.add("activeAside");
      recentId.classList.remove("activeAside");
      photosId.classList.remove("activeAside");
    } else if(router.pathname === "/show_recent") {
      filesId.classList.remove("activeAside");
      recentId.classList.add("activeAside");
      photosId.classList.remove("activeAside");
    } else if(router.pathname === "/show_photos") {
      filesId.classList.remove("activeAside");
      recentId.classList.remove("activeAside");
      photosId.classList.add("activeAside");
    }
  }
  
  return (
    <aside className="w-fit justify-between flex flex-col sticky top-[96px] h-[calc(100vh-96px)] z-50">
          <div className="mt-6 space-y-5 m-6">
            <Link href="/upload_file" className="bg-[#00c2ff] text-white rounded-xl px-10 py-3 flex space-x-3">
              <Upload/>
              <span className="text-center items-center my-auto text-lg">Upload</span>
            </Link>
            <button className="bg-white text-black rounded-xl px-10 py-3 flex space-x-3 w-full">
              <Plus/>
              <span className="text-center items-center my-auto text-lg">Create</span>
            </button>
          </div>
          <div className="">
            
              <Link href="/show_file" id="files" className="hover:bg-[#e1f4fb] cursor-pointer transition-all px-8 py-4 h-fit flex" onClick={()=> {buttonStyle();}}>
                <div className="flex w-[80%] text-left space-x-3 mx-auto">
                  <FileIcon />
                  <span className="text-[#1dc6fe] h-fit my-auto text-xl">Files</span>
                </div>
              </Link>
              <Link href="/show_recent" id="recent" className="hover:bg-[#e1f4fb] cursor-pointer transition-all px-8 py-4 h-fit flex" onClick={()=> {buttonStyle();}}>
                <div className="flex w-[80%] text-left space-x-3 mx-auto">
                  
                  <Clock />
                  <span className="text-[#1dc6fe] h-fit my-auto text-xl">Recent</span>
                </div>
              </Link>
              <Link href="/show_photos" id="photos" className="hover:bg-[#e1f4fb] cursor-pointer transition-all px-8 py-4 h-fit flex" onClick={()=> {buttonStyle();}}>
                <div className="flex w-[80%] text-left space-x-3 mx-auto">
                  <Photo />
                  <span className="text-[#1dc6fe] h-fit my-auto text-xl">Photos</span>
                </div>
              </Link>
          </div>
          <div className="bg-[#00c2ff] rounded-xl justify-center content-center text-center m-4 ">
            <div className="w-[85%] mx-auto space-y-6 px-2 py-5">
              <div className="justify-center content-center text-center space-y-2" >
                <progress className="block mx-auto" id="file" value={totalSize} max="10737418240"></progress>
                <span className="block text-sm">{prettySize} free out of 10 GB</span>
              </div>
              <div className="">
                <button className="block bg-white text-black text-lg text-center justify-center content-center rounded-xl mx-auto px-3 py-2 w-[100%] font-semibold">+1 TB for $4</button>
              </div>
            </div>
          </div>
        </aside>
  )
}

export default Aside