import { useState } from "react";
import DataTable, { TableColumn, TableStyles } from "react-data-table-component";
import {useRemoteSort} from '../../Components/Common/SortHook/sortHook'
import { FaSortAmountUp } from "react-icons/fa";
import { getBills } from "../../Components/Redux/Slices/Bills/bills";
import { useAppDispatch } from "../../Components/Redux/TsHooks";
import { useNavigate } from "react-router-dom";
import { Button, ListItemButton, Menu, MenuItem } from "@mui/material";
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import { sparepartTableData } from "../../Components/Types/types";
import EditModal from "./editModal";

const ActionCell = ({data}:{data:sparepartTableData})=>{
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch()

    const open = Boolean(anchorEl);
    
    const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget as HTMLButtonElement);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openModal, setopenModal] = useState(false)
    const handelModalOpen = ()=>setopenModal(true)
    const handelModalClose = ()=>setopenModal(false)
    // console.log(data); 

    return (
        <div className='action-wrapper relative'>
            <ListItemButton className='rounded-md' onClick={handleClick}><span><BiDotsHorizontalRounded className='text-xl' /></span></ListItemButton>
            <Menu
                id="datatable-action-menu"
                aria-labelledby="datatable-action-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                PaperProps={{ style: { boxShadow: 'none',padding:0 } }}
                className='shadow-md p-0'
            >
                <MenuItem className='text-[#545151c2] bg-mainLightBlue rounded-md hover:bg-mainLightBlue' onClick={handelModalOpen}>
                    <Button>تعديل</Button>
                </MenuItem>
            </Menu>

            <EditModal open={openModal} close={handelModalClose} data={data} />
        </div>
    );
}
const SparepartsDatatable = () => {
    const navigate = useNavigate()
    const [page,setpage] = useState<number>(1)
    const [size,setsize] = useState<number>(10)
    const [searchValue,setsearchValue] = useState<string>('')
    const dispatch = useAppDispatch()

    const {handleRemoteSort, defState} = useRemoteSort(getBills,dispatch,page,size,searchValue)

    const customStyles:TableStyles = {
        headRow: {
            style: {
            border: 'none',
            backgroundColor : '#fff'

            },
        },
        headCells: {
            style: {
                color: '#B5B5C3',
                fontSize: '14px',
                position : 'relative',
                justifyContent : 'center'
            },
        },
        rows: {
            highlightOnHoverStyle: {
                backgroundColor: '#442b7e12',
                borderBottomColor: '#FFFFFF',
                borderRadius: '5px',
                outline: '1px solid #FFFFFF',
            },
            style : {
                cursor : 'pointer'
            }
        },
        pagination: {
            style: {
                border: 'none',
            },
        },
        cells: {
            style:{
                padding : '5px 0px',
                fontSize : '12px',
                justifyContent : 'center',
                fontWeight : '500',
                // cursor : 'pointer'
            }
        }
    };

    const data:sparepartTableData[] = [
        {id:1,name:'جورج استيفن عبد المسيح',code:"HGX885",qnt:"555",date:'20-10-2022',notes:"bmw-toyota-mercedes",price:'55'},
    ]

    const columns:TableColumn<sparepartTableData>[] = [
        {
            name: 'ID',
            selector: (row) => row.id || '',
            // width:'80px',
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row) => row?.name || '',
            sortable: true,
        },
        {
            name: 'Code',
            selector: (row) => row?.code || '',
            sortable: true,
            // minWidth : '180px'
        },
        {
            name: 'Quantity',
            selector: (row) => row?.qnt || '',
            sortable: false,
            // minWidth : '480px'
        },
        {
            name: 'Price',
            cell: (row) => <span data-tag="allowRowEvents" className="capitalize">{row?.price}</span> || '',
            sortable: false,
        },
        {
            name: 'Notes',
            cell: (row) => <span data-tag="allowRowEvents" className="capitalize">{row?.notes}</span> || '',
            sortable: false,
        },
        {
            name: 'Date',
            cell: (row) => <span data-tag="allowRowEvents" className="capitalize">{row?.date}</span> || '',
            sortable: false,
        },
        {
            name: 'Actions',
            allowOverflow: true,
            button : true,
            cell: row=>(
                <>
                    {<ActionCell data={row} />}
                </>
            )
                
        },
    ];

    const handlePageChange = (page:number) => {
        setpage(page);
    };

    const handleRowChange = (rows:number) => {
        setsize(rows);
    };

    return ( 
        <div>
            <DataTable
                columns={columns}
                data={data}
                pagination
                paginationPerPage = {size}
                paginationRowsPerPageOptions = {[10,50,100]}
                paginationServer
                // paginationTotalRows={couriers?.couriers?.meta?.total}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleRowChange}
                customStyles={customStyles}
                highlightOnHover
                // onRowClicked={(data)=>navigate('viewbill',{state:{data:data,type:'view'}})}
                sortServer
                onSort={handleRemoteSort}
                sortIcon={defState === 0 ? <FaSortAmountUp /> : <FaSortAmountUp className="text-[1px] opacity-0" />}
                // selectableRows
                // selectableRowsHighlight
                // onSelectedRowsChange={(e)=>console.log(e)}
            />
        </div>
    );
}

export default SparepartsDatatable;