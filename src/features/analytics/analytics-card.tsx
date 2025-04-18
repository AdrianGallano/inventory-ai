import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


interface AnalyticsCardProps {
    name: string;
    value: string;
    description: string
}

export default function AnalyticsCard({ name, value, description }: AnalyticsCardProps) {
    return (
        <Card className="gap-2">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent className="m-0">
                <p className="text-2xl font-bold">{value}</p>
            </CardContent>
            <CardFooter className="m-0s">
                <CardDescription>{description}</CardDescription>
            </CardFooter>
        </Card>
    );
}