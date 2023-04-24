import React, { useState } from 'react'
import { Document, FileMissing, Pdf, Pptx, Txt, Xlsx } from '../../public/icons'
import { convBytes, convTime } from '../helper/functions'
type Props = {
  file: any
  grid: boolean
  
}

export default function File({file, grid}: Props) {
  const [showDiv, setShowDiv] = useState(false);

  const handleMouseEnter = () => {
    setShowDiv(true);
  };

  const handleMouseLeave = () => {
    setShowDiv(false);
  };

  const buttonHandler = () => {
    const va = fetch(`/api/delete?fileName=${file.name}`).then(response => {
      
    })
    .catch(error => {
      console.error('Error:', error);
    });;
    window.location.reload();
  }

  var date = String(new Date(file.lastModified));
  var dateArr = date.split(" ");
  var time = dateArr[4];
  const newTime = convTime(time);
  
  function getFileExtension() {
    const fileExt = file.name.split('.').pop();
    if(fileExt === 'pdf') {
      return <Pdf />
    } else if(fileExt === 'docx') {
      return <Document />
    } else if(fileExt === 'xlsx') {
      return <Xlsx />
    } else if(fileExt === 'pptx') {
      return <Pptx />
    } else if(fileExt === 'txt') {
      return <Txt />
    } else {
      return <FileMissing />
    }
  }
  
  return (
    <div className='relative transition-all block p-2 border-b-2' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={"text-black justify-between" + (grid ? " block " : " flex")}>
        <div className={" text-center justify-center content-center" + (grid ? " block " : " flex space-x-5")}>
            <div className={"py-3 px-4 rounded-xl" + (grid ? " text-center justify-center content-center w-fit mx-auto " : " ")} >
              {
                getFileExtension()
              }
            </div>
            <h1 className="text-lg my-auto break-words">{file.name}</h1>
        </div>
        <div className={"space-x-5 my-auto" + (grid ? " hidden xl:flex justify-between" : " hidden lg:flex")}>
            <span>{dateArr[1] + " " + dateArr[2] + " " + dateArr[3]}</span>
            <span>{newTime}</span>
            <span>{convBytes(file.size)}</span>
        </div>

        { showDiv &&
        <div className='rounded-2xl absolute mx-auto my-auto top-0 left-0 right-0 w-[100%] h-[100%] p-4 hover:bg-gray-800/80 transition-all'>
          <div className={'relative flex mx-auto my-auto h-[100%] content-center justify-center text-center space-x-5' + (grid ? ' w-[100%]' : ' w-[60%] lg:w-[40%]')}>
            <button className=' h-fit  my-auto bg-white rounded-xl border border-red-600 text-red-600 px-4 py-2' onClick={ () => {buttonHandler()}}>Delete file</button>
            <a className="my-auto bg-white rounded-xl border border-green-500 text-green-500 px-4 py-2" href={file.link}>Open file</a>
          </div>
          
        </div>}
        
      </div>
  </div>
  )
}