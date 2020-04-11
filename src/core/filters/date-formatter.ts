import Vue from 'vue';
import moment from 'moment-mini';

Vue.filter('date', (dateString: string, format: string) => moment(dateString).format(format));