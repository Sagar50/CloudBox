import React, { useState } from 'react'
import { Filter, Greater, Hamburger2, Notification, Profile, Question, Search } from '../../public/icons'
import { useRouter } from 'next/router'
import Link from 'next/link';
type Props = {

}

function Nav({}: Props) {
    const router = useRouter();
    
    // const [search, setSearch] = useState("");
    // var filteredList:string[] = [];
    // const [list, setList] = useState([""]);
    // const searchFiles =() => {
    //   for(var i = 0; i < fileNames.length; i++){
    //     if(fileNames[i].includes(search)){
    //       filteredList.push(fileNames[i]);
    //     }
    //   }
    //   setList(filteredList);
    //   onChange.onChange(list);
    // }
    
    var canShow = false;
    function pathName(){
        if(router.pathname === "/show_file") {
          canShow = true;
            return "Files";
        } else if(router.pathname === "/show_recent") {
          canShow = true;
            return "Recent";
        } else if(router.pathname === "/show_photos") {
          canShow = true;
            return "Photos";
        } else {
          canShow = false;
            return "/";
        }
    }
    const showMobileNav = () => {
      const mobileNav = document.getElementById('mobileNav');
      mobileNav?.classList.add("flex");
      mobileNav?.classList.remove("hidden");
    }
    
  return (
    <nav className="sticky flex justify-between text-center items-center h-24 p-4 shadow-lg top-0 z-50 bg-[#f9fafc]">
        <div className='block sm:hidden cursor-pointer' onClick={()=> showMobileNav()}>
          <Hamburger2 />
        </div>
        <div className="flex space-x-16">
          <div className="flex space-x-4">
          <Link href="/" className='w-24 h-12'><img src="https://cdn.discordapp.com/attachments/594784508365242381/1099206640818999346/logo_1.png" /></Link>
          <Link href="/" className='h-fit my-auto'><div className="text-black text-2xl text-center">CloudBox</div></Link>
          </div>
          <div className="hidden xl:flex text-center my-auto space-x-3">
            <Link href="/"><h1 className="text-[#5c5c5c] text-xl">My Cloud</h1></Link>
            {pathName() !== "/" && <>
            <Greater />
            <h1 className="text-black text-xl font-bold">{pathName()}</h1> </>}
            
          </div>
        </div>
        <div className="flex space-x-8">
          <button className="hidden md:block border border-[#00c2ff] text-[#00c2ff] rounded-3xl px-2 py-3 w-60">Upgrade</button>
          <a className="cursor-pointer h-fit text-center my-auto content-center hidden xs:block"><Question /></a>
          <a className="cursor-pointer h-fit text-center my-auto content-center hidden xs:block"><Notification/></a>
          <a className="cursor-pointer h-fit text-cetner my-auto content-center"><Profile /></a>
        </div>
      </nav>
  )
}

export default Nav