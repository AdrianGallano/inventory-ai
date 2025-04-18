'use client'
import ProductTable from "@/features/products/product-table"
import { sampleData } from "@/features/products/contants/sampledata";

export default function Page() {
    return (
        <div className="py-6 px-12">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Inventory Products
            </h3>
            <div>
                <ProductTable 
                    data={sampleData} 
                    onEdit={(product) => console.log('Edit product:', product)} 
                    onDelete={(productId) => console.log('Delete product with ID:', productId)} 
                />
            </div>
        </div>
    );
}