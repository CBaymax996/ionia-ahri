<template>
  <div class="service flex flex-col justify-between items-center h-full">
    <!--main-->
    <div class="flex-1 w-95% mt-5">
      <el-button type="primary" @click="openForm()">添加意图</el-button>

      <el-table v-loading="loading" :data="tableData" class="mt-3" row-key="id">
        <el-table-column label="意图"
                         prop="name"
                         sortable
                         width="180"/>
        <el-table-column label="插槽"
                         width="200">
          <template #default="scope">
            {{ (mapToList(scope.row.slots, "name")).toString() }}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         label="关联服务"
                         width="250">
          <template #default="scope">
            {{ getServiceNameAndUrl(scope.row['serviceId']) }}
          </template>
        </el-table-column>
        <el-table-column column-key="createTime"
                         label="添加时间"
                         prop="createTime"
                         sortable
                         width="180"
        />
        <el-table-column column-key="updateTime"
                         label="修改时间"
                         prop="updateTime"
                         sortable
                         width="180"
        />

        <el-table-column label="操作" prop="" width="200">
          <template #default="scope">
            <el-button @click="openForm(scope.row)">编辑</el-button>
            <el-button @click="deleteTableRow(scope.row.id)"> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--翻页-->
    <div class="h-15 self-center">
      <el-pagination :current-page="page.index" :total="page.total" background layout="prev, pager, next"
                     @current-change="refreshPage"/>
    </div>
  </div>
  <!--对话框-->
  <el-dialog v-model="dialogVisible" width="50%">
    <template #default>
      <el-form :model="formData" labexl-width="120px">
        <el-form-item :label-width="100" label="意图名称">
          <el-input v-model="formData.name"/>
        </el-form-item>
        <el-form-item :label-width="100" label="关联服务">
          <el-select v-model="formData['serviceId']">
            <el-option v-for="item in ApiSelects"
                       :key="item['id']"
                       :label="item['name']"
                       :value="item['id']"
            />
          </el-select>

        </el-form-item>
        <el-form-item :label-width="100" label="插槽">

          <div>
            <div class="mb-2">
              <el-button @click="addFormSubParam(this.formData,'slots')">新增</el-button>
            </div>
            <div>
              <div v-for="(slot,index) in formData.slots" :key="index" class="my-2 flex">
                <div>
                  <el-input v-model="slot.name">
                    <template #prepend>name</template>
                  </el-input>
                </div>
                <div class="mx-2">
                  param：
                  <el-select v-model="slot['paramId']">
                    <el-option v-for="item in formData['serviceId']==null?null:getService(formData['serviceId']).params"
                               :key="item['id']"
                               :label="item['name']"
                               :value="item['id']"
                    />
                  </el-select>
                </div>
                <div class="mx-2 self-center hover:c-red hover:shadow w-8">
                  <el-icon :size="16" @click="deleteFormSubParam(this.formData,'slots',index)">
                    <close/>
                  </el-icon>
                </div>
              </div>
            </div>
          </div>
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
import {onMounted, ref} from "vue";
import intention from "../../api/intention";
import remoteApi from "../../api/remoteAPI";
import {mapToList, updateTableAndPage, addFormSubParam, deleteFormSubParam} from "../../utils/BaseUtil"
import {
  Close
} from '@element-plus/icons-vue'


// 预缓存服务接口数据
const ApiSelects = ref({})
// 表格数据
const tableData = ref([]);
// 表单数据
const formData = ref({})
// 分页
let page = ref({
  index: 1,
  total: 10
})

// 载入状态
let loading = ref(true);
// 增改对话框是否可见
let dialogVisible = ref(false);
// 创建还是更新标记
const isCreate = ref(false)


// 打开表单
function openForm(row) {
  if (row === undefined) {
    // 添加
    isCreate.value = true
    formData.value = {name: "", slots: [], service: {}}
  } else {
    // 更新
    isCreate.value = false
    formData.value = row
    formData.value.slots = mapToList(row.slots)
  }
  dialogVisible.value = true;
}


function deleteTableRow(intentionId) {
  intention.deleteApi(intentionId).then(() => {
    refreshPage();
  })
}

function submitForm() {
  let data = {}
  if (!isCreate.value) {
    data["id"] = formData.value["id"]
  }
  data["name"] = formData.value["name"]
  data["slots"] = formData.value["slots"]
  data["serviceId"] = formData.value["serviceId"]
  let p = isCreate.value ? intention.create(data) : intention.update(data)
  p.then(() => {
    refreshPage()
    dialogVisible.value = false
  })
}


function getServiceNameAndUrl(serviceId) {
  let service = getService(serviceId);
  if (service == null) {
    return "-"
  }
  return service.name + "-" + service.url;
}

function getService(serviceId) {
  if (serviceId !== undefined && ApiSelects.value !== null) {
    for (let i in ApiSelects.value) {
      let service = ApiSelects.value[i]
      if (service.id === serviceId) {
        return service
      }
    }
  }
  return {}
}


// 改变页码
function refreshPage() {
  intention.getPage(page.value.index - 1).then(res => {
    updateTableAndPage(res, tableData, page)
    loading.value = false
  })
}


onMounted(() => {
  remoteApi.getAll().then(res => {
    ApiSelects.value = res.data.data
  })
  refreshPage()

})
</script>


<!--@formatter:off-->
<route lang="yaml">
alias:
 - /dashboard/intent
meta:
 layout: Dashboard
</route>