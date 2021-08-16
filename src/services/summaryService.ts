import {Device} from "@/models/Device";
import {Monitor} from "@/models/Monitor";
import {DeviceActivitySummary, MonitorSummary, Status} from "@/models/DeviceActivitySummary";
import {getActivitiesInMonitor} from "@/services/dbService";
import {Activity} from "@/models/Activity";

export const calculateDeviceSummary = async (device: Device, monitors: Monitor[]): Promise<DeviceActivitySummary> => {
    const deviceSummary = {} as DeviceActivitySummary
    deviceSummary.device = device
    deviceSummary.monitorSummaries = []

    const minutesWindow = 20;
    const currentDate = new Date();
    const date = new Date(currentDate.getTime() - minutesWindow * 60000 *50);
    for (const monitor of monitors) {
        const activities = await getActivitiesInMonitor(1000, monitor.id, date)
        console.log(activities, monitor.id, date)
        const monitorSummary = calculateMonitorSummary(monitor, activities)
        deviceSummary.monitorSummaries.push(monitorSummary)
    }

    const statuses = deviceSummary.monitorSummaries.map(sum => sum.status)
    if (statuses.includes(Status.ACTIVE)) {
        deviceSummary.status = Status.ACTIVE
    } else {
        deviceSummary.status = Status.INACTIVE
    }

    const activityDates = deviceSummary.monitorSummaries.sort((a, b) => (new Date(b.lastActive)).getMilliseconds() -( new Date(a.lastActive)).getMilliseconds()).map(act => act.lastActive);
    if (activityDates && activityDates.length > 0) {
        deviceSummary.lastActive = activityDates[0]
    }
    return deviceSummary
}

export const calculateMonitorSummary = (monitor: Monitor, activities: Activity[]): MonitorSummary => {
    const summary = {} as MonitorSummary
    summary.monitor = monitor
    if (!activities || activities.length === 0) {
        summary.status = Status.INACTIVE
        return summary
    } else {
        summary.status = Status.ACTIVE
    }

    const activityDates = activities.sort((a, b) =>( new Date(b.date)).getMilliseconds() - (new Date(a.date)).getMilliseconds()).map(act => act.date);
    summary.lastActive = activityDates[0]
    return summary
}

