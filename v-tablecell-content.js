// general purpose prepren icon
Vue.component("v-tablecell-content", {
  name: "v-tablecell-content",
  template:
    '<div> \
      <div style="height: 16px; width: 16px;"> \
        <v-img :src="`${url}${getImageSrc}`" :width="width" :height="height" :title="value[key]"></v-img> \
      </div> \
      {{value}} \
    </div>',
  props: {
    height: {
      type: Number,
      default: 16,
    },
    imageList: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: Object,
      default: () => ({}),
    },
    key: {
      type: String,
      default: "title",
    },
    width: {
      type: Number,
      default: 16,
    },
    url: {
      type: String,
      default: "",
    },
  },
  computed: {
    getImageSrc: function () {
      if (this.imageList.hasOwnProperty(this.value[this.key])) {
        return this.imageList[this.value[this.key]];
      } else if (this.imageList.hasOwnProperty("default")) {
        return this.imageList.default;
      } else {
        return "";
      }
    },
  },
});
