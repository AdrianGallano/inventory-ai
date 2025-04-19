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

interface EditProductFormProps {
    product: Product;
    onUpdate: (updatedProduct: Product) => void;
    onClose: () => void;
}

export default function EditProductForm({ product, onUpdate, onClose }: EditProductFormProps) {
    const [formData, setFormData] = useState({
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        price: product.price,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/products/${product.ID}/`, {
                method: "PUT",
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
                throw new Error("Failed to update product");
            }
            const updatedProduct: {
                id: number;
                name: string;
                category: string;
                quantity: number;
                price: number;
            } = await response.json();
            onUpdate({
                ID: updatedProduct.id.toString(),
                name: updatedProduct.name,
                category: updatedProduct.category,
                quantity: updatedProduct.quantity,
                price: updatedProduct.price,
            });
            onClose();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Edit Product</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <CardDescription>
                                Name
                            </CardDescription>
                            <input
                                type="text"
                                placeholder="Name"
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
                                placeholder="Category"
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
                                placeholder="Quantity"
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