"use client";

import { useEffect, useState } from "react";
import ProductTable from "@/features/products/product-table";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import AnalyticsCard from "@/features/analytics/analytics-card";
import AddProductForm from "@/features/crud/AddProductForm";
import EditProductForm from "@/features/crud/EditProductForm";
import Product from "@/features/products/domains/Product";
import InsightsTabs from "@/features/insights/InsightsTabs";

interface ApiProduct {
    id: number;
    name: string;
    category: string;
    quantity: number;
    price: number;
}

interface Insights {
    summary: string;
    trends: string;
    actions: string;
}


export default function Page() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [insights, setInsights] = useState<Insights | null>(null);
    const [insightsLoading, setInsightsLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const response = await fetch("http://127.0.0.1:8000/api/products/", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data: ApiProduct[] = await response.json();
                const transformedData: Product[] = data.map((item) => ({
                    ID: item.id.toString(),
                    name: item.name,
                    category: item.category,
                    quantity: item.quantity,
                    price: item.price,
                }));
                setProducts(transformedData);
            }
            catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const generateInsights = async () => {
        setInsightsLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/insights/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error("Insights API Error:", response.status, errorBody);
                throw new Error(`Failed to generate insights: ${errorBody}`);
            }

            const generatedInsights = await response.json();
            setInsights(generatedInsights);
        } catch (error) {
            console.error("Error generating insights:", error);
            setInsights({
                summary: "Unable to generate summary at this time.",
                trends: "Unable to generate trends at this time.",
                actions: "Unable to generate actions at this time.",
            });
        } finally {
            setInsightsLoading(false);
        }
    };

    const handleAddProduct = (newProduct: Product) => {
        setProducts([...products, newProduct]);
    };

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setShowEditForm(true);
    };

    const handleUpdateProduct = (updatedProduct: Product) => {
        setProducts(products.map((p) => (p.ID === updatedProduct.ID ? updatedProduct : p)));
        setShowEditForm(false);
        setSelectedProduct(null);
    };

    const handleDeleteProduct = async (id: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete product");
            }
            setProducts(products.filter((p) => p.ID !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    if (loading) {
        return <div className="flex justify-center py-6 px-12">Loading...</div>;
    }

    // Calculate analytics metrics
    const totalItems = products.length;
    const lowStock = products.filter((p) => p.quantity <= 10).length; // Adjust threshold as needed
    const outOfStock = products.filter((p) => p.quantity === 0).length;
    const totalValue = products.reduce((sum, p) => sum + p.quantity * p.price, 0).toFixed(2);

    return (
        <div className="flex flex-col gap-6 py-6 px-12">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Inventory Dashboard
            </h3>
            <div className="grid grid-cols-4 gap-6">
                <AnalyticsCard name="Total Items" value={totalItems.toString()} description="Across all categories"/>
                <AnalyticsCard name="Low Stock" value={lowStock.toString()} description="Items that need reordering"/>
                <AnalyticsCard name="Out of Stock" value={outOfStock.toString()} description="Items currently unavailable"/>
                <AnalyticsCard name="Total Value" value={`$${totalValue}`} description="Current inventory value"/>
            </div>
            <div className="flex gap-4">
                <div className="flex-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>
                                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                            Inventory Items
                                        </h4>
                                    </CardTitle>
                                    <CardDescription>
                                        Manage your inventory items
                                    </CardDescription>
                                </div>
                                <Button
                                    variant="default"
                                    onClick={() => setShowAddForm(true)}
                                >
                                    Add items
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ProductTable data={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct}/>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex-2">
                    <Card className="p-4">
                        <CardHeader className="p-0">
                            <CardTitle>
                                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                    AI Insights
                                </h4>
                            </CardTitle>
                            <CardDescription>
                                AI-powered analysis and recommendations
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="h-[430px]">
                            <InsightsTabs
                                insights={insights}
                                onGenerate={generateInsights}
                                isLoading={insightsLoading}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
            {showAddForm && (
                <AddProductForm
                    onAdd={handleAddProduct}
                    onClose={() => setShowAddForm(false)}
                />
            )}
            {showEditForm && selectedProduct && (
                <EditProductForm
                    product={selectedProduct}
                    onUpdate={handleUpdateProduct}
                    onClose={() => {
                        setShowEditForm(false);
                        setSelectedProduct(null);
                    }}
                />
            )}
        </div>
    );
}