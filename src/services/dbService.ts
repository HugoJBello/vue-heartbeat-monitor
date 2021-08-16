import {
    activityCollection, deviceCollection, monitorCollection
} from "@/firebase";
import {Device} from "@/models/Device";
import {Monitor} from "@/models/Monitor";
import {Activity} from "@/models/Activity";

export const getDevicesAvailable = async (limit: number): Promise<Device[]> => {
    const result = await deviceCollection.limit(limit).get()
    const quizzes = []

    for (const doc of result.docs) {
        quizzes.push(doc.data() as Device)
    }
    return quizzes
}

export const getMonitorsAvailable = async (limit: number): Promise<Monitor[]> => {
    const result = await monitorCollection.limit(limit).get()
    const quizzes = []

    for (const doc of result.docs) {
        quizzes.push(doc.data() as Monitor)
    }
    return quizzes
}

export const getMonitorsInDeviceAvailable = async (limit: number, deviceId: string): Promise<Monitor[]> => {
    const result = await monitorCollection.limit(limit).where("deviceId", "==", deviceId).get()
    const quizzes = []

    for (const doc of result.docs) {
        quizzes.push(doc.data() as Monitor)
    }
    return quizzes
}

export const getActivitiesInDevice = async (limit: number, deviceId: string, date: Date): Promise<Activity[]> => {
    const result = await activityCollection.limit(limit).where("deviceId", "==", deviceId).where("date", ">=", date).get()
    const quizzes = []

    for (const doc of result.docs) {
        quizzes.push(doc.data() as Activity)
    }
    return quizzes
}



export const getActivitiesInMonitor = async (limit: number, monitorId: string, date: Date): Promise<Activity[]> => {
    const result = await activityCollection.limit(limit).where("monitorId", "==", monitorId).where("date", ">", date).get()
    const quizzes = []

    for (const doc of result.docs) {
        quizzes.push(doc.data() as Activity)
    }
    return quizzes
}
