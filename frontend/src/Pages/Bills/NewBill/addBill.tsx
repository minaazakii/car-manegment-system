import { Button } from "@mui/material";
import PersonalInfo from "./PersoanlInfo/billPersonalInfo";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { BillFormData } from "../../../Components/Types/types";
import PartsInfo from "./PartsInfo/partsInfo";
import LaboursInfo from "./LabooursInfo/laboursInfo";
import NotesInfo from "./NotesInfo/notes";
import TotalInfo from "./TotalBill/totalBillInfo";
import { toast } from "react-toastify";

const AddNewBill = () => {

    const {register,control,handleSubmit,formState,setValue,watch,getValues,unregister} = useForm<BillFormData>({
        // defaultValues: {
        //     parts: [
        //         { name: "part name", code: "code",price:20 },
        //         // { name: "part2", code: "value2" }
        //     ]
        // }
    })
    const {errors} = formState
    
    const { fields: parts, append : appenedParts, remove: removeParts } = useFieldArray({
        control,
        name: 'parts',
    });

    const { fields: labours, append : appenedLabours, remove: removeLabours } = useFieldArray({
        control,
        name: 'labours',
    });

    // console.log('parts',parts);
    // console.log('labours',labours);
    
    /* For SpareParts */
    const addPartsHandler = ()=>{
        appenedParts({})
    }
    const removePartsHandler = (index:number)=>{
        removeParts(index)
    }

    /* For Labours */
    const addLaboursHandler = ()=>{
        appenedLabours({})
    }
    const removeLaboursHandler = (index:number)=>{
        removeLabours(index)
    }

    const calculateTotal = () => {
        const data = getValues();
        const totalPartsValue = data?.parts?.reduce((sum, item) => sum + parseInt(item?.totalPrice?.toString() || '0'), 0) || 0;
        const totalLaboursValue = data?.labours?.reduce((sum, item) => sum + parseInt(item?.price?.toString() || '0'), 0) || 0;
        const total =  totalPartsValue + totalLaboursValue
        setValue('totalValue',total)
        return total;
    }

    const handleBillSubmit = (data:BillFormData)=>{
        
        if(data?.totalValue === 0 || data?.totalValue === '0'){
            toast.error('الاجمالى لا يمكن ان يكون ب 0')
        }else if(!data?.totalValue){
            toast.error('اضغط علي احسب الفاتورة قبل الحفظ')
        }else {
            console.log(data); 
        }
    }

    
    return ( 
        <form className="text-mainDark" dir="rtl" noValidate onSubmit={handleSubmit(handleBillSubmit)}>
            <section className="Bill-Personal_info">
                <h2 className="mb-4 text-2xl font-semibold">بيانات العميل</h2>
                <PersonalInfo register={register} control={control} errors={errors} getValues={getValues} setValue={setValue} />
            </section>

            <section className="bill-spareparts-info-wrapper mt-3">
                <h2 className="mb-4 text-2xl font-semibold">بيان قطع الغيار</h2>
                <PartsInfo register={register} control={control} errors={errors} setValue={setValue} watch={watch} parts={parts} add={addPartsHandler} remove={removePartsHandler} />
            </section>

            <section className="bill-Labours-info-wrapper mt-3">
                <h2 className="mb-4 text-2xl font-semibold">بيان المصنعيات</h2>
                <LaboursInfo register={register} control={control} errors={errors} setValue={setValue} labours={labours} add={addLaboursHandler} remove={removeLaboursHandler} />
            </section>

            <section className="notes-wrapper mt-3">
                <h2 className="mb-4 text-2xl font-semibold">ملاحظات</h2>
                <NotesInfo register={register} control={control} errors={errors} setValue={setValue} />
            </section>

            <section className="total-bill-info-wrapper mt-3">
                <h2 className="mb-4 text-2xl font-semibold">اجمالى الفاتورة</h2>
                <TotalInfo register={register} unregister={unregister} control={control} errors={errors} setValue={setValue} watch={watch} calc={calculateTotal} />
            </section>

            <div className="my-4">
                <Button type='submit' className="p-2 bg-mainBlue text-white capitalize min-w-[150px] font-semibold">حفظ الفاتورة</Button>
            </div>
        </form>
    );
}

export default AddNewBill;