<template>
  <div class="intention-template-editor">
    <el-input type="text" placeholder="新的模板" v-model="template.text">
      <el-button slot="append" type="primary" icon="el-icon-edit" @click="dialogVisible= true"/>
    </el-input>
    <!--弹出编辑窗-->
    <el-dialog :visible.sync="dialogVisible" title="编辑模板">

      <el-input id="template" type="text" placeholder="新的模板" v-model="template.text">
        <template slot="prepend">模板</template>
      </el-input>
      <el-switch v-model="divWords" active-text="分词" inactive-color="#C0CCDA" active-color="#C0CCDA"
                 inactive-text="标记"/>
      <br/>

      <div v-if="divWords">
        分词
        <el-button>智能分词</el-button>
        <div class="words" @mousedown="dragBefore($event)" @mouseup="dragAfter($event)" @mousemove="dragging($event)">
          <ul>
            <li v-for="(word,index) in getWords(template)" :key="index" ref="word" :style="getColor(word)">
              {{ word }}
            </li>
          </ul>
          <!--框选遮罩层-->
          <div id="chose-mask" v-show="beginSelect" :style="maskStyle" ref="mask"></div>
        </div>
      </div>
      <div v-else>
        标记
        <el-tag v-for="s in slots" :key="s.id" class="slots"
                @click="selectSlotIndex = selectSlotIndex===s.id?null:s.id">
          <el-badge :class="{active: s.id===selectSlotIndex}">{{ s.name }}</el-badge>
        </el-tag>
        <div class="words">
          <ul>
            <li v-for="(word,index) in getWords(template)" :key="index" ref="word" :style="getColor(word)"
                @click="addSlot(index)">
              <el-badge :value="isMarked(index)"> {{ word }}
              </el-badge>
            </li>
          </ul>
        </div>

      </div>

      <!-- 对话框的尾部-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="dialogVisible = false" type="primary">保存</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import {colorForStr} from "~/utils/ColorUtil";
import {isOverlap} from "~/utils/DomUtil";
import {mergeList} from "~/utils/CollectionUtil";

export default {
  name: "IntentionTemplateEditor",
  props: ["template", "slots"],
  data() {
    return {
      dialogVisible: false,
      divWords: false,

      // 分词模块
      /**
       * 开始选择状态开关
       * 当开始滑动选择时，mask层显示
       */
      beginSelect: false,
      /**
       * 记录mask层的位置、大小样式
       */
      maskStyle: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      },
      maskPosition: {
        oldLeft: 0,
        oldTop: 0
      },
      // 标记模块
      selectSlotIndex: null

    }
  },
  methods: {
    getWords: function (template) {
      if (template == null || template.text == null) {
        return null
      }
      if (template.words == null || template.words.join("") !== template.text) {
        // 单独分词
        template.words = template.text.split('');
      }

      return template.words
    },
    getColor: function (str) {
      return {"color": colorForStr(str)}
    },

    //  框选逻辑
    /**
     * 拖拽前
     */
    dragBefore: function (event) {
      this.beginSelect = true;
      event.preventDefault();
      event.stopPropagation();
      // 定位起始位置
      this.maskPosition.oldLeft = event.pageX;
      this.maskPosition.oldTop = event.pageY;
      this.maskStyle.left = event.pageX + 'px'
      this.maskStyle.top = event.pageY + 'px'

    },
    /**
     * 拖拽中
     */
    dragging: function (event) {
      // 没有开始选择时，事件无效
      if (this.beginSelect === false) {
        return;
      }
      event.preventDefault(); // 阻止默认行为
      event.stopPropagation(); // 阻止事件冒泡
      // 更新位置信息
      // 可能会有反方向拖拽，因此需要if-else两种情况
      if (event.pageX < this.maskPosition.oldLeft) {
        this.maskStyle.left = event.pageX + 'px';
        this.maskStyle.width = (this.maskPosition.oldLeft - event.pageX) + 'px';
      } else {
        this.maskStyle.width = (event.pageX - this.maskPosition.oldLeft) + 'px';
      }
      if (event.pageY < this.maskPosition.oldTop
      ) {
        this.maskStyle.top = event.pageY + 'px';
        this.maskStyle.height = (this.maskPosition.oldTop - event.pageY) + 'px';
      } else {
        this.maskStyle.height = (event.pageY - this.maskPosition.oldTop) + 'px';
      }


    },
    /**
     * 拖拽后
     */
    dragAfter: function (event) {
      this.beginSelect = false;
      event.preventDefault(); // 阻止默认行为
      event.stopPropagation(); // 阻止事件冒泡
      // 计算，哪些元素被框选，并更新words
      this.getSelectItem()
      // 清空位置信息
      this.maskStyle.width = 0;
      this.maskStyle.height = 0;
      this.maskStyle.top = 0;
      this.maskStyle.left = 0;

    },

    /**
     * 获取被选中的word
     */
    getSelectItem: function () {
      let maskDom = this.$refs.mask;
      // 判断dom节点是否被mask遮罩
      let wordsLiDom = this.$refs.word;
      let isAdd = false;
      let selectIndex = []
      for (let i = 0; i < wordsLiDom.length; i++) {
        if (isOverlap(maskDom, wordsLiDom[i])) {
          selectIndex.push(i)
          isAdd = true
        } else {
          if (isAdd === true) {
            break;
          }
        }
      }
      this.template.words = mergeList(this.template.words, selectIndex);
    },
    //
    addSlot: function (index) {
      if (this.selectSlotIndex == null) {
        return;
      }
      this.template.slots.forEach((slot, i, arr) => {
        if (slot.id === this.selectSlotIndex) {
          arr[i].wordIndex = slot.wordIndex === index ? null : index;
        }
      })
    },
    /**
     * 判断Word是否被选中
     * @return {boolean|null}
     */
    isMarked: function (wordIndex) {
      let res = null;
      this.template.slots.forEach(slot => {
        if (slot.wordIndex === wordIndex) {
          res = slot.name;
        }
      })
      return res;
    }


  },
  computed: {}

}
</script>

<style scoped>

.words {
  border: dashed #a9a9a9 1px;
  margin: 5px 5px;
  padding: 5px 5px;
}


.words ul {
  list-style: none;
  position: relative;
}

.words #chose-mask {
  background-color: gray;
  position: fixed;
  opacity: 0.3;
  border: 1px dashed #d9d9d9;
}

.words ul li {
  display: inline-block;
  margin: 10px 10px;
  font-weight: bolder;

}

.slots {
  margin: 0 10px;
  background-color: #f4f4f5;
  border-color: #e9e9eb;
  color: #909399;
}

.slots .active {
  color: #409EFF;
  font-weight: bolder;
}

.intention-template-editor .el-switch :after {
  background-color: #409EFF;
}

</style>