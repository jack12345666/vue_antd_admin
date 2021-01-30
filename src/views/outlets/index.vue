<template>
  <div class="box"> 
    <div class="add">
      <a-button type="primary" icon="plus" @click="addOutlets">新增网点</a-button>
    </div>
      <div class="search">
         <div class="item">
              <div class="label"></div>
              <div class="value">
                  <a-select default-value="" style="width: 160px" @change="handleChange">
                    <a-select-option value="">全部</a-select-option>
                    <a-select-option value="1">正常</a-select-option>
                    <a-select-option value="10">草稿</a-select-option>
                    <a-select-option value="0">失效</a-select-option>
                  </a-select>
              </div>
          </div>
           <div class="item">
              <div class="label" style="margin-right: 15px">网点名称</div>
              <div class="value">
                  <a-input v-model="name" placeholder="请输入网点名称" />
              </div>
          </div>
          <div class="item">
              <div class="label" style="margin-right: 15px">所属分类</div>
              <div class="value">
                  <a-select style="width: 160px" @change="handleCategoryChange">
                    <a-select-option v-for="(item, index) in categoryList" :value="item.id" :key="index">{{item.name}}</a-select-option>
                  </a-select>
              </div>
          </div>
          <div class="btns">
              <a-button type="primary" @click="toSearch" style="margin-right: 10px">查询</a-button><a-button @click="reset">重置</a-button>
          </div>
      </div>
   
    <a-table :columns="columns" :data-source="outletsList"  :pagination="pagination"  rowKey="id" :loading="tableLoading" 
    :scroll="{  y: tableHeight }"  @change="handleTableChange">
   
    <span slot="index" slot-scope="text, record, index">
        {{index+1}}
    </span>
     <span slot="status" slot-scope="text">
        <a-tag color="#2db7f5" v-if="text == '1'">正常</a-tag>
        <a-tag color="#f50" v-if="text == '0'">失效</a-tag>
        <a-tag color="#999" v-if="text == '10'">草稿</a-tag>
    </span>
    <span slot="action" slot-scope="text, record">
      <a @click="toEdit(record)" style="margin-right: 10px">编辑</a>
    </span>
  </a-table>
   <div>
  </div>

   <OutletsItem v-if="showBox" @closeBox="closeBox" :outletsInfo="outletsInfo" :status="boxType"/>
  </div>
</template>

<script>
const columns = [  
    { title: '序号', dataIndex: 'x', width: '80px', align: 'center', scopedSlots: { customRender: 'index' }},
    { title: '名称', dataIndex: 'name' , align: 'center', width: '150px', ellipsis: 'true' },
    { title: '地址', dataIndex: 'address', align: 'center', width: '200px', ellipsis: 'true' },
    { title: '创建时间', dataIndex: 'createTime', align: 'center', width: '160px' },
    { title: '状态', dataIndex: 'status', width: '120px', align: 'center', scopedSlots: { customRender: 'status' }},
    { title: '操作', key: 'action', align: 'center', width: '100px', scopedSlots: { customRender: 'action' }}
]

import { getTableHeight } from '../../utils/utils'
import { getOutletsEmployee, outletsCategory } from '../../api/outlets'
import OutletsItem from './item'
export default {
    components: { OutletsItem },
    data() {
        return {
            columns,
            contactName: '',
            tableHeight: null,
            searchConf: {
                currentPage: 1,
                pageSize: 10
            },
            name: '',
            count: 0,
            outletsList: [],
            categoryList: [],
            tableLoading: true,
            pagination: {
                current: 1,
                total: 0,
                pageSize: 10,//每页中显示10条数据
                showQuickJumper: true,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30"],//每页中显示的数据
                showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
            },
            showBox: false,
            outletsInfo: {
                id: null,
                name: '',
                address: '',
                tel: '',
                lng: null,
                lat: null,
                runStatus: 1,
                status: 10,
                category: undefined,
                displayNo: 0
            },
            boxType: 1
        }
    },
    created() {
        this.tableHeight = getTableHeight(236)
        this.fetchOutletsList()
        this.fetchOutletsCategory()
    },
    methods: {
        async fetchOutletsList() {
            let rsp = await getOutletsEmployee(this.searchConf)
            if(rsp.code === 0) {
                this.outletsList = rsp.data.data.items
                this.pagination.total = rsp.data.data.total
            }
            this.tableLoading = false
        },
        async fetchOutletsCategory() {
            let rsp = await outletsCategory('OutletsType')
            if(rsp.code === 0) {
                this.categoryList = rsp.data.data.items
                this.categoryList.unshift({id: '', name: '全部'})
            }
        },
        handleTableChange(pagination) {
            this.pagination.current = pagination.current;
            this.pagination.pageSize = pagination.pageSize;
            this.searchConf.currentPage = pagination.current;
            this.searchConf.pageSize = pagination.pageSize;
            this.fetchOutletsList()
        },
        handleCategoryChange(value) {
            this.searchConf.category = value
        },
        handleChange(value) {
            this.searchConf.status = value
        },
        toEdit(record) {
           this.boxType = 2
           this.outletsInfo = record
           this.showBox = true
        },
        toSearch() {
            this.searchConf.name = this.name
            this.searchConf.currentPage = 1
            this.fetchOutletsList()
        },
        reset() {
            this.name = ''
            this.searchConf.status = null
            this.searchConf.category = null
            this.searchConf.currentPage = 1
            this.fetchOutletsList()
        },
        closeBox() {
            this.showBox = false
            this.outletsInfo = {
                id: null,
                name: '',
                address: '',
                tel: '',
                lng: null,
                lat: null,
                runStatus: 1,
                status: 10,
                category: undefined,
                displayNo: 0
            }
            this.fetchOutletsList()
        },
        addOutlets() {
           this.boxType = 1
           this.showBox = true
        }
    }
}
</script>

<style lang="less" scoped>
.box {
    padding: 10px 20px;
    .search {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .item {
            display: flex;
            align-items: center;
            margin-right: 30px;
            .label {
                color: #666;
            }
        }
    } 
    .add {
        margin: 10px 0;
    }
}
</style>