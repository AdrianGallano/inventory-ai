"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Product from "@/features/products/domains/Product";

interface AddProductFormProps {
    onAdd: (newProduct: Product) => void; 
    onClose: () => void;
}

export default function AddProductForm({ onAdd, onClose }: AddProductFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        quantity: 0,
        price: 0,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/products/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    category: formData.category,
                    quantity: formData.quantity,
                    price: formData.price,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to add product");
            }
            const addedProduct: {
                id: number;
                name: string;
                category: string;
                quantity: number;
                price: number;
            } = await response.json();
            // Transform to match Product type
            onAdd({
                ID: addedProduct.id.toString(), // Convert number to string for Product.d.ts
                name: addedProduct.name,
                category: addedProduct.category,
                quantity: addedProduct.quantity,
                price: addedProduct.price,
            });
            onClose();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Add New Product</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <CardDescription>
                                Name
                            </CardDescription>
                            <input 
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="border p-2 rounded"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <CardDescription>
                                Category
                            </CardDescription>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                }
                                className="border p-2 rounded"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <CardDescription>
                                Quantity
                            </CardDescription>               
                            <input
                                type="number"
                                value={formData.quantity}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        quantity: parseInt(e.target.value) || 0,
                                    })
                                }
                                className="border p-2 rounded"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <CardDescription>
                                Price
                            </CardDescription>
                            <input
                                type="number"
                                placeholder="Price"
                                value={formData.price}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        price: parseFloat(e.target.value) || 0,
                                    })
                                }
                                className="border p-2 rounded"
                                step="0.01"
                                required
                            />
                        </div>
                        <div className="flex gap-2 justify-end">
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}