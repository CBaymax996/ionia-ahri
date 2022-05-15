<template>
  <div class="intention-template-editor w-full">
    <el-radio-group v-model="operate" class="my-2">
      <el-radio-button label="分词"></el-radio-button>
      <el-radio-button label="标记"></el-radio-button>
    </el-radio-group>
    <div v-if="operate==='分词'">
      <div class="flex justify-between">
        <p class="c-gray-400 text-base"> 请在下面的区域内进行手动框选 </p>
        <div>
          <el-button @click="shuffleWords">打散</el-button>
          <el-button @click="remoteCutWords(template.sentence)">智能分词</el-button>
        </div>
      </div>
      <div class="words" @mousedown="dragBefore($event)" @mousemove="dragging($event)" @mouseup="dragAfter($event)">
        <ul>
          <li v-for="(word,index) in getWords(template['sentence'],template['participle'])" :key="index" ref="word"
              :style="getColor(word)">
            {{ word }}
          </li>
        </ul>
        <!--框选遮罩层-->
        <div v-show="beginSelect" id="chose-mask" ref="mask" :style="maskStyle"></div>
      </div>
    </div>
    <div v-else>
      <p class="c-gray-400 text-base mb-2">请选中插槽后点击对应单词位置以实现标记</p>
      <el-tag v-for="s in slots" :key="s.id" class="slots"
              @click="selectedSlotId = selectedSlotId===s.id?null:s.id">
        <el-badge :class="{active: s.id===selectedSlotId}" class="transition	">{{ s.name }}</el-badge>
      </el-tag>
      <div class="words">
        <ul>
          <li v-for="(word,index) in getWords(template['sentence'],template['participle'])" :key="index" ref="word"
              :style="getColor(word)"
              @click="addMapping(index)">
            <el-badge :value="isMarked(index)"> {{ word }}
            </el-badge>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {colorForStr} from "~/utils/ColorUtil";
import {isOverlap} from "~/utils/DomUtil";
import {mergeList} from "~/utils/CollectionUtil";
import template from "../../api/template";
import axios from "axios";
import python from "../../api/python";

export default {
  name: "IntentionTemplateEditor",
  props: [
    "slots",
    "template"],
  data() {
    return {
      active: 1,
      dialogVisible: true,
      operate: "分词",

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
      selectedSlotId: null
    }
  },
  methods: {
    getWords: function (text, participle = null) {

      if (participle == null || participle.join('') !== text) {
        this.template.participle = text.split('')
        return text.split('')
      }
      return participle
    },

    /**
     * 获取被框选中的word,并合并对应的word
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
      this.template.participle = mergeList(this.template.participle, selectIndex);
    },
    /**
     * 添加词槽和位置映射
     **/
    addMapping: function (index) {
      if (this.selectedSlotId == null) {
        return;
      }
      if (this.template.slotMapping === null) {
        this.template.slotMapping = {}
      }

      this.template.slotMapping[this.selectedSlotId] =
          this.template.slotMapping[this.selectedSlotId] === index ? undefined : index.toString();

    },
    /**
     * 判断Word是否被选中，并返回对应的词槽名
     * @return {string}
     */
    isMarked: function (wordIndex) {
      if (this.template['slotMapping'] === null) {
        return undefined
      }
      for (let key in this.template.slotMapping) {
        if (this.template['slotMapping'][key] === wordIndex.toString()) {
          return this.slots[key].name
        }
      }
      return undefined;
    },
    /**
     * 打散单词列表
     */
    shuffleWords: function () {
      this.template.participle = this.template.sentence.split('')
    },
    remoteCutWords: function (text) {
      python.cut(text).then(res => {
        console.log(res);
        let data = res.data
        if (data.success === true) {
          this.template.participle = JSON.parse(data.data)
        }
      })
    }
    ,
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

    }
    ,
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


    }
    ,
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

    }
    ,
    getColor: function (str) {
      return {"color": colorForStr(str)}
    }
    ,

  }

}
</script>

<style scoped>

.words {
  border: dashed #a9a9a9 1px;
  margin: 15px;
  min-height: 100px;
  padding: 15px;
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