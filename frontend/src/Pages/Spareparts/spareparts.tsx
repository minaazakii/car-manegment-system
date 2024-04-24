import { Button } from "@mui/material";
import { useState } from "react";
import SearchInput from "../../Components/Common/SearchInput/searchInput";
import { getBills } from "../../Components/Redux/Slices/Bills/bills";
import { Link } from "react-router-dom";
import SparepartsDatatable from "./sparepartsDatatable";
import AddModal from "./addModal";

type filterItem ={
    label:string,
    param:string
}

const Spareparts = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const btns = [
        {label:'all',param:'all'},
        {label:'spareparts',param:'spareparts'},
        {label:'materials',param:'materials'},
    ]

    const filterClickHandler = (index:number,item:filterItem)=>{
        setActiveTab(index)
        // const dateRange = item?.param
        // dispatch(getRidersStatistics({dateRange}))
    }

    const [openModal, setopenModal] = useState(false)
    const handelModalOpen = ()=>setopenModal(true)
    const handelModalClose = ()=>setopenModal(false)

    return ( 
        <article className="spareparts-wrapper text-mainDark">
            <section className="bills-title-wrapper mb-5">
                <h1 className="font-semibold text-2xl">Spareparts</h1>
            </section>

            <section className="inp-btns-wrapper mb-4 flex items-center justify-between">
                <div className="filter-tabs-section flex items-center gap-x-2">
                    <div className="px-3 py-[10px] bg-[#fdfeff] rounded-md w-fit">
                        {btns?.map((item,index)=>{
                            return(
                                <Button key={index} className={`capitalize text-sm text-[#333] px-4 py-2 lg:px-2 xl:px-4 rounded-sm transition-all duration-300 ${activeTab === index ? 'bg-[#3399ff12] text-mainBlue' : null}`}
                                    onClick={()=>filterClickHandler(index,item)}
                                >
                                    {item.label}
                                </Button>
                            )
                        })}
                    </div>
                </div>

                <div className="add-search-wrapper">
                    <div className="flex items-center gap-x-2">

                        <div className="search-wrapper">
                            <SearchInput apiFunc={getBills} placeholder="Search item" />
                        </div>

                        <div>
                            <Button className="capitalize text-white bg-mainBlue py-[9.5px]" onClick={handelModalOpen}>Add New item</Button>
                        </div>

                    </div>
                </div>
            </section>

            <section className="bills-dtat-table-wrapper shadow-md px-3 py-4 bg-white rounded-md">
                <SparepartsDatatable />
            </section>

            <section>
                <AddModal open={openModal} close={handelModalClose} />
            </section>
        </article>
    );
}

export default Spareparts;