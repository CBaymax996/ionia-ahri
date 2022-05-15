<template>
  <div class="service flex flex-col justify-between items-center h-full">
    <!--main-->
    <div class="flex-1 w-95% mt-5">
      <el-button type="primary" @click="openForm()">添加远程接口</el-button>
      <el-table v-loading="loading" :data="tableData" class="mt-3" row-key="id">
        <el-table-column label="接口名称"
                         prop="name"
                         sortable
                         width="150"/>
        <el-table-column label="方法"
                         width="80">
          <template #default="scope">
            <el-tag
                :type="getTagType(scope.row.method)"
                disable-transitions
                class="uppercase"
            >{{ scope.row.method }}
            </el-tag
            >
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         label="URL"
                         prop="url"
                         width="300"
        />
        <el-table-column label="参数"
                         width="100">
          <template #default="scope">
            {{ mapToList(scope.row.params, "name").toString() }}
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
            <el-button @click="deleteRemoteApi(scope.row.id)"> 删除</el-button>
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
  <!--添加或者修改对话框-->
  <el-dialog v-model="dialogVisible" width="50%">
    <template #default>
      <el-form :model="formData" labexl-width="120px">
        <el-form-item :label-width="100" label="接口名称">
          <el-input v-model="formData.name"/>
        </el-form-item>
        <el-form-item :label-width="100" label="URL">
          <el-input v-model="formData.url"/>
        </el-form-item>
        <el-form-item :label-width="100" label="方法">
          <el-select v-model="formData.method" placeholder="请选择">
            <el-option label="GET" value="get"/>
            <el-option label="POST" value="post"/>
            <el-option label="UPDATE" value="update"/>
            <el-option label="DELETE" value="delete"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="100" label="参数列表">
          <div class=" w-400px flex flex-col ">
            <el-button class="self-start my-2 " @click="addFormSubParam(formData,'params')">添加参数</el-button>

            <div v-for="(param,index) in formData.params" :key="index" class="flex  justify-center">
              <div class="w-100 mr-2 ">
                <el-input v-model="param.name">
                  <template #prepend>name</template>
                </el-input>
              </div>
              <div class="mx-2 my-1">
                <el-checkbox v-model="param.header" label="header"/>
              </div>
              <div class="mx-2 self-center">
                <el-icon :size="16" @click="deleteFormSubParam(formData,'params',index)">
                  <close/>
                </el-icon>
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
import {onMounted, ref} from 'vue';
import remoteApi from "../../api/remoteAPI";
import {Close} from '@element-plus/icons-vue'
import {mapToList, updateTableAndPage, getTagType, addFormSubParam, deleteFormSubParam} from "../../utils/BaseUtil";

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
    isCreate.value = true
    formData.value = {params: []}
  } else {
    isCreate.value = false
    formData.value = row
    formData.value.params = Object.values(row.params)
  }
  dialogVisible.value = true;
}

// 删除
function deleteRemoteApi(apiId) {
  remoteApi.deleteApi(apiId).then(() => {
        refreshPage()
      }
  )
}

// 提交表单
function submitForm() {
  let data = {}
  if (!isCreate.value) {
    data["id"] = formData.value["id"]
  }
  data["name"] = formData.value["name"]
  data["method"] = formData.value["method"]
  data["url"] = formData.value["url"]
  data["params"] = formData.value["params"]
  let rq;
  if (isCreate.value) {
    rq = remoteApi.create(data);
  } else {
    rq = remoteApi.update(data)
  }
  rq.then(() => {
    refreshPage()
    dialogVisible.value = false;
  })
}

function refreshPage() {
  remoteApi.getPage(page.value.index - 1).then(res => {
    updateTableAndPage(res, tableData, page)
    loading.value = false
  })
}

onMounted(() => {
  refreshPage()
})

</script>


<!--@formatter:off-->
<route lang="yaml">
meta:
 layout: Dashboard
</route>