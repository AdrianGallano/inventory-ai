import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


interface AnalyticsCardProps {
    name: string
}

export default function AnalyticsCard({ name }: AnalyticsCardProps) {
    return (
        <Card className="gap-2">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent className="m-0">
                <p>Card Content</p>
            </CardContent>
            <CardFooter className="m-0s">
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    );
}