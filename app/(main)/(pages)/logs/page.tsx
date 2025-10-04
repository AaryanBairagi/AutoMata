import { getLogs } from '@/lib/logs'
import { Card, CardContent } from '@/components/ui/card'
import { format } from 'date-fns'

export default async function LogsPage() {
    const logs = await getLogs()

    return (
        <div className="flex flex-col gap-4">
            {/* Heading similar to SETTINGS */}
            <h1 className="z-[10] flex items-center justify-between border-b bg-background p-6 text-4xl font-bold">
                <span>LOGS</span>
            </h1>

            <div className="flex flex-col gap-6 p-6">
                {/* Subheading */}
                <div>
                    <h2 className="text-2xl font-bold">Recent Activity</h2>
                    <p className="text-base text-white/50 hover:text-white/80 hover:drop-shadow-md">
                        (These are recent actions and events)
                    </p>
                </div>

                {/* No logs state */}
                {logs.length === 0 && (
                    <p className="text-muted-foreground">No logs yet.</p>
                )}

                {/* Log Cards */}
                {logs.map((log) => (
                    <Card key={log.id} className="bg-muted/20 border border-white/10 shadow-md hover:shadow-lg transition">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <p className="text-base font-semibold capitalize">{log.action.replace(/_/g, ' ')}</p>
                                <p className="text-sm text-muted-foreground">
                                    {format(new Date(log.timestamp), 'PPpp')}
                                </p>
                            </div>
                            <p className="text-sm mt-2 text-white/80">{log.message}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
