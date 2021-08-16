<template>
  <span>

  </span>
</template>



<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Monitor} from "@/models/Monitor";
import {Device} from "@/models/Device";
import {calculateDeviceSummary} from "@/services/summaryService";
import {DeviceActivitySummary} from "@/models/DeviceActivitySummary";

@Component({
})
export default class DeviceSummary extends Vue {
  @Prop({required: false})
  public monitors: Monitor[] | undefined

  @Prop({required: false})
  public device: Device | undefined

  public summary: DeviceActivitySummary | undefined
  async mounted() {
    if (this.device && this.monitors){
      const summary = await calculateDeviceSummary(this.device,this.monitors)
      this.summary = summary as DeviceActivitySummary
      console.log(this.summary)
    }
  }


}
</script>


<style scoped>

</style>
