import { Control, Controller, FieldErrors, UseFormReturn} from "react-hook-form";
import { BillFormData, partsData } from "../../../../Components/Types/types";
import { Autocomplete, Button, TextField } from "@mui/material";

function getPartName(index: number): keyof BillFormData {
    return `parts.${index}` as never;
}

type PartsFormProps = {
    register : UseFormReturn['register'],
    control: Control<BillFormData>,
    errors : FieldErrors<BillFormData>,
    parts : partsData[],
    setValue: UseFormReturn['setValue'],
    watch:UseFormReturn['watch'],
    add : ()=>void,
    remove : (e:number)=>void
}
const PartsInfo:React.FC<PartsFormProps> = ({register,errors,control,setValue,watch,parts,add,remove}) => {
    // console.log(parts);

    const top100Films = [
        { id:1, name: 'تيل امامى شانجى', code: 1994,price:20 },
        { id:2, name: 'فتر زيت', code: 8559,price:133 },
        { id:3, name: 'فلتر بنزين', code: 11112,price:85 },
    ]

    // console.log(parts);
    
    return ( 
        <div className="personal-details p-2 ronded-sm shadow-md bg-white py-3 rounded-md">
            <section className="flex flex-wrap justify-between items-center gap-x-3 w-full gap-y-3 [&>div]:grow [&>div>input]:p-2 [&>div>input]:rounded-md [&>div>input]:bg-mainLightBlue [&>div>input]:focus-within:outline-0 [&>div>input]:transition-all [&>div>input]:duration-200 [&>div>label]:font-semibold">
                <div className="add-field-btn-wrapper mb-2">
                    <Button className="bg-mainBlue capitalize text-sm text-white" onClick={add}>أضف عنصر جديد</Button>
                </div>

                {parts&&parts?.map( (item,index)=>(
                    <div key={index} className="flex gap-x-3 border-b pb-3 w-full items-center justify-between [&>div>label]:block [&>div>label]:mb-1 [&>div>label]:font-semibold [&>div>input]:grow [&>div>input]:p-3 [&>div>input]:rounded-md [&>div>input]:bg-mainLightBlue [&>div>input]:focus-within:outline-0 [&>div>input]:transition-all [&>div>input]:duration-200" >
                        <div className="w-full" >
                            <label>اسم الصنف</label>
                            <Controller
                                name={getPartName(index)}
                                control={control}
                                defaultValue="" // or your default value
                                rules={{ required: { value: true, message: 'must select item' } }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <Autocomplete
                                        value={top100Films.find(option => option.name === value) || null}
                                        onChange={(_, newValue) => {
                                            onChange(newValue?.name || '')
                                            setValue(`parts[${index}].id`, newValue?.id || '')
                                            setValue(`parts[${index}].name`, newValue?.name || '')
                                            setValue(`parts[${index}].price`, newValue?.price || 0)
                                            setValue(`parts[${index}].code`, newValue?.code || '')
                                        }}
                                        disablePortal
                                        id={`parts${item?.id}`}
                                        options={top100Films}
                                        getOptionLabel={(option)=>option?.name}
                                        sx={{ width:'auto',borderRadius:'6px','& fieldset':{borderColor:'transparent'},'& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root':{padding:'5px'} }}
                                        className="bg-mainLightBlue border-none"
                                        renderInput={(params) => <TextField {...params} label="اسم الصنف" error={!!error} helperText={error?.message} />}
                                    />
                                )}
                            />
                        </div>

                        <div className="w-full">
                            <label>الكود</label>
                            <p className="p-3 h-full bg-mainLightBlue rounded-md">{watch(`parts[${index}].code`) || 'غير محدد'}</p>
                        </div>

                        <div className="w-full">
                            <label>سعر الوحده</label>
                            <p className="p-3 bg-mainLightBlue rounded-md grow">{watch(`parts[${index}].price`) || 'غير محدد'}</p>
                        </div>

                        <div className="w-full">
                            <label>الكمية</label>
                            <input type="number" 
                                placeholder="الكمية"
                                className="grow w-full"
                                {...register(`parts[${index}].amount`,{
                                    required:{
                                        value : true,
                                        message : 'Must Enter Amount'
                                    }
                                })}

                                onChange={(e)=>{
                                    const amount:number = parseInt(e?.target?.value)
                                    setValue(`parts[${index}].totalPrice`, (amount * watch(`parts[${index}].price`)))
                                }}
                            />
                        </div>

                        <div className="w-full">
                            <label>الاجمالى</label>
                            {/* <p className="p-3 bg-mainLightBlue rounded-md grow">{totalPrice !==0 ? totalPrice: 'غير محدد'}</p> */}
                            <input type="number" className="w-full" value={watch(`parts[${index}].totalPrice`) || 0} readOnly />
                        </div>

                        <div className="w-fit self-end mb-2">
                            <Button className="text-white text-sm bg-red-700" onClick={()=>remove(index)}>-</Button>
                        </div>
                    </div>
                ) )}
            </section>
        </div>
    );
}

export default PartsInfo;