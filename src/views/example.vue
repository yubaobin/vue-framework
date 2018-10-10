<!--
    例子
-->

<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content-wrapper">
            <div class="h-title">标准化种植任务分布管理</div>
            <div class="search-tool">
                <el-form :inline="true" size="mini" label-position="left" label-width="70px">
                    <el-form-item label="编号">
                        <el-input v-model="query.p1" placeholder="编号" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="定植年份">
                        <el-input v-model="query.p2" placeholder="请输入" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="地块类型">
                        <el-select v-model="query.p3" placeholder="请选择" style="width: 200px;">
                            <el-option key="1" label="选项1" :value="1"></el-option>
                            <el-option key="2" label="选项2" :value="2"></el-option>
                            <el-option key="3" label="选项3" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="种苗属性">
                        <el-input v-model="query.p4" placeholder="请输入" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="物候期">
                        <el-input v-model="query.p5" placeholder="请输入" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="工作类型">
                        <el-input v-model="query.p6" placeholder="请输入" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" type="success" @click="search">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="table-container">
                <div class="btn-container">
                    <el-button size="mini" type="success"><i class="el-icon-location"></i>发布种植标准</el-button>
                    <el-button size="mini" type="primary">编辑</el-button>
                    <el-button size="mini" type="danger">删除</el-button>
                    <el-button size="mini" disabled>启用</el-button>
                    <el-button size="mini" disabled>禁用</el-button>
                </div>
                <el-table :data="tableData">
                    <el-table-column prop="id" label="日期" width="180" align="center" >
                        <template slot-scope="scope">
                            <a class="f-green is-link" @click="gotoDetail(scope.row.id)">{{scope.row.id}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
                    <el-table-column prop="email" label="地址" align="center"></el-table-column>
                </el-table>
                <el-pagination
                        @current-change="handleCurrentChange"
                        :page-size="page.pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="page.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  data () {
    return {
      value: 1,
      tableData: [],
      query: {
        p1: '', p2: '', p3: '', p4: '', p5: '', p6: '', curPage: 1
      },
      page: {
        pageSize: 10,
        total: 0
      }
    }
  },
  created () {
    this.loadTableData()
  },
  methods: {
    search () {
      this.loadTableData(this.query)
    },
    handleCurrentChange (curpage) {
      this.query.curPage = curpage
      this.loadTableData(this.query)
    },
    gotoDetail (date) {
      console.log(date)
    },
    loadTableData (params) {
      this.api.test(params).then((res) => {
        console.log(res)
        this.page.total = res.total
        this.tableData = res.array
      })
    }
  }
}
</script>
<style scoped lang="less">
</style>
