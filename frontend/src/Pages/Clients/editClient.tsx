import { Box, Button, Modal } from "@mui/material";
import { FieldErrors, useForm } from "react-hook-form";
import { sparepartTableData } from "../../Components/Types/types";
import { FaRegTimesCircle } from "react-icons/fa";

export type ModalType = {
    open : boolean,
    close : ()=>void,
    data : object
}
const EditClientModal = ({open,close,data}:ModalType) => {
    const form = useForm()
    const {register,control,handleSubmit,formState,setValue,getValues,reset} = form
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {errors}:any = formState

    const style = {
        position: 'absolute',
        top: '37%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 3,
        p: 4,
        borderRadius : 5,
    };

    const modalSubmitHandler = ()=>{

    }
    return ( 
        <>
        <Modal
                open={open}
                onClose={()=>{
                    close()
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    dir='rtl'
                    className={`min-w-[650px] `}
                    sx={{position:'absolute',top:'11%',left:'50%',transform: 'translate(-50%, -10%)',bgcolor:'background.paper',boxShadow:3,p:4,borderRadius:5,height:'auto'}}>
                    <div className="w-full flex justify-between items-start">
                        <h2 className="text-xl text-mainBlue capitalize font-semibold">أضف عميل جديد</h2>

                        <div className="mb-4">
                            <span className="text-red-600 text-xl text-right [&>svg]:ml-auto cursor-pointer" onClick={close}><FaRegTimesCircle /></span>
                        </div>
                    </div>

                    <form className="mt-8 w-full h-full" onSubmit={handleSubmit(modalSubmitHandler)} noValidate>
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 [&>div>label]:block [&>div>label]:text-[#333] [&>div>label]:font-semibold [&>div>label]:mb-1 [&>div>input]:w-full [&>div>input]:p-2 [&>div>input]:bg-mainLightBlue [&>div>input]:rounded-md [&>div>input]:outline-none [&>div>input]:shadow-sm">
                            <div>
                                <label>الاسم:</label>
                                <input type="text" {...register('name',{
                                    required:{
                                        value:true,
                                        message : "هذا الحقل مطلوب"
                                    }
                                })} />
                                {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.name?.message}</p>}
                            </div>

                            <div>
                                <label>الهاتف:</label>
                                <input type="text" {...register('phone',{
                                    required:{
                                        value:true,
                                        message : "هذا الحقل مطلوب"
                                    }
                                })} />
                                
                                {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.phone?.message}</p>}
                            </div>

                            <div>
                                <label>السيارة:</label>
                                <input type="text" {...register('car',{
                                    required:{
                                        value:true,
                                        message : "هذا الحقل مطلوب"
                                    }
                                })} />
                                {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.car?.message}</p>}
                            </div>

                            <div>
                                <label>الشاسية:</label>
                                <input type="text" {...register('chassie',{
                                    required:{
                                        value:true,
                                        message : "هذا الحقل مطلوب"
                                    }
                                })} />
                                {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.chassie?.message}</p>}
                            </div>

                            <div>
                                <label>الماتور:</label>
                                <input type="text" {...register('motor',{
                                    required:{
                                        value:true,
                                        message : "هذا الحقل مطلوب"
                                    }
                                })} />
                                {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.motor?.message}</p>}
                            </div>

                            <div>
                                <label>اللون:</label>
                                <input type="text" {...register('color',{
                                    required:{
                                        value:true,
                                        message : "هذا الحقل مطلوب"
                                    }
                                })} />
                                {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.color?.message}</p>}
                            </div>
                        </section>

                        <section className="mt-8">
                            <Button type="submit" className="bg-mainBlue text-white font-semibold min-w-[150px]">حفظ</Button>
                        </section>
                    </form>
                </Box>
            </Modal>
        </>
    );
}

export default EditClientModal;