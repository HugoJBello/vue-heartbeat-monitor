export interface Monitor {
    id: string
    deviceId: string
    monitorName: string
    monitorDescription: string
    created: Date
    updated: Date
    command: string
    type: string
    intervalSeconds: number
}

