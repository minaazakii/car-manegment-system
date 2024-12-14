<?php

namespace App\Services;

use App\Models\Bill;
use App\Models\Brand;
use App\Models\Client;
use App\Models\SparePart;
use Illuminate\Support\Facades\DB;

class BillService
{
    public function storeBill(array $data): Bill
    {
        DB::beginTransaction();
        try {
            $client = Client::findOrFail($data['client_id']);
            $brand = Brand::findOrFail($data['brand_id']);
            $data['client_name'] = $client->name;
            $data['brand_name'] = $brand->name;
            $data['tax_amount'] = $this->getTaxAmount($data['sub_total'], $data['tax_rate']);
            $data['grand_total'] = $data['sub_total'] + $data['tax_amount'];

            $bill = Bill::create($data);

            if (isset($data['bill_spare_parts'])) {
                $this->assignBillSpareParts($bill, $data['bill_spare_parts']);
            }

            if (isset($data['bill_labors'])) {
                $this->assignBillLabors($bill, $data['bill_labors']);
            }

            DB::commit();
            return $bill;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function assignBillSpareParts(Bill $bill, array $billSpareParts): void
    {
        foreach ($billSpareParts as $billSparePart) {
            $sparePart = SparePart::findOrFail($billSparePart['spare_part_id']);
            $bill->spareParts()->create([
                'spare_part_id' => $billSparePart['spare_part_id'],
                'spare_part_name' => $sparePart->name,
                'spare_part_code' => $sparePart->code,
                'unit_price' => $billSparePart['unit_price'],
                'quantity' => $billSparePart['quantity'],
                'grand_total' => $billSparePart['unit_price'] * $billSparePart['quantity'],
            ]);
        }
    }

    public function assignBillLabors(Bill $bill, array $billLabors): void
    {
        foreach ($billLabors as $billLabor) {
            $bill->labors()->create([
                'name' => $billLabor['name'],
                'price' => $billLabor['price'],
            ]);
        }
    }

    private function getTaxAmount(float $subTotal, float $taxRate): float
    {
        return $subTotal * ($taxRate / 100);
    }
}
