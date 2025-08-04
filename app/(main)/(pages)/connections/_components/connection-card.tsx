import { ConnectionTypes } from '@/lib/types';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    type: ConnectionTypes;
    icon: string;
    title: ConnectionTypes;
    description: string;
    callback?: () => void;
    connected: { [key: string]: boolean };
};

const ConnectionCard = ({ type, icon, title, description, connected }: Props) => {
    const isConnected = connected[type];

    return (
        <Card className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 min-h-[150px] border bg-card shadow-md">
        <div className="flex items-center gap-4 w-full sm:w-auto">
            <Image
            src={icon}
            alt={title}
            height={40}
            width={40}
            className="rounded-md object-contain" />

            <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-muted-foreground">
                {description}
            </CardDescription>
            </div>

        </div>

        <div className="flex-shrink-0">
            {isConnected ? (
            <div className="rounded-md border-2 border-green-500 bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                Connected
            </div>
                ) : (
            <Link
                href={
                title === 'Discord'
                ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT!
                : title === 'Notion'
                ? process.env.NEXT_PUBLIC_NOTION_AUTH_URL!
                : title === 'Slack'
                ? process.env.NEXT_PUBLIC_SLACK_REDIRECT!
                : '#'
                }
            className="rounded-md bg-white px-4 py-1 text-sm font-semibold text-black border border-gray-300 hover:bg-gray-100 transition" >
            
                Connect
            </Link>
            )}
        </div>
        </Card>
    );
};

export default ConnectionCard;




