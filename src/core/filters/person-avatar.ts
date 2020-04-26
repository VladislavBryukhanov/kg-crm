import Vue from 'vue';
import * as workerImg from '@/assets/worker.png';

Vue.filter('personAvatarUrl', (avatarUrl?: string) => {
  if (!avatarUrl) {
    return workerImg;
  }
  
  return avatarUrl;
});

