import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { BillFormData } from "../../../../Components/Types/types";

type PerosnalInfoPropsType = {
    register : UseFormRegister<BillFormData>,
    control: Control<BillFormData>;
    errors : FieldErrors<BillFormData>
}
const PersonalInfo:React.FC<PerosnalInfoPropsType> = ({register,errors}) => {
    
    return ( 
        <div className="personal-details p-2 ronded-sm shadow-md bg-white py-6 px-5 rounded-md">
            <section className="flex flex-wrap justify-between items-center gap-x-3 w-full gap-y-3 [&>div]:grow  [&>div>input]:p-2 [&>div>input]:rounded-md [&>div>input]:bg-mainLightBlue [&>div>input]:focus-within:outline-0 [&>div>input]:transition-all [&>div>input]:duration-200 [&>div>label]:font-semibold">
                
                <div className="flex flex-wrap items-center gap-x-2 grow [&>div]:grow w-full [&>div>input]:p-2 [&>div>input]:rounded-md [&>div>input]:bg-mainLightBlue [&>div>input]:focus-within:outline-0 [&>div>input]:transition-all [&>div>input]:duration-200 [&>div>label]:font-semibold [&>input]:border [&>input]:focus-within:border-mainBlue">
                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block">
                        <label> اسم العميل: </label>
                        <input type="text" 
                            className="grow"
                            placeholder="اسم العميل"
                            {...register('name',{
                                required:{
                                    value:true,
                                    message:'هذا العنصر مطلوب'
                                }
                            })}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.name?.message}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block">
                        <label> رقم التليفون: </label>
                        <input type="text" 
                            className="grow"
                            placeholder="رقم التليفون"
                            {...register('phoneNumber',{
                                required:{
                                    value:true,
                                    message:'هذا العنصر مطلوب'
                                }
                            })}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.name?.message}</p>}
                    </div>
                </div>

                <div className="pt-3 border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-y-4 gap-x-3 [&>div]:w-full [&>div>input]:grow [&>div>input]:p-2 [&>div>input]:rounded-md [&>div>input]:bg-mainLightBlue [&>div>input]:focus-within:outline-0 [&>div>input]:transition-all [&>div>input]:duration-200 [&>div>label]:font-semibold">

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> الماركه : </label>
                        <input type="text" 
                            className=""
                            placeholder="الماركه"
                            {...register('brand',{
                                required:{
                                    value:true,
                                    message:'هذا العنصر مطلوب'
                                }
                            })}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.brand?.message}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> الموديل : </label>
                        <input type="text" 
                            className=""
                            placeholder="الموديل"
                            {...register('model',{
                                required:{
                                    value:true,
                                    message:'هذا العنصر مطلوب'
                                }
                            })}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.model?.message}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> رقم السيارة : </label>
                        <input type="text" 
                            className=""
                            placeholder="رقم السياره"
                            {...register('paletNumber',{
                                required:{
                                    value:true,
                                    message:'هذا العنصر مطلوب'
                                }
                            })}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.paletNumber?.message}</p>}
                    </div>

                    <hr className="col-span-3" />

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> رقم الشاسية : </label>
                        <input type="text" 
                            className=""
                            placeholder="رقم الشاسية"
                            {...register('chassis',{
                                required:{
                                    value:true,
                                    message:'هذا العنصر مطلوب'
                                }
                            })}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.chassis?.message}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> رقم الماتور : </label>
                        <input type="text" 
                            className=""
                            placeholder="رقم الماتور"
                            {...register('motor',{
                                required:{
                                    value:true,
                                    message:'هذا العنصر مطلوب'
                                }
                            })}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.motor?.message}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> رقم العداد : </label>
                        <input type="text" 
                            className=""
                            placeholder="رقم العداد"
                            {...register('odometer',{
                                required:{
                                    value:true,
                                    message:'هذا العنصر مطلوب'
                                }
                            })}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.odometer?.message}</p>}
                    </div>

                    <hr className="col-span-3" />

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> اللون : </label>
                        <input type="text" 
                            className=""
                            placeholder="اللون"
                            {...register('color',{
                                required:{
                                    value:true,
                                    message:'هذا العنصر مطلوب'
                                }
                            })}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.color?.message}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> تاريخ الدخول : </label>
                        <input type="date" 
                            className=""
                            placeholder="تاريخ الدخول"
                            {...register('inDate',{
                                required:{
                                    value:true,
                                    message:'هذا العنصر مطلوب'
                                }
                            })}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.color?.message}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> تاريخ الخروج : </label>
                        <input type="date" 
                            className=""
                            placeholder="تاريخ الخروج"
                            {...register('outDate',{
                                required:{
                                    value:true,
                                    message:'هذا العنصر مطلوب'
                                }
                            })}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.color?.message}</p>}
                    </div>

                </div>

                
            </section>
        </div>
    );
}

export default PersonalInfo;