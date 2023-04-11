import { defineStore } from "pinia";
export const useSongList = defineStore("counter", {
  state: () => ({ songList: [], songdetails: {} }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment(data) {
      // console.log('this.songList',this.songList,data);
      this.songList = data;
    },
    setSongdetails(data) {
      this.songdetails = data;
    },
  },
});
