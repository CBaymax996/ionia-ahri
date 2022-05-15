<template>
  <div class="service flex flex-col justify-between items-center h-full">
    <!--main-->
    <div class="flex-1 w-95% mt-5">
      <el-button type="primary" @click="openForm()">添加模板</el-button>

      <el-table v-loading="loading" :data="tableData" class="mt-3" row-key="id">
        <el-table-column label="关联意图"

                         sortable
                         width="200">
          <template #default="scope">
            {{ getIntentionNameColumn(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column label="句子"
                         prop="sentence"
                         width="250"/>

        <el-table-column label="分词"
                         prop="participle"
                         width="150"/>

        <el-table-column label="创建时间"
                         prop="createTime"
                         width="180"/>
        <el-table-column label="修改时间"
                         prop="updateTime"
                         width="180"/>
        <el-table-column label="操作"
                         sortable
                         width="180">
          <template #default="scope">
            <el-button @click="openForm(scope.row)">编辑</el-button>
            <el-button @click="deleteTableRow(scope.row.id)"> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="h-15 self-center">
      <el-pagination :current-page="page.index" :total="page.total" background layout="prev, pager, next"
                     @current-change="refreshPage()"/>
    </div>
  </div>
  <!--添加或者修改对话框-->
  <el-dialog v-model="dialogVisible" width="50%">
    <template #default>
      {{ formData }}
      <el-form :model="formData" labexl-width="120px">
        <el-form-item :label-width="100" label="ID">
          <el-input v-model="formData.id" :disabled="true"/>
        </el-form-item>
        <el-form-item :label-width="100" label="意图">
          <el-select v-model="formData.intentionId" @change="updateSelectedSlots">
            <el-option v-for="item in intentions"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label-width="100" label="句子">
          <el-input v-model="formData.sentence"/>
        </el-form-item>
        <el-form-item :label-width="100" label="分词">
          {{ formData['participle'] }}
          <el-divider/>
          <IntentionTemplateEditor
              :slots="selectedSlots"
              :template="formData"/>
        </el-form-item>

      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script setup>
// 载入状态
import {onMounted, ref} from "vue";
import template from "../../api/template";
import intention from "../../api/intention";
import {updateTableAndPage} from "../../utils/BaseUtil";
import IntentionTemplateEditor from "../../components/intent/IntentionTemplateEditor.vue";
import axios from "axios";


// 表格数据
const tableData = ref([]);

// 表单数据
const formData = ref({})
const intentions = ref([])
const selectedSlots = ref({})

let loading = ref(false);
// 页码，从1开始
let page = ref({
  index: 1,
  total: 10
})
// 对话框是否可见
let dialogVisible = ref(false);
// 创建还是更新
const isCreate = ref(false)


// 刷新页面
function refreshPage() {
  template.getPage(page.value.index - 1).then(res => {
    updateTableAndPage(res, tableData, page)
    loading.value = false
  })
}

// 打开表单
function openForm(row) {
  if (row === undefined) {
    isCreate.value = true
    formData.value = {sentence: "", slotMapping: {}}
  } else {
    isCreate.value = false
    formData.value = row
    updateSelectedSlots(row.intentionId)
  }
  dialogVisible.value = true;
}

function submitForm() {
  let data = {}
  if (!isCreate.value) {
    data["id"] = formData.value["id"]
  }
  data["sentence"] = formData.value["sentence"]
  data["participle"] = formData.value["participle"]
  data["intentionId"] = formData.value["intentionId"]
  data["slotMapping"] = formData.value["slotMapping"]

  let rq;
  if (isCreate.value) {
    rq = template.create(data);
  } else {
    rq = template.update(data)
  }
  rq.then(() => {
    refreshPage()
    dialogVisible.value = false;
  })
}

function deleteTableRow(templateId) {
  console.log(templateId)
  template.deleteApi(templateId).then(() => {
        refreshPage()
      }
  )
}

/**
 * 更新候选的Slots
 * @param intentionId
 */
function updateSelectedSlots(intentionId) {
  for (let i in intentions.value) {
    let intention = intentions.value[i]
    if (intention.id === intentionId) {
      selectedSlots.value = intention.slots
      formData.value['slotMapping'] = {}
      return;
    }
  }
}

function getIntentionNameColumn(row) {
  for (let i in intentions.value) {
    let intention = intentions.value[i]
    if (intention.id === row.intentionId) {
      return intention.name
    }
  }
  return "-"
}


onMounted(() => {
  refreshPage()
  intention.getAll().then(res => {
    intentions.value = intentions.value = res.data.data
  })
})

</script>

<style scoped>

</style>
<!--@formatter:off-->
<route lang="yaml">
alias:
 - /dashboard/template
meta:
 layout: Dashboard
</route>