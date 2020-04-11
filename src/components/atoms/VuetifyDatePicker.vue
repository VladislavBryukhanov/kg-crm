<template>
  <v-menu
    ref="timePickerMenu"
    v-model="timePickerMenu"
    :close-on-content-click="false"
    :return-value.sync="dateBuffer"
    transition="scale-transition"
  >
    <template v-slot:activator="{ on }">
      <v-text-field 
        v-model="dateBuffer"
        :label="label"
        prepend-icon="event"
        v-on="on"
      ></v-text-field>
    </template>

    <v-date-picker no-title v-model="dateBuffer">
      <v-btn text color="primary" @click="timePickerMenu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="updateDate">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component({ name: 'vuetify-date-picker' })
  export default class VietifyDatePicker extends Vue {
    @Prop(String)
    label!: string;

    @Prop(String)
    date!: string;

    timePickerMenu = false;
    dateBuffer = '';

    mounted() {
      this.dateBuffer = this.date;
    }

    updateDate() {
      const timePickerRef = this.$refs.timePickerMenu as any;
      timePickerRef.save(this.dateBuffer);
      this.$emit('update:date', this.dateBuffer);
    }
  }
</script>
