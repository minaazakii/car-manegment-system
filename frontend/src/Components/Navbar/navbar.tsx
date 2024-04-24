import { FaCarSide, FaHome } from "react-icons/fa";
import { navbarLinksType, navbarPropsType } from "../Types/types";
import { TfiSettings } from "react-icons/tfi";
import { TbReportMoney } from "react-icons/tb";
import logo from '../../Assets/imgs/logo.png'
import logoCollpase from '../../Assets/imgs/logoCollpased.png'
import { RiBillLine } from "react-icons/ri";
import { Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import { MdAccountBalance } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";


const Navbar = ({collapse}:navbarPropsType) => {

    const links:navbarLinksType = [
        {id:1,name:'home',nameAr:'الرئيسية',icon:<FaHome />,path:'/dashboard/home'},
        {id:2,name:'bills',nameAr:'فواتير',icon:<TbReportMoney />,path:'/dashboard/bills'},
        {id:3,name:'reports',nameAr:'تقارير',icon:<RiBillLine />,path:'/dashboard/reports'},
        {id:4,name:'spare parts',nameAr:'قطع الغيار',icon:<TfiSettings />,path:'/dashboard/spareparts'},
        {id:5,name:'clients',nameAr:'العملاء',icon:<PiUsersThree />,path:'/dashboard/clients'},
        {id:6,name:'cars',nameAr:'السيارات',icon:<FaCarSide /> ,path:'/dashboard/cars'},
        {id:7,name:'accounts',nameAr:'الحسابات',icon:<MdAccountBalance />,path:'/dashboard/accounts'},
    ]
    return ( 
        <article className="navbar-wrapper mt-10 relative">
            <div className="logo-wrapper w-full text-center">
                <img src={collapse ? logoCollpase : logo} className={`${collapse ? 'w-16 rounded-[50%]' : 'w-24'} m-auto`} />
            </div>
            <ul className="mt-7">
                {links?.map( (item)=>(
                    <li key={item?.id} className={` capitalize cursor-pointer transition-all duration-300 hover:bg-[#3399FF] mb-4 group`}>
                        <Tooltip
                            placement="top"
                            className="text-lg capitalize"
                            title={item?.nameAr}
                        >
                            <NavLink to={item?.path} className={`px-1 md:px-2 py-[6px] flex items-center ${collapse ? 'justify-center' : 'justify-start'} gap-x-1 md:gap-x-3 w-full h-full text-[#333] group-hover:text-[#fff]`}>
                                <span className={` text-mainBlue group-hover:text-white ${collapse ? ' md:[&>svg]:w-7 md:[&>svg]:h-7' : 'md:[&>svg]:w-6 md:[&>svg]:h-6 [&>svg]:w-4 [&>svg]:h-4'}`}>{item?.icon}</span>
                                {collapse ? null : <span className={`text-[11px] overflow-hidden text-ellipsis whitespace-nowrap max-w-[30px] sm:max-w-max block md:text-sm`}>{item?.name}</span> }
                            </NavLink>
                        </Tooltip>
                    </li>
                ) )}
            </ul>
        </article>
    );
}

export default Navbar;