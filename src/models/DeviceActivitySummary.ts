import {Monitor} from "@/models/Monitor";
import {Device} from "@/models/Device";

export interface DeviceActivitySummary {
    device: Device
    monitorSummaries: MonitorSummary[]
    lastActive: Date
    status: Status
}

export interface MonitorSummary {
    monitor: Monitor
    summary: string
    lastActive: Date
    status: Status
}

export enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}
