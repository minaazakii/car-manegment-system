import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../../Pages/Dashboard/home";
import { useEffect, useState } from "react";
import Navbar from "../../Navbar/navbar";
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { Button, IconButton } from "@mui/material";
import { IoMdLogOut } from "react-icons/io";
import Bills from "../../../Pages/Bills/bills";
import AddNewBill from "../../../Pages/Bills/NewBill/addBill";

const AppRoutes = () => {
    const [collapse, setcollapse] = useState<boolean>(false)
    const [close, setclose] = useState<boolean>(false)

    const handleCloseNavbar = ()=>{
        setclose(!close)
    }

    useEffect(() => {
        if(window?.innerWidth >760){
            setclose(true)
        }
    }, [])
    
    

    const toggleCollapsedNav = ()=>{
        setcollapse(!collapse)
    }
    return (
        <article className="app-routes-wrapper w-full h-full bg-[#f1f1f1]">
            <div className="flex justify-between items-start w-full h-full relative">
                <section className={`navbar-wrapper h-full transition-all duration-300 ${close ? 'block' : 'hidden'} ${collapse ? 'basis-[5%]' : 'basis-[12%]'}`}>

                    <div className={`h-full bg-[#fff] absolute z-20 md:relative shadow-lg overflow-hidden overflow-y-auto py-2 w-full`}>
                        <div className={`absolute top-3 right-2 [&>svg]:w-7 [&>svg]:h-7 cursor-pointer hidden md:block`} onClick={toggleCollapsedNav}>
                            {collapse ? <MdKeyboardDoubleArrowRight /> : <MdKeyboardDoubleArrowLeft />}
                        </div>
                        
                        <div className="transition-all duration-300">
                            <Navbar collapse={collapse}/>
                        </div>

                        <div className="absolute bottom-3 left-">
                            <Button className={`capitalize flex gap-x-2 text-red-500 font-semibold ${collapse ? ' md:[&>svg]:w-7 md:[&>svg]:h-7' : 'md:[&>svg]:w-6 md:[&>svg]:h-6 [&>svg]:w-4 [&>svg]:h-4'}`}>
                                <IoMdLogOut />
                                {collapse ? null : <span className="text-base">Logout</span>}
                            </Button>
                        </div>
                    </div>
                </section>
                <section className={`pages-wrapper  text-white overflow-hidden overflow-y-auto p-2 w-full h-full max-h-full transition-all duration-300 basis-full ${collapse ? 'md:basis-[95%]' : 'md:basis-[88%]'} `}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard/home" replace />} />
                        <Route path="/dashboard/home" element={<Home />} />
                        <Route path="/dashboard/bills" element={<Bills />} />
                        <Route path="/dashboard/bills/addbill" element={<AddNewBill />} />
                    </Routes>
                </section>
            </div>
            <IconButton className="block absolute md:hidden top-0 left-1 z-40" onClick={handleCloseNavbar}><IoMenu /></IconButton>
        </article>
    );
}

export default AppRoutes;