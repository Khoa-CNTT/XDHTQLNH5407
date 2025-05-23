<?php

namespace Database\Seeders;

use App\Models\Warehouse;
use App\Models\WarehouseInvoice;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WarehouseInvoiceSeeder extends Seeder
{
    public function run(): void
    {
        $invoices = [
            [
                'id_ingredient' => 1,
                'quantity' => 50,
                'price' => 200000,
                'stock_in_date' => '2025-05-01',
            ],
            [
                'id_ingredient' => 2,
                'quantity' => 80,
                'price' => 120000,
                'stock_in_date' => '2025-05-01',
            ],
            [
                'id_ingredient' => 3,
                'quantity' => 60,
                'price' => 180000,
                'stock_in_date' => '2025-05-02',
            ],
            [
                'id_ingredient' => 4,
                'quantity' => 100,
                'price' => 220000,
                'stock_in_date' => '2025-05-02',
            ],
            [
                'id_ingredient' => 5,
                'quantity' => 70,
                'price' => 90000,
                'stock_in_date' => '2025-05-03',
            ],
        ];


        foreach ($invoices as $invoice) {
            WarehouseInvoice::create($invoice);
        }
    }
}
