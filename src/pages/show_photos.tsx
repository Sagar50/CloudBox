import Aside from '@/components/Aside'
import MobileNav from '@/components/MobileNav';
import Nav from '@/components/Nav'
import { removeBannerAd } from '@/helper/functions';
import React, { useEffect, useState } from 'react'
import { Grid, Hamburger, Search} from '../../public/icons';
import File from '@/components/File';

type Props = {}

function Show_photos({}: Props) {
    const [files, setFiles] = useState([{
        "name": "1", 
        "link": "https://s3.us-east-005.backblazeb2.com/",
        "size": 1,
        "lastModified": "2023-23-1T01:00:000Z"
        }]);
    
    
    const [filteredList, setFilteredList] = useState([{
        "name": "1", 
        "link": "https://s3.us-east-005.backblazeb2.com/",
        "size": 1,
        "lastModified": "2023-23-1T01:00:000Z"
        }]);
    
    
    const [word, setWord] = useState("");
    const filList:any = [];
    const [grid, setGrid] = useState(false);
    
    useEffect(() => {
        const obj = fetch("/api/retrieve").then((res) => res.json()).then((data) => {
        setFiles(data);
        }).catch((err) => {
        console.log(err);
        });
    }, []);
    
    const gridLayout = () => {
        setGrid(true);
    }
    const linearLayout = () => {
    
        const fileDiv = document.getElementById('fileContainer')!;
        fileDiv.classList.remove("grid");
        fileDiv.classList.remove("grid-cols-4");
        fileDiv.classList.remove("gap-4");
        setGrid(false);
    }
    
    
    const onData = (data: string) => {
        setWord(data);
        for (var i = 0; i < files.length; i++) {
        if (files[i].name.toLowerCase().includes(data.toLowerCase())) {
            filList.push(files[i]);
        }
        }
        setFilteredList(filList);
    }
    
    return (
        <div className='min-h-screen'>
            <Nav />
            <div className="min-h-[calc(100vh-96px)] w-[100%] flex">
            <div className='hidden sm:block'>
                <Aside files={files}/>
            </div>
            <div className="flex flex-col flex-1 bg-white min-h-full mt-6 rounded-3xl space-y-12 z-10 mr-4">
                <div>
                    <div id="bannerAd3"className="relative m-6 h-[200px] bg-cover bg-no-repeat bg-center bg-[url(https://img.freepik.com/free-vector/data-storage-technology-vector-illustration_1441-2000.jpg?w=1380&t=st=1682101462~exp=1682102062~hmac=f1eddb7e6971d8e5af1815ada6e7b1562a9e387a6b962d1c4d5299850f0c6c19)] rounded-3xl">
                        <span className="absolute text-gray-300 top-0 right-0 my-2 text-center mx-5 cursor-pointer text-2xl" onClick={ () => {removeBannerAd(3)} }>x</span>
                    </div>
                    <div className="m-6 space-y-6"> 
                  <div className="">
                    <div className='flex justify-between'>
                      <h1 className=" text-black text-3xl font-semibold text-center my-auto">Files</h1>
                      <div className='w-[40%] ml-4'>
                        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg border-4 overflow-hidden">
                          <div className="grid place-items-center h-full w-12 text-gray-300">
                            <Search />
                          </div>
                          <input
                            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"
                            id="search"
                            onChange={e => onData(e.target.value)}
                            placeholder="Search here..." /> 
                      </div>
                      </div>
                      <div className="flex space-x-4">
                        <a className="cursor-pointer text-center justify-center content-center h-fit my-auto" onClick={() => linearLayout()}><Hamburger/></a>
                        <a className="cursor-pointer h-fit my-auto" onClick={() => gridLayout()}><Grid/></a>
                      </div>
                    </div>
                  </div>
                  <div id="fileContainer" className={grid ? "grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1" : " space-y-2"}>
                    {word !== "" ?
                      filteredList.map((file: any, index: number) => {
                        
                        return (
                          <div key={file.name} className='fileDiv'>
                            <File grid={grid} file={file}/>
                          </div>
                        )})
                        :
                        files.map((file: any, index: number) => {
                                if(file.name.split('.').pop() === "png" || file.name.split('.').pop() === "jpg" || file.name.split('.').pop() === "jpeg" || file.name.split('.').pop() === "gif" || file.name.split('.').pop() === "svg"){
                                    return (
                                        <div key={file.name} className='fileDiv'>
                                        <File grid={grid} file={file}/>
                                        </div>
                                    )
                                }else {
                                    return (null)
                                }
                        })}
                  </div>
                </div>
                    
                </div>
            </div>
            </div>
            <MobileNav files={files}/>
        </div>
    )
}

export default Show_photos