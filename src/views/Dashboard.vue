<template>
  <v-card
      class="mx-auto card"
      max-width="344"
      v-if="devices"
  >
    <div v-for="device in devices" :key="device.id">
      <DeviceSummary :device=device :monitors=getDeviceMonitors(device)>
      </DeviceSummary>
    </div>

  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Monitor} from "@/models/Monitor";
import {Device} from "@/models/Device";
import {getDevicesAvailable, getMonitorsAvailable} from "@/services/dbService";
import DeviceSummary from "@/components/DeviceSummary.vue";

@Component({
  components: {DeviceSummary},
})
export default class Dashboard extends Vue {
  public monitors: Monitor[] | undefined
  public devices: Device[] | undefined

  async mounted() {
    this.monitors = await getMonitorsAvailable(10000)
    this.devices = await getDevicesAvailable(10000)
    this.$forceUpdate()
  }
  getDeviceMonitors(device:Device): Monitor[]{
    return (this.monitors as Monitor[]).filter(monitor => monitor.deviceId === device.id)
  }
}
</script>
<style>
.card {
  margin: 30px
}
</style>
