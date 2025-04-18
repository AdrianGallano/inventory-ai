import ProductTable from "@/features/products/product-table";
import { sampleData } from "@/features/products/contants/sampledata";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import AnalyticsCard from "@/features/analytics/analytics-card";

export default function Page() {
    return (
        <div className="flex flex-col gap-6 py-6 px-12">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Inventory Dashboard
            </h3>
            <div className="grid grid-cols-4 gap-6">
                <AnalyticsCard name="Total items" />
                <AnalyticsCard name="Low Stock" />
                <AnalyticsCard name="Out of Stock" />
                <AnalyticsCard name="Total Value" />
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
                                <Button variant="default">Add items</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ProductTable data={sampleData.slice(5)} />
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
                            sample keme.
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}