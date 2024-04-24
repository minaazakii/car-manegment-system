import { Button } from "@mui/material";
import { useState } from "react";
import SearchInput from "../../Components/Common/SearchInput/searchInput";
import { getBills } from "../../Components/Redux/Slices/Bills/bills";
import ClientsTable from "./clientsTable";
import AddClientModal from "./addClient";


const Clients = () => {

    const [openModal, setopenModal] = useState(false)
    const handelModalOpen = ()=>setopenModal(true)
    const handelModalClose = ()=>setopenModal(false)

    return ( 
        <article className="spareparts-wrapper text-mainDark">
            <section className="bills-title-wrapper mb-5">
                <h1 className="font-semibold text-2xl">Clients</h1>
            </section>

            <section className="inp-btns-wrapper mb-4 flex items-center  justify-end">
                
                <div className="add-search-wrapper">
                    <div className="flex items-center gap-x-2">

                        <div className="search-wrapper">
                            <SearchInput apiFunc={getBills} placeholder="Search Client" />
                        </div>

                        <div>
                            <Button className="capitalize text-white bg-mainBlue py-[9.5px]" onClick={handelModalOpen}>Add New Client</Button>
                        </div>

                    </div>
                </div>
            </section>

            <section className="bills-dtat-table-wrapper shadow-md px-3 py-4 bg-white rounded-md">
                <ClientsTable />
            </section>

            <section>
                <AddClientModal open={openModal} close={handelModalClose} />
            </section>
        </article>
    );
}

export default Clients;