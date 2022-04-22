<template>
  <div class="service flex flex-col justify-between items-center h-full">
    <!--main-->
    <div class="flex-1 w-95% mt-5">
      <el-button type="primary">添加远程接口</el-button>
      <el-button>测试接口状态</el-button>
      <el-table ref="tableRef" :data="tableData" class="mt-3" row-key="date">

        <el-table-column label="接口名称" prop="name" sortable width="180"/>
        <el-table-column label="URL" prop="url"/>
        <el-table-column label="参数" prop="params" width="100"/>
        <el-table-column
            column-key="date"
            label="添加时间"
            prop="date"
            sortable
            width="180"
        />
        <el-table-column
            column-key="date"
            label="修改时间"
            prop="edit_data"
            sortable
            width="180"
        />
        <el-table-column
            label="状态"
            prop="tag"
            width="100"
        >
          <template #default="scope">
            <el-tag
                :type="calTag(scope.row.tag)"
                disable-transitions
            >{{ scope.row.tag }}
            </el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="" width="100">
          <el-icon>
            <Edit/>
          </el-icon>
          <el-icon>
            <Delete/>
          </el-icon>
        </el-table-column>
      </el-table>
    </div>
    <!--翻页-->
    <div class="h-15 self-center">
      <el-pagination :total="10" background layout="prev, pager, next"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import type {ElTable} from 'element-plus'
import {Delete, Edit} from "@element-plus/icons-vue";

function calTag(state: string) {
  if (state == '未测试') {
    return 'warning'
  }
  if (state == '正常') {
    return 'success'
  }
  if (state == '异常') {
    return 'danger'
  }
  return 'info'
}

const tableRef = ref<InstanceType<typeof ElTable>>()

const tableData = [
  {
    name: '查询天气',
    url: 'https://ionia-irelia-1603271-1309523252.ap-shanghai.run.tcloudbase.com/weather',
    date: '2022-04-10 14:10:50',
    edit_data: '2022-04-10 14:20:64',
    params: ["time"],
    tag: '未测试',
  },
  {
    name: '路线推荐',
    url: 'https://ionia-akari-1603271-1309523252.ap-shanghai.run.tcloudbase.com/route',
    date: '2022-04-10 14:11:22',
    edit_data: '2022-04-10 14:24:84',
    params: ["start", "end"],
    tag: '异常',
  },
  {
    name: '股票涨跌',
    url: 'https://192.168.100.128:3309/stock',
    date: '2022-04-10 14:13:12',
    edit_data: '2022-04-10 14:25:37',
    params: ["name"],
    tag: '正常',
  }

]
</script>


<!--@formatter:off-->
<route lang="yaml">
meta:
 layout: Dashboard
</route>