/* ////////////////////////////////////////////////// */
/* Description: General purpose prepended tablecell   */
/* Author: Peter Sonne                                */
/* Date: Aug 2020                                     */
/* ////////////////////////////////////////////////// */
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

/* ////////////////////////////////////////////////// */
/* Description: Resizable Header-Row                  */
/* Author: Peter Sonne                                */
/* Date: Sept 2020                                    */
/* ////////////////////////////////////////////////// */
Vue.component("v-thead", {
  name: "vthead",
  props: {
    cols: {
      type: Array,
      default: () => ["45px", "10px", "10px", "10px", "10px", "10px", "10px"],
    },
    columnMinwidth: {
      type: Number,
      default: 25,
    },
    sort: {
      type: Object,
      default: () => ({ field: null, asc: true }),
    },
    headlines: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    isResizing: false,
    resizeData: {
      col: null,
      startPositionX: null,
    },
    delta: 0,
  }),
  computed: {
    colsAsInt: function () {
      return this.cols.map((e) => parseInt(e.replace("px", "")));
    },
  },
  template:
    '<div class="t-head pa-0" :style="cols.length>0 ? {gridTemplateColumns: cols.join(\' \')} : {}"> \
    <div v-for="(h,idx) in headlines" :key="h.key" @click.self="$emit(\'sort\', h.key)"> \
      <div v-if="idx < headlines.length -1" class="t-head-after" :style="{left: `${getAggregatedColWidths(idx)-5}px`}" @mousedown="e => startResizing(idx,e)" @mouseup="isResizing=false"></div> \
      <v-icon small v-if="sort.field==h.key">mdi-menu-{{!sort.asc ? "down" : "up"}}</v-icon>{{h.text}} \
    </div> \
  </div> ',
  methods: {
    getAggregatedColWidths(numOfCol) {
      return this.cols
        .map((e) => parseInt(e.replace("px", "")))
        .reduce((acc, curr, idx) => (idx <= numOfCol ? acc + curr : acc));
    },
    startResizing(idx, e) {
      this.isResizing = true;
      this.resizeData = {
        col: idx,
        startPositionX: e.clientX,
      };
      document.addEventListener("mouseup", this.stopResizing);
      document.addEventListener("mousemove", this.mouseMove);
    },
    stopResizing(e) {
      this.isResizing = false;
      document.removeEventListener("mouseup", this.stopResizing);
      document.removeEventListener("mousemove", this.mouseMove);
    },
    mouseMove(e) {
      const _delta = e.clientX - this.resizeData.startPositionX;
      let _cols = this.cols.map((e) => parseInt(e.replace("px", "")));
      this.delta = _delta;
      // resize cols
      if (
        (_delta < 0 &&
          this.colsAsInt[this.resizeData.col] + _delta > this.columnMinwidth) ||
        (_delta > 0 &&
          this.colsAsInt[this.resizeData.col + 1] - _delta >
            this.columnMinwidth)
      ) {
        _cols[this.resizeData.col] =
          parseInt(this.cols[this.resizeData.col]) + parseInt(_delta);
        _cols[this.resizeData.col + 1] =
          parseInt(this.colsAsInt[this.resizeData.col + 1]) - parseInt(_delta);
        this.resizeData.startPositionX = e.clientX;
        this.$emit(
          "colsresized",
          _cols.map((e) => `${e}px`)
        );
      }
    },
  },
});
