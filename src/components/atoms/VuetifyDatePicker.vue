<template>
  <v-menu
    ref="timePickerMenu"
    v-model="timePickerMenu"
    :close-on-content-click="false"
    :return-value.sync="dateBuffer"
    transition="scale-transition"
    min-width="0"
  >
    <template v-slot:activator="{ on }">
      <v-text-field 
        v-if="!multiple"
        v-model="dateBuffer"
        :disabled="disabled"
        :label="label"
        prepend-icon="event"
        v-on="on"
      ></v-text-field>

      <v-combobox
        v-else
        outlined
        multiple
        chips
        small-chips
        v-model="dateBuffer"
        :disabled="disabled"
        :label="label"
        prepend-icon="event_note"
        v-on="on"
      ></v-combobox>
    </template>

    <v-date-picker 
      v-model="dateBuffer"
      :multiple="multiple"
    >
      <v-btn text color="primary" @click="timePickerMenu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="updateDate">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
  import moment from 'moment-mini';

  @Component({ name: 'vuetify-date-picker' })
  export default class VietifyDatePicker extends Vue {
    @Prop(String)
    label!: string;

    @Prop()
    date!: string | string[];

    @Prop(Boolean)
    multiple?: boolean;

    @Prop(Boolean)
    disabled?: boolean;

    timePickerMenu = false;
    dateBuffer: string | string[] | null = null;

    @Watch('date', { immediate: true })
    onDateUpdated(newDate: string | string[]) {
      if (this.multiple && !this.date) {
        return this.dateBuffer = [];
      }

      this.dateBuffer = this.date;
    }

    updateDate() {
      const timePickerRef = this.$refs.timePickerMenu as any;
      timePickerRef.save(this.dateBuffer);
      this.$emit('update:date', this.dateBuffer);
    }
  }
</script>
