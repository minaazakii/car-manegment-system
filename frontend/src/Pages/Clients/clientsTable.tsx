import { useState } from "react";
import DataTable, { TableColumn, TableStyles } from "react-data-table-component";
import {useRemoteSort} from '../../Components/Common/SortHook/sortHook'
import { FaSortAmountUp } from "react-icons/fa";
import { getBills } from "../../Components/Redux/Slices/Bills/bills";
import { useAppDispatch } from "../../Components/Redux/TsHooks";
import { useNavigate } from "react-router-dom";
import { Button, ListItemButton, Menu, MenuItem } from "@mui/material";
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import { clients, sparepartTableData } from "../../Components/Types/types";
import EditClientModal from "./editClient";

const ActionCell = ({data}:{data:clients})=>{
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

            <EditClientModal open={openModal} close={handelModalClose} data={data} />
        </div>
    );
}

const ClientsTable = () => {
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

    const data:clients[] = [
        {id:1,name:'جورج استيفن عبد المسيح',phone:"01125456",car:"bmw",chassie:'20102022',motor:"ggg22155",color:'red'},
    ]

    const columns:TableColumn<clients>[] = [
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
            name: 'Phone',
            selector: (row) => row?.phone || '',
            sortable: true,
        },
        {
            name: 'Car',
            selector: (row) => row?.car || '',
            sortable: true,
            // minWidth : '180px'
        },
        {
            name: 'Chassie',
            selector: (row) => row?.chassie || '',
            sortable: false,
            // minWidth : '480px'
        },
        {
            name: 'Motor',
            cell: (row) => <span data-tag="allowRowEvents" className="capitalize">{row?.motor}</span> || '',
            sortable: false,
        },
        {
            name: 'Color',
            cell: (row) => <span data-tag="allowRowEvents" className="capitalize">{row?.color}</span> || '',
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

export default ClientsTable;