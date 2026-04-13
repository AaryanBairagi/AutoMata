import { currentUser } from "@clerk/nextjs/server";
import ClientConnections from "./_components/client-connection";

export default async function Page({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const user = await currentUser();
    if (!user) return null;

    return (
    <ClientConnections
        searchParams={searchParams as { [key: string]: string }}
        userId={user.id}
    />
    );
}
