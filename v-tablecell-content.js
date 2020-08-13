// general purpose prepended tablecell
Vue.component("v-tablecell-content", {
  name: "v-tablecell-content",
  template:
    '<div> \
      <div style="height: 16px; width: 16px;"> \
        <v-img :src="`${url}${getImageSrc}`" :width="width" :height="height" :title="value[displayKey]"></v-img> \
      </div> \
      {{value[displayKey]}} \
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
    valueKey: {
      type: String,
      default: "identifier",
    },
    displayKey: {
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
      if (this.imageList.hasOwnProperty(this.value[this.valueKey])) {
        return this.imageList[this.value[this.valueKey]];
      } else if (this.imageList.hasOwnProperty("default")) {
        return this.imageList.default;
      } else {
        return "";
      }
    },
  },
});
