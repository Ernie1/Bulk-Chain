<template>
  <div class="app-container">
    
    <el-button style="margin-bottom: 30px;" type="primary" icon="el-icon-edit" @click="handleBuyRequest">填写买入申请</el-button>
    
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
            <el-button type="success" size="mini" @click.stop="handleRequest(scope.row, 'RegisterRequest')">{{ $t('myWarehouseReceipt.Register') }}</el-button>
            <el-button type="primary" size="mini" @click.stop="handleRequest(scope.row, 'OutboundRequest')">{{ $t('myWarehouseReceipt.ApplyforPick') }}</el-button>
          </template>

          <template v-if="scope.row.State=='Flowable'">
            <el-button type="warning" size="mini" @click.stop="handleRequest(scope.row, 'PledgeRequest')">{{ $t('myWarehouseReceipt.Pledge') }}</el-button>
            <el-button type="primary" size="mini" @click.stop="handleRequest(scope.row,'DeliveryRequest')">{{ $t('myWarehouseReceipt.Flow') }}</el-button>
            <el-button type="danger" size="mini" @click.stop="handleRequest(scope.row,'UnregisterRequest')">{{ $t('myWarehouseReceipt.Unregister') }}</el-button>
          </template>

          <template v-if="scope.row.State.substr(scope.row.State.length - 3)=='ing'">
            <el-button type="primary" size="mini" @click.stop="handleViewProgress(scope.row)">{{ $t('myWarehouseReceipt.ViewProgress') }}</el-button>
          </template>

          <template v-if="scope.row.State=='Pledged'">
            <el-button type="danger" size="mini" @click.stop="handleUnpledgeRequest(scope.row)">{{ $t('myWarehouseReceipt.Unpledge') }}</el-button>
          </template>

          <template v-if="scope.row.LastTransactionHistory">
            <el-button type="danger" size="mini" @click.stop="handleConfirmRequest(scope.row, 'ConfirmRejected')">取消</el-button>
            <el-button type="success" size="mini" @click.stop="handleConfirmRequest(scope.row, 'ConfirmResolved')">确认</el-button>
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
        <el-step v-if="requestType=='DeliveryRequest'&&ruleForm.DeliveryType=='Buyer'" title="买入申请" icon="el-icon-edit-outline"></el-step>
        <el-step v-else :title="reqType2CHFilter(requestType)+'申请'" icon="el-icon-edit-outline"></el-step>
        <el-step title="提交审核" icon="el-icon-upload2"></el-step>
      </el-steps>

      <div style="width: 600px; margin: 50px auto">
        <div v-if="active==0" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
          <el-form>
            <el-form-item v-if="requestType!='DeliveryRequest'" :label="'待'+reqType2CHFilter(requestType)+'仓单批次号'">
              <span>{{ ruleForm.RequestSeriesId }}</span>
            </el-form-item>
            <el-form-item style="min-width:500px" >
              <md-input v-model="ruleForm.MemberContact">会员联系人</md-input>
              <md-input v-model="ruleForm.MemberContactPhoneNumber">会员联系人电话</md-input>
              <md-input v-model="ruleForm.ClientId">客户ID</md-input>
              <md-input v-model="ruleForm.ClientName">客户名称</md-input>
              <md-input v-model="ruleForm.ClientContact">客户联系人</md-input>
              <md-input v-model="ruleForm.ClientContactPhoneNumber">客户联系人电话</md-input>
              <md-input v-if="requestType=='OutboundRequest'" v-model="ruleForm.DateInPlan">预计提货时间</md-input>
              <md-input v-if="requestType=='PledgeRequest'" v-model="ruleForm.AmountOfMoneyRequest">申请额度</md-input>
              <md-input v-if="requestType=='PledgeRequest'" v-model="ruleForm.DateDDL">质押期限</md-input>
              <md-input v-if="requestType=='DeliveryRequest'" v-model="ruleForm.DeliveryVarietyCode">品种代号</md-input>
              <md-input v-if="requestType=='DeliveryRequest'" v-model="ruleForm.DeliveryQuantity">仓单数量</md-input>
              <template v-if="requestType=='PledgeRequest'">
                <el-form-item style="height: 70px; display: flex; align-items: center;" label="质押类型">
                  <el-radio-group v-model="ruleForm.PledgeType"> 
                    <el-radio label="Inside">所内质押</el-radio>
                    <el-radio label="Outside">所外质押</el-radio>
                  </el-radio-group>
                </el-form-item>
                <template v-if="ruleForm.PledgeType=='Outside'">
                  <md-input v-model="ruleForm.TargetBankId">银行ID</md-input>
                  <md-input v-model="ruleForm.TargetBankName">银行名称</md-input>
                </template>
              </template>
            </el-form-item>
          </el-form>
        </div>

        <!-- 第2步骤 -->
        <el-form v-if="active==1" :model="ruleForm" ref="ruleForm" label label-position="right">
          <div style="display: flex; justify-content: center;">
            <!--  -->
            <div v-if="ruleForm.CheckState.substr(ruleForm.CheckState.length - 3)=='ing'">
              <h1><i class="el-icon-time"></i> 您的{{ requestType | reqType2CHFilter }}申请已提交审核，请耐心等候</h1>
            </div>
            <!--  -->
            <div v-else-if="ruleForm.CheckState=='Rejected'" style="display: flex; align-items: center;">
              <h1><i class="el-icon-circle-close-outline"></i> 您的{{ requestType | reqType2CHFilter }}申请未通过审核</h1>
              <h2>&nbsp;&nbsp;{{ ruleForm.Description }}</h2>
            </div>
            <div v-else>
              <h1><i class="el-icon-circle-check-outline"></i> 您的{{ requestType | reqType2CHFilter }}申请已审核通过</h1>
            </div>
          </div>
        </el-form>

        <!-- 申请表详情 -->
        <el-form v-if="active!=0" :model="ruleForm" ref="ruleForm" label label-position="left">
          <div style="height: 50px"></div>
          <el-row>
            <el-col :span="24">
              <el-form-item label="交易号">
                <span>{{ ruleForm.TransactionId }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="会员联系人">
                <span>{{ ruleForm.MemberContact }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="会员联系人电话">
                <span>{{ ruleForm.MemberContactPhoneNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户ID">
                <span>{{ ruleForm.ClientId }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户名称">
                <span>{{ ruleForm.ClientName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户联系人">
                <span>{{ ruleForm.ClientContact }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户联系人电话">
                <span>{{ ruleForm.ClientContactPhoneNumber }}</span>
              </el-form-item>
            </el-col>
            
            <div v-if="ruleForm.TxType=='DeliveryRequest'">
              <el-col :span="12">
                <el-form-item label="匹配状态">
                  <span>{{ ruleForm.MatchState | MatchState2CHFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="匹配日期">
                  <span>{{ ruleForm.DateMatch }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="匹配客户ID">
                  <span>{{ ruleForm.MatchClientId }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="匹配客户名称">
                  <span>{{ ruleForm.MatchClientName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="匹配会员ID">
                  <span>{{ ruleForm.MatchMemberId }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="匹配会员名称">
                  <span>{{ ruleForm.MatchMemberName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="匹配申请ID">
                  <span>{{ ruleForm.MatchTxId }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="匹配数量">
                  <span>{{ ruleForm.MatchQuantity }}</span>
                </el-form-item>
              </el-col>
            </div>
          </el-row>
        </el-form>
      </div>

    <!-- 第1步骤 -->
    <span v-if="active==0" slot="footer">
      <!-- <el-button type="success" @click="dialogVisible = false">保存</el-button> -->
      <el-button type="primary" :loading="ruleFormLoading" @click="submitForm">提交审核</el-button>
    </span>

    </el-dialog>
    
    <el-dialog
      title="提示"
      :visible.sync="UnpledgeRequestVisible"
      width="30%"
      >
      <span>{{ requestType=='UnpledgeRequest'?'确认解押？':requestType=='ConfirmRejected'?'取消质押？':'确认质押？' }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="UnpledgeRequestVisible = false">取 消</el-button>
        <el-button :loading="ruleFormLoading" type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import { parseTime } from "@/utils";
import MdInput from "@/components/MDinput";
import { queryTable } from "@/api/utils";
import {
  queryWarehouseReceiptTransactionHistory,
  memberRequest
} from "@/api/member";
import { Message } from "element-ui";
import { reqType2CHFilter } from "@/filters";

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
      UnpledgeRequestVisible: false,
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
        RequestSeriesId: "",
        DateInPlan: "",
        AmountOfMoneyRequest: "",
        DateDDL: ""
      },
      tableKey: 0,
      list: null,
      myWarehouseReceipts: null,
      total: 0,
      listLoading: true,
      ruleFormLoading: false,
      requestType: "",
      listQuery: {
        page: 1,
        limit: 5
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    reqType2CHFilter,
    seeDetail(row, event, column) {
      row.transHisListLoading = true;
      queryWarehouseReceiptTransactionHistory(row.WarehouseReceiptSeriesId)
        .then(response => {
          const TransactionHistory = JSON.parse(response.data.message);
          for (var i = 0; i < TransactionHistory.length; i++) {
            TransactionHistory[i] = JSON.parse(TransactionHistory[i]);
          }
          row.TransactionHistory = TransactionHistory.reverse();
          // console.log(TransactionHistory);
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
      queryTable("Member", "*", "queryMyWarehouseReceipts")
        .then(response => {
          const myWarehouseReceipts = JSON.parse(response.data.message);
          for (let i = 0; i < myWarehouseReceipts.length; ++i) {
            if (myWarehouseReceipts[i].State == "Pledging") {
              this.getLastTransactionHistory(myWarehouseReceipts[i]).then(
                lastTransactionHistory => {
                  if (lastTransactionHistory.ConfirmState == "Confirming")
                    myWarehouseReceipts[
                      i
                    ].LastTransactionHistory = lastTransactionHistory;
                }
              );
            }
          }
          this.total = myWarehouseReceipts.length;
          this.myWarehouseReceipts = myWarehouseReceipts;
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
      this.list = this.myWarehouseReceipts.slice(
        this.listQuery.limit * (this.listQuery.page - 1),
        this.listQuery.limit * (this.listQuery.page - 1) + this.listQuery.limit
      );
    },
    handleClose(done) {
      if (this.active != 0) done();
      else
        this.$confirm("确认关闭？")
          .then(_ => {
            this.ruleFormLoading = false;
            done();
          })
          .catch(_ => {});
    },
    handleBuyRequest() {
      for (var k in this.ruleForm) {
        this.ruleForm[k] = "";
      }
      this.active = 0;
      this.requestType = "DeliveryRequest";
      this.ruleForm.DeliveryType = "Buyer";
      this.dialogVisible = true;
    },
    handleUnpledgeRequest(row, requestType) {
      this.ruleForm = {};
      this.getLastTransactionHistory(row).then(lastTransactionHistory => {
        Object.assign(this.ruleForm, lastTransactionHistory);
        this.requestType = "UnpledgeRequest";
        this.UnpledgeRequestVisible = true;
      });
    },
    handleConfirmRequest(row, requestType) {
      this.ruleForm = {};
      this.getLastTransactionHistory(row).then(lastTransactionHistory => {
        Object.assign(this.ruleForm, lastTransactionHistory);
        this.requestType = requestType;
        this.ruleForm.ConfirmState = requestType;
        this.UnpledgeRequestVisible = true;
      });
    },
    handleRequest(row, requestType) {
      for (var k in this.ruleForm) {
        this.ruleForm[k] = "";
      }
      this.ruleForm.TxType = requestType;
      this.ruleForm.RequestSeriesId = row.WarehouseReceiptSeriesId;
      if (requestType == "RegisterRequest") {
        this.ruleForm.RegisteringSeriesId = row.WarehouseReceiptSeriesId;
        this.ruleForm.RegisteringQuantity = row.GoodsQuantity;
      } else if (requestType == "OutboundRequest") {
        this.ruleForm.OutboundingSeriesId = row.WarehouseReceiptSeriesId;
      } else if (requestType == "PledgeRequest") {
        this.ruleForm.PledgingWarehouseReceiptSeriesId =
          row.WarehouseReceiptSeriesId;
      } else if (requestType == "DeliveryRequest") {
        this.ruleForm.DeliveryType = "Seller";
        this.ruleForm.DeliveryWarehouseReceiptSeriesId =
          row.WarehouseReceiptSeriesId;
      } else if (requestType == "UnregisterRequest") {
        this.ruleForm.UnregisteringSeriesId = row.WarehouseReceiptSeriesId;
      }
      this.active = 0;
      this.requestType = requestType;
      this.dialogVisible = true;
    },
    submitForm() {
      this.ruleFormLoading = true;
      var fcn = "send" + this.requestType;
      if (this.requestType == "PledgeRequest")
        this.ruleForm.AmountOfMoneyRequest = parseInt(
          this.ruleForm.AmountOfMoneyRequest
        );
      else if (this.requestType == "UnpledgeRequest")
        this.ruleForm.UnpledgeRequestDate = parseTime(
          new Date(),
          "{y}-{m}-{d}"
        );
      else if (
        this.requestType == "ConfirmRejected" ||
        this.requestType == "ConfirmResolved"
      ) {
        fcn = "confirmPledgeRequest";
      } else if (this.requestType == "DeliveryRequest") {
        this.ruleForm.DeliveryQuantity = parseInt(
          this.ruleForm.DeliveryQuantity
        );
      }
      console.log(this.ruleForm);
      memberRequest(fcn, this.ruleForm)
        .then(response => {
          if (!response.data.success) throw new Error(response.data.message);
          this.ruleFormLoading = false;
          Message.success("提交成功！");
          this.dialogVisible = false;
          this.UnpledgeRequestVisible = false;
          this.getList();
        })
        .catch(error => {
          this.ruleFormLoading = false;
          console.log(error);
          Message.error("提交失败！");
        });
    },
    getLastTransactionHistory(row) {
      return new Promise(function(resolve, reject) {
        queryWarehouseReceiptTransactionHistory(row.WarehouseReceiptSeriesId)
          .then(response => {
            const TransactionHistory = JSON.parse(response.data.message);
            resolve(
              JSON.parse(TransactionHistory[TransactionHistory.length - 1])
            );
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    handleViewProgress(row) {
      this.getLastTransactionHistory(row).then(lastTransactionHistory => {
        Object.assign(this.ruleForm, lastTransactionHistory);
        this.requestType = this.ruleForm.TxType;
        this.active = 1;
        this.dialogVisible = true;
      });
    }
  }
};
</script>
