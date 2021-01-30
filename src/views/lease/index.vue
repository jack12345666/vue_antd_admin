<template>
  <div class="box"> 
    <div class="add">
      <a-button type="primary" icon="plus" @click="addLease">新增厂房</a-button>
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
              <div class="label" style="margin-right: 15px">厂房名称</div>
              <div class="value">
                  <a-input v-model="title" placeholder="请输入厂房名称" />
              </div>
          </div>
          <div class="btns">
              <a-button type="primary" @click="toSearch" style="margin-right: 10px">查询</a-button><a-button @click="reset">重置</a-button>
          </div>
      </div>
   
    <a-table :columns="columns" :data-source="leaseList"  :pagination="pagination"  rowKey="id" :loading="tableLoading" 
    :scroll="{  y: tableHeight }"  @change="handleTableChange">
    <span slot="price" slot-scope="text">
        <span v-if="text === -1"><span style="color: red;">价格面议</span></span>
        <span v-else><span style="color: red;font-size: 20px;">{{text}}</span>  元/㎡/天</span>
    </span>
    <span slot="contact" slot-scope="text, record">
        {{record.contactName}} <br>
        {{record.contactMobile}}
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
  </div>
</template>

<script>
const columns = [  
    { title: '厂房编号', dataIndex: 'no', width: '150px', align: 'center'},
    { title: '厂房名称', dataIndex: 'title' , align: 'center', width: '150px', ellipsis: 'true'},
    { title: '地址', dataIndex: 'address', align: 'center', width: '180px', ellipsis: 'true'},
    { title: '价格', dataIndex: 'price', align: 'center', width: '150px', scopedSlots: { customRender: 'price'} },
    { title: '联系人', key: "contact", align: 'center',  width: '150px', scopedSlots: { customRender: 'contact' } },
    { title: '状态', dataIndex: 'status', width: '120px', align: 'center', scopedSlots: { customRender: 'status' }},
    { title: '操作', key: 'action', align: 'center', width: '100px', scopedSlots: { customRender: 'action' } }
]

import { getTableHeight } from '../../utils/utils'
import { getLeaseList } from '../../api/lease'
export default {
    data() {
        return {
            columns,
            title: '',
            contactName: '',
            tableHeight: null,
            searchConf: {
                currentPage: 1,
                pageSize: 10
            },
            count: 0,
            leaseList: [],
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
        }
    },
    created() {
        this.tableHeight = getTableHeight(236)
        this.fetchLeaseList()
    },
    methods: {
        async fetchLeaseList() {
            let rsp = await getLeaseList(this.searchConf)
            if(rsp.code === 0) {
                this.leaseList = rsp.data.data.items
                this.pagination.total = rsp.data.data.total
            }
            this.tableLoading = false
        },
        handleTableChange(pagination) {
            this.pagination.current = pagination.current;
            this.pagination.pageSize = pagination.pageSize;
            this.searchConf.currentPage = pagination.current;
            this.searchConf.pageSize = pagination.pageSize;
            this.fetchLeaseList()
        },
        handleChange(value) {
            this.searchConf.status = value
        },
        toEdit(record) {
            this.$router.push({path: '/editLease', query: { id: record.id}})
        },
        toSearch() {
            this.searchConf.title = this.title
            this.searchConf.currentPage = 1
            this.fetchLeaseList()
        },
        reset() {
            this.title = ''
            this.searchConf.currentPage = 1
            this.fetchLeaseList()
        },
        seeDetail(record) {
             this.$router.push({path: '/leaseDetail', query: { id: record.id}})
        },
        addLease() {
            this.$router.push('/addLease')
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