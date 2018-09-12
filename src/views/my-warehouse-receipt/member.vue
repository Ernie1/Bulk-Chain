<template>
  <div class="app-container">
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;"
      @row-click="seeDetail">
       
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="填发人">
              <span>{{ props.row.GoodsQuantity }}</span>
            </el-form-item>
            <el-form-item label="填发地">
              <span>{{ props.row.Variety }}</span>
            </el-form-item>
            <el-form-item label="填发日期">
              <span>{{ props.row.Variety }}</span>
            </el-form-item>
            <el-form-item label="保管人">
              <span>{{ props.row.Variety }}</span>
            </el-form-item>
            <el-form-item label="保管人Id">
              <span>{{ props.row.Variety }}</span>
            </el-form-item>
            <el-form-item label="储存期间">
              <span>{{ props.row.Variety }}</span>
            </el-form-item>
            <el-form-item label="仓储场所">
              <span>{{ props.row.Variety }}</span>
            </el-form-item>
            <el-form-item label="储存期间">
              <span>{{ props.row.Variety }}</span>
            </el-form-item>
            <el-form-item label="存货人">
              <span>{{ props.row.Variety }}</span>
            </el-form-item>
            <el-form-item label="存货人ID">
              <span>{{ props.row.Variety }}</span>
            </el-form-item>
            <el-form-item label="会员名称">
              <span>{{ props.row.Variety }}</span>
            </el-form-item>
            <el-form-item label="会员ID">
              <span>{{ props.row.Variety }}</span>
            </el-form-item>
            <el-form-item label="仓单持有人ID">
              <span>{{ props.row.Variety }}</span>
            </el-form-item>
            <el-form-item label="仓单历史">
              <span>{{ props.row.Variety }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
       
      <el-table-column :label="$t('myWarehouseReceipt.BatchNumber')" align="center" width="150px" prop="BatchNumber" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.BatchNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('myWarehouseReceipt.DateOfIssue')" width="140px" align="center" prop="DateOfIssue" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.DateOfIssue | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('myWarehouseReceipt.GoodsQuantity')" align="center" width="150px" prop="GoodsQuantity" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.GoodsQuantity }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('myWarehouseReceipt.Variety')" align="center" width="80px" prop="Variety" :filters="[{text: 'WH', value: 'WH'}, {text: 'CF', value: 'CF'}, {text: 'SR', value: 'SR'}, {text: 'OI', value: 'OI'}, {text: 'RI', value: 'RI'}, {text: 'PM', value: 'PM'}, {text: 'RS', value: 'RS'}, {text: 'JR', value: 'JR'}]" :filter-method="filterVariety">
        <template slot-scope="scope">
          <span>{{ scope.row.Variety }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('myWarehouseReceipt.Type')" align="center" width="120px" prop="Type" :filters="[{text: $t('myWarehouseReceipt.Standard'), value: true }, {text: $t('myWarehouseReceipt.Nonstandard'), value: false }]" :filter-method="filterType">
        <template slot-scope="scope">
          <el-tag :type="scope.row.Type | typeStatusFilter">{{ scope.row.Type?$t('myWarehouseReceipt.Standard'):$t('myWarehouseReceipt.Nonstandard') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('myWarehouseReceipt.Holder')" align="center" min-width="200px">
        <template slot-scope="scope">
          <span>{{ scope.row.Holder }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('myWarehouseReceipt.Status')" class-name="status-col" width="120px"  prop="Status" :filters="[{ text: $t('myWarehouseReceipt.Inbound'), value: 'Inbound' }, { text: $t('myWarehouseReceipt.Flowable'), value: 'Flowable' }, { text: $t('myWarehouseReceipt.Pledged'), value: 'Pledged' }, { text: $t('myWarehouseReceipt.Outbound'), value: 'Outbound' }, { text: $t('myWarehouseReceipt.Outbounding'), value: 'Outbounding' }, { text: $t('myWarehouseReceipt.Registering'), value: 'Registering' }, { text: $t('myWarehouseReceipt.Pledging'), value: 'Pledging' }, { text: $t('myWarehouseReceipt.Unpledging'), value: 'Unpledging' }, { text: $t('myWarehouseReceipt.Unregistering'), value: 'Unregistering' }, { text: $t('myWarehouseReceipt.Deliverying'), value: 'Deliverying' }]" :filter-method="filterStatus">
        <template slot-scope="scope"> 
          <el-tag>{{ $t('myWarehouseReceipt.' + scope.row.Status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('myWarehouseReceipt.Actions')" align="center" width="240px" class-name="small-padding fixed-width">
        <template slot-scope="scope">

          <template v-if="scope.row.Status=='Inbound'">
            <el-button type="success" size="mini" @click.stop="dialogVisibleApplication=true">{{ $t('myWarehouseReceipt.Register') }}</el-button>
            <el-button type="info" size="mini" @click.stop="handleUpdate(scope.row)">{{ $t('myWarehouseReceipt.ApplyforPick') }}</el-button>
          </template>

          <template v-if="scope.row.Status=='Flowable'">
            <el-button type="warning" size="mini" @click.stop="handleUpdate(scope.row)">{{ $t('myWarehouseReceipt.Pledge') }}</el-button>
            <el-button type="primary" size="mini" @click.stop="handleUpdate(scope.row)">{{ $t('myWarehouseReceipt.Flow') }}</el-button>
            <el-button type="danger" size="mini" @click.stop="handleUpdate(scope.row)">{{ $t('myWarehouseReceipt.Unregister') }}</el-button>
          </template>

          <template v-if="scope.row.Status.substr(scope.row.Status.length - 3)=='ing'">
            <el-button type="primary" size="mini" @click.stop="handleUpdate(scope.row)">{{ $t('myWarehouseReceipt.ViewProgress') }}</el-button>
          </template>

          <template v-if="scope.row.Status=='Pledged'">
            <el-button type="warning" size="mini" @click.stop="handleUpdate(scope.row)">{{ $t('myWarehouseReceipt.Unpledge') }}</el-button>
          </template>
          
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <!-- 弹出对话框 -->
    <el-dialog
      :before-close="handleClose"
      :visible.sync="dialogVisibleApplication">
      <!--  -->
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="注册申请" icon="el-icon-edit-outline"></el-step>
        <el-step title="提交审核" icon="el-icon-upload2"></el-step>
      </el-steps>

      <div style="width: 600px; margin: 50px auto">
        <div v-if="active==0" style="display: flex; height: 600px; flex-direction: column; justify-content: space-between; align-items: center;">
            <md-input v-model="ruleForm.name">会员联系人</md-input>
            <md-input v-model="ruleForm.phone">会员联系人电话</md-input>
            <md-input v-model="ruleForm.clientID">客户ID</md-input>
            <md-input v-model="ruleForm.clientName">客户名称</md-input>
            <md-input v-model="ruleForm.clientName">客户联系人</md-input>
            <md-input v-model="ruleForm.clientPhone">客户联系人电话</md-input>
            <md-input v-model="ruleForm.clientPhone">待注册仓单批次号</md-input>
        </div>

        <!-- 第2步骤 -->
        <el-form v-if="active==1" :model="ruleForm" ref="ruleForm" label-width="100px" label-position="right">
          <div style="display: flex; justify-content: center;">
            <!--  -->
            <div v-if="false">
              <h1><i class="el-icon-time"></i> 您的注册申请已提交审核，请耐心等候</h1>
            </div>
            <!--  -->
            <div v-if="true" style="display: flex; align-items: center;">
              <h1><i class="el-icon-circle-close-outline"></i> 您的注册申请未通过审核</h1>
              <h2>&nbsp;&nbsp;原因</h2>
            </div>
          </div>
        </el-form>

        <!-- 申请表详情 -->
        <el-form v-if="active!=0" :model="ruleForm" ref="ruleForm" label-width="200px" label-position="left">
          <div style="height: 50px"></div>
          <el-form-item label="会员联系人">
            <span>{{ ruleForm.name }}</span>
          </el-form-item>
          <el-form-item label="会员联系人电话">
            <span>{{ ruleForm.phone }}</span>
          </el-form-item>
          <el-form-item label="客户ID">
            <span>{{ ruleForm.clientID }}</span>
          </el-form-item>
          <el-form-item label="客户名称">
            <span>{{ ruleForm.clientName }}</span>
          </el-form-item>
          <el-form-item label="客户联系人">
            <span>{{ ruleForm.clientName }}</span>
          </el-form-item>
          <el-form-item label="客户联系人电话">
            <span>{{ ruleForm.clientPhone }}</span>
          </el-form-item>
          <el-form-item label="待注册仓单批次号">
            <span>{{ ruleForm.clientPhone }}</span>
          </el-form-item>
        </el-form>
      </div>

    <!-- 第1步骤 -->
    <span v-if="active==0" slot="footer">
      <el-button type="success" @click="dialogVisibleApplication = false">保存</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
    </span>

    </el-dialog>
    

  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import { parseTime } from "@/utils";
import MdInput from "@/components/MDinput";

export default {
  name: "ComplexTable",
  directives: {},
  components: {
    MdInput
  },
  filters: {
    typeStatusFilter(type) {
      return type ? "success" : "danger";
    }
  },
  data() {
    return {
      dialogVisibleApplication: false,
      active: 0,
      ruleForm: {
        name: "张三",
        phone: "19900289212",
        clientID: "client_000001",
        clientCompany: "A农产品加工有限公司",
        clientName: "莉莉丝",
        clientPhone: "19900289212",
        goodsVariety: "WH",
        goodsQuantity: "200手",
        goodsLevel: "A",
        goodsRegion: "河南",
        goodsTransport: "货车",
        goodsProduceDate: "",
        goodsValidityPeriod: "",
        goodsBand: "",
        goodsPack: "",
        goodsRank: "",
        warehouseID: "",
        inboundPlanTime: ""
      },
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 50
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    seeDetail(row, event, column) {
      this.$refs.multipleTable.toggleRowExpansion(row);
    },
    filterVariety(value, row) {
      return row.Variety == value;
    },
    filterType(value, row) {
      return row.Type == value;
    },
    filterStatus(value, row) {
      return row.Status == value;
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleClose(done) {
      if (this.active != 0) done();
      else
        this.$confirm("确认关闭？")
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  }
};
</script>
