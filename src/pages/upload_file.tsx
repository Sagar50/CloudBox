import Aside from '@/components/Aside';
import Nav from '@/components/Nav';
import React, { useEffect, useState } from 'react'
import { FileUpload} from 'primereact/fileupload'
import "primereact/resources/themes/lara-light-blue/theme.css";     
import "primereact/resources/primereact.min.css";
import MobileNav from '@/components/MobileNav';
type Props = {}

function Upload_file({}: Props) {
    const [files, setFiles] = useState();
    const [clicked, setClicked] = useState(false);

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
              <div className="flex flex-col flex-1 bg-white min-h-full mt-6 rounded-3xl space-y-12 z-10 mr-4">
                <div className='mt-6'>
                    <h1 className='text-3xl font-bold text-black w-fit mx-auto tracking-wider'>Upload Files</h1>
                </div>
                <div className="  w-[100%] sm:w-[90%] md:w-[80%] mx-auto p-8">
                    <FileUpload name="demo" url="/api/upload"> </FileUpload>
                </div>
              </div>
            </div>
            <MobileNav files={files}/>
        </div>
      )
}

export default Upload_file