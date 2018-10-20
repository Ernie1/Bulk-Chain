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
              <span>{{ props.row.Signer }}</span>
            </el-form-item>
            <el-form-item label="填发地">
              <span>{{ props.row.SignPlace }}</span>
            </el-form-item>
            <el-form-item label="保管人">
              <span>{{ props.row.GoodsHolder }}</span>
            </el-form-item>
            <el-form-item label="保管人Id">
              <span>{{ props.row.GoodsHolderId }}</span>
            </el-form-item>
            <el-form-item label="储存期间">
              <span>{{ props.row.StoragePeriod.StartDate + " 至 " + props.row.StoragePeriod.EndDate }}</span>
            </el-form-item>
            <el-form-item>
            </el-form-item>
            <el-form-item label="仓储地址">
              <span>{{ props.row.StoragePlace.Address }}</span>
            </el-form-item>
            <el-form-item label="库位编号">
              <span>{{ props.row.StoragePlace.Location }}</span>
            </el-form-item>
            <el-form-item label="存货人">
              <span>{{ props.row.GoodsSaver }}</span>
            </el-form-item>
            <el-form-item label="存货人ID">
              <span>{{ props.row.GoodsSaverId }}</span>
            </el-form-item>
            <el-form-item label="会员名称">
              <span>{{ props.row.MemberName }}</span>
            </el-form-item>
            <el-form-item label="会员ID">
              <span>{{ props.row.MemberId }}</span>
            </el-form-item>
            <el-form-item label="仓单持有人ID">
              <span>{{ props.row.WarehouseReceiptHolderId }}</span>
            </el-form-item>
            <!-- <el-form-item label="仓单历史">
              <span>{{ props.row.TransactionHistory }}</span>
            </el-form-item> -->

            <el-form-item>
            </el-form-item>
            <el-form-item label="仓单历史">
            </el-form-item>
            <el-table
            v-loading="props.row.transHisListLoading"
            :data="props.row.TransactionHistory"
            fit
            border
            style="width: 100%;">
            <el-table-column label="交易号" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.TransactionId }}</span>
              </template>
            </el-table-column>
            <el-table-column label="申请类型" align="center" >
              <template slot-scope="scope">
                <el-tag>{{ scope.row.TxType | reqType2CHFilter }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="申请日期" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.DateRequest }}</span>
              </template>
            </el-table-column>
            <el-table-column label="客户Id" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.ClientId }}</span>
              </template>
            </el-table-column>
            <el-table-column label="客户名称" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.ClientName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="审核日期" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.DateCheck }}</span>
              </template>
            </el-table-column>
            <el-table-column label="审核状态" class-name="status-col" >
              <template slot-scope="scope">
                <el-tag :type="scope.row.CheckState | appStatus2ColorFilter">{{ scope.row.CheckState | appStatus2CHFilter }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="说明" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.Description }}</span>
              </template>
            </el-table-column>
          </el-table>

          </el-form>
        </template>
      </el-table-column>
       
      <el-table-column :label="$t('myWarehouseReceipt.BatchNumber')" align="center" prop="WarehouseReceiptSeriesId" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.WarehouseReceiptSeriesId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('myWarehouseReceipt.DateOfIssue')" align="center" prop="SignDate" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.SignDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="仓单数量" align="center" prop="Quantity" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.Quantity }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('myWarehouseReceipt.GoodsQuantity')" align="center" prop="GoodsQuantity" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.GoodsQuantity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="货物质量" align="center" prop="Quality" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.Quality }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('myWarehouseReceipt.Variety')" align="center" prop="VarietyCode" :filters="[{text: 'WH', value: 'WH'}, {text: 'CF', value: 'CF'}, {text: 'SR', value: 'SR'}, {text: 'OI', value: 'OI'}, {text: 'RI', value: 'RI'}, {text: 'PM', value: 'PM'}, {text: 'RS', value: 'RS'}, {text: 'JR', value: 'JR'}]" :filter-method="filterVariety">
        <template slot-scope="scope">
          <span>{{ scope.row.VarietyCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('myWarehouseReceipt.Type')" align="center" prop="Type" :filters="[{text: '标准', value: 'Standard' }, {text: '非标准', value: 'NonStandard' }]" :filter-method="filterType">
        <template slot-scope="scope">
          <el-tag :type="scope.row.Type | typeStatusFilter">{{ scope.row.Type=='Standard'?'标准':'非标准' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('myWarehouseReceipt.Holder')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.WarehouseReceiptHolder }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('myWarehouseReceipt.Status')" class-name="status-col"  prop="State" :filters="[{ text: $t('myWarehouseReceipt.Inbound'), value: 'Inbound' }, { text: $t('myWarehouseReceipt.Flowable'), value: 'Flowable' }, { text: $t('myWarehouseReceipt.Pledged'), value: 'Pledged' }, { text: $t('myWarehouseReceipt.Outbound'), value: 'Outbound' }, { text: $t('myWarehouseReceipt.Outbounding'), value: 'Outbounding' }, { text: $t('myWarehouseReceipt.Registering'), value: 'Registering' }, { text: $t('myWarehouseReceipt.Pledging'), value: 'Pledging' }, { text: $t('myWarehouseReceipt.Unpledging'), value: 'Unpledging' }, { text: $t('myWarehouseReceipt.Unregistering'), value: 'Unregistering' }, { text: $t('myWarehouseReceipt.Deliverying'), value: 'Deliverying' }]" :filter-method="filterStatus">
        <template slot-scope="scope"> 
          <el-tag>{{ scope.row.State | rcptStatus2CHFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('myWarehouseReceipt.Actions')" align="center" min-width="200px" class-name="small-padding fixed-width">
        <template slot-scope="scope">

          <template v-if="scope.row.State=='Inbound'">
            <el-button type="success" size="mini" @click.stop="hanleRegister(scope.row)">{{ $t('myWarehouseReceipt.Register') }}</el-button>
            <el-button type="info" size="mini" @click.stop="handleUpdate(scope.row)">{{ $t('myWarehouseReceipt.ApplyforPick') }}</el-button>
          </template>

          <template v-if="scope.row.State=='Flowable'">
            <el-button type="warning" size="mini" @click.stop="handleUpdate(scope.row)">{{ $t('myWarehouseReceipt.Pledge') }}</el-button>
            <el-button type="primary" size="mini" @click.stop="handleUpdate(scope.row)">{{ $t('myWarehouseReceipt.Flow') }}</el-button>
            <el-button type="danger" size="mini" @click.stop="handleUpdate(scope.row)">{{ $t('myWarehouseReceipt.Unregister') }}</el-button>
          </template>

          <template v-if="scope.row.State.substr(scope.row.State.length - 3)=='ing'">
            <el-button type="primary" size="mini" @click.stop="handleUpdate(scope.row)">{{ $t('myWarehouseReceipt.ViewProgress') }}</el-button>
          </template>

          <template v-if="scope.row.State=='Pledged'">
            <el-button type="warning" size="mini" @click.stop="handleUpdate(scope.row)">{{ $t('myWarehouseReceipt.Unpledge') }}</el-button>
          </template>
          
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[5,10,20,30]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <!-- 弹出对话框 -->
    <el-dialog
      :before-close="handleClose"
      :visible.sync="dialogVisible">
      <!--  -->
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="注册申请" icon="el-icon-edit-outline"></el-step>
        <el-step title="提交审核" icon="el-icon-upload2"></el-step>
      </el-steps>

      <div style="width: 600px; margin: 50px auto">
        <div v-if="active==0" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
          <el-form>
            <el-form-item label="待注册仓单批次号">
              <span>{{ ruleForm.RegisteringSeriesId }}</span>
            </el-form-item>
            <el-form-item>
              <md-input v-model="ruleForm.MemberContact">会员联系人</md-input>
              <md-input v-model="ruleForm.MemberContactPhoneNumber">会员联系人电话</md-input>
              <md-input v-model="ruleForm.ClientID">客户ID</md-input>
              <md-input v-model="ruleForm.ClientName">客户名称</md-input>
              <md-input v-model="ruleForm.ClientContact">客户联系人</md-input>
              <md-input v-model="ruleForm.ClientContactPhoneNumber">客户联系人电话</md-input>
            </el-form-item>
          </el-form>
        </div>

        <!-- 第2步骤 -->
        <el-form v-if="active==1" :model="ruleForm" ref="ruleForm" label label-position="right">
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
        <el-form v-if="active!=0" :model="ruleForm" ref="ruleForm" label label-position="left">
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
      <el-button type="success" @click="dialogVisible = false">保存</el-button>
      <el-button type="primary" :loading="ruleFormLoading" @click="submitForm">提交审核</el-button>
    </span>

    </el-dialog>
    

  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import { parseTime } from "@/utils";
import MdInput from "@/components/MDinput";
import {
  queryMyWarehouseReceipts,
  queryWarehouseReceiptTransactionHistory,
  memberRequest
} from "@/api/member";
import { Message } from "element-ui";

export default {
  name: "ComplexTable",
  directives: {},
  components: {
    MdInput
  },
  filters: {
    typeStatusFilter(type) {
      return type == "Standard" ? "success" : "danger";
    }
  },
  data() {
    return {
      dialogVisible: false,
      active: 0,
      ruleForm: {
        MemberId: "",
        MemberName: "",
        MemberContact: "",
        MemberContactPhoneNumber: "",
        ClientId: "",
        ClientName: "",
        ClientContact: "",
        ClientContactPhoneNumber: "",
        RegisteringSeriesId: ""
      },
      tableKey: 0,
      list: null,
      myInboundRequests: null,
      total: 0,
      listLoading: true,
      ruleFormLoading: false,
      listQuery: {
        page: 1,
        limit: 20
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    seeDetail(row, event, column) {
      row.transHisListLoading = true;
      queryWarehouseReceiptTransactionHistory(row.WarehouseReceiptSeriesId)
        .then(response => {
          const TransactionHistory = JSON.parse(response.data.message);
          for (var i = 0; i < TransactionHistory.length; i++) {
            TransactionHistory[i] = JSON.parse(TransactionHistory[i]);
          }
          row.TransactionHistory = TransactionHistory;
          row.transHisListLoading = false;
        })
        .catch(error => {
          console.log(error);
          row.transHisListLoading = false;
        });
      this.$refs.multipleTable.toggleRowExpansion(row);
    },
    filterVariety(value, row) {
      return row.VarietyCode == value;
    },
    filterType(value, row) {
      return row.Type == value;
    },
    filterStatus(value, row) {
      return row.State == value;
    },
    getList() {
      this.listLoading = true;
      queryMyWarehouseReceipts()
        .then(response => {
          const myInboundRequests = JSON.parse(response.data.message);
          // console.log(myInboundRequests);
          this.total = myInboundRequests.length;
          this.myInboundRequests = myInboundRequests;
          this.handleCurrentChange(this.listQuery.page);
          this.listLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.listLoading = false;
        });
    },
    // getList() {
    //   this.listLoading = true;
    //   fetchList(this.listQuery).then(response => {
    //     this.list = response.data.items;
    //     this.total = response.data.total;

    //     // Just to simulate the time of the request
    //     setTimeout(() => {
    //       this.listLoading = false;
    //     }, 1.5 * 1000);
    //   });
    // },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.handleCurrentChange(1);
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.list = this.myInboundRequests.slice(
        this.listQuery.limit * (this.listQuery.page - 1),
        this.listQuery.limit * (this.listQuery.page - 1) + this.listQuery.limit
      );
    },
    handleClose(done) {
      if (this.active != 0) done();
      else
        this.$confirm("确认关闭？")
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    hanleRegister(row) {
      for (var k in this.ruleForm) {
        this.ruleForm[k] = "";
      }
      this.ruleForm.TxType = "RegisterRequest";
      this.ruleForm.RegisteringSeriesId = row.WarehouseReceiptSeriesId;
      this.ruleForm.RegisteringQuantity = row.GoodsQuantity;
      this.dialogVisible = true;
    },
    submitForm() {
      this.ruleFormLoading = true;
      memberRequest("sendRegisterRequest", this.ruleForm)
        .then(response => {
          if (!response.data.success) throw new Error(response.data.message);
          this.ruleFormLoading = false;
          Message.success("提交成功！");
          this.dialogVisible = false;
          this.getList();
        })
        .catch(error => {
          this.ruleFormLoading = false;
          console.log(error);
          Message.error('提交失败！');
        });
    }
  }
};
</script>
