import { Control, Controller, FieldErrors, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { BillFormData, personalInfo } from "../../../../Components/Types/types";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";

type PerosnalInfoPropsType = {
    register : UseFormRegister<BillFormData>,
    control?: Control<FieldValues>;
    errors? : FieldErrors<BillFormData>,
    getValues?:UseFormGetValues<BillFormData>,
    setValue?: UseFormSetValue<BillFormData> | undefined
}
const PersonalInfo:React.FC<PerosnalInfoPropsType> = ({register,errors,control,getValues,setValue}) => {

    const [selectedOption, setSelectedOption] = useState<personalInfo | null>(null);

    const clientData = [
        {id:1,name:'george steven',phoneNumber:'01285325645',brand:'changan',model:'2024',paletNumber:'ع ج ا 7552', chassis:'25568564565',motor:'4545487',color:'احمر', }
    ]

    useEffect(() => {
        if (setValue && selectedOption) {
            setValue('name',selectedOption.name)
            setValue('phoneNumber',selectedOption.phoneNumber)
            setValue('brand',selectedOption.brand)
            setValue('model',selectedOption.model)
            setValue('paletNumber',selectedOption.paletNumber)
            setValue('chassis',selectedOption.chassis)
            setValue('motor',selectedOption.motor)
            setValue('color',selectedOption.color)
        }
    }, [selectedOption,setValue,getValues])
    

    const date = new Date()
    const defaultDate = date?.toISOString().slice(0, 10) 
    
    return ( 
        <div className="personal-details p-2 ronded-sm shadow-md bg-white py-6 px-5 rounded-md">
            <section className="flex flex-wrap justify-between items-center gap-x-3 w-full gap-y-3 [&>div]:grow  [&>div>input]:p-2 [&>div>input]:rounded-md [&>div>input]:bg-mainLightBlue [&>div>input]:focus-within:outline-0 [&>div>input]:transition-all [&>div>input]:duration-200 [&>div>label]:font-semibold">
                
                <div className="flex flex-wrap items-center gap-x-2 grow  [&>div]:grow w-full [&>div>input]:p-2 [&>div>input]:rounded-md [&>div>input]:border [&>div>input]:bg-mainLightBlue [&>div>input]:focus-within:outline-0  [&>div>input]:transition-all [&>div>input]:duration-200 [&>div>label]:font-semibold [&>div>input]:text-[#333333] [&>input]:border [&>input]:focus-within:border-mainBlue">
                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block ">
                        <label> اسم العميل: </label>
                        
                        <Controller
                            name="client"
                            control={control}
                            defaultValue=""
                            rules={{required:'هذا الحقل مطلوب'}}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    options={clientData}
                                    getOptionLabel={(option) => option.name || ''}
                                    isOptionEqualToValue={(option: personalInfo, value: personalInfo) => option.id === value.id}
                                    className="grow bg-mainLightBlue"
                                    disablePortal
                                    id="client-select"
                                    sx={{ width: 'auto','& .MuiInputBase-colorPrimary' : {color:'#333333'},'& .MuiAutocomplete-inputRoot' : {py:'0px'}, '& .MuiOutlinedInput-root':{p:'.1rem'},'& .MuiOutlinedInput-notchedOutline' : {border:'1px solid #e5e7eb'} }}
                                    renderInput={(params) => <TextField {...params} label="" />}
                                    onChange={(_, data) => {
                                        field.onChange(data)
                                        setSelectedOption(data);
                                        // if(data === null){
                                        //     setSelectedOption({})
                                        // }
                                    }}
                                    // onClear={()=>setSelectedOption({})}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.client?.message}</p>}
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
                            value={selectedOption?.phoneNumber}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.phoneNumber?.message}</p>}
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
                            value={selectedOption?.brand}
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
                            value={selectedOption?.model}
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
                            value={selectedOption?.paletNumber}
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
                            value={selectedOption?.chassis}
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
                            value={selectedOption?.motor}
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
                            value={selectedOption?.color}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.color?.message}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> تاريخ الدخول : </label>
                        <input type="date" 
                            className=""
                            defaultValue={defaultDate}
                            placeholder="تاريخ الدخول"
                            {...register('inDate',{
                                required:{
                                    value:true,
                                    message:'هذا العنصر مطلوب'
                                }
                            })}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.inDate?.message}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> تاريخ الخروج : </label>
                        <input type="date" 
                            className=""
                            defaultValue={defaultDate}
                            placeholder="تاريخ الخروج"
                            {...register('outDate',{
                                required:{
                                    value:true,
                                    message:'هذا العنصر مطلوب'
                                }
                            })}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.outDate?.message}</p>}
                    </div>

                </div>

                
            </section>
        </div>
    );
}

export default PersonalInfo;