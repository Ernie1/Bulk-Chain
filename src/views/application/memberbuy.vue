<template>
  <div class="app-container" style="width: 1000px; margin: 0 auto;">

    <!-- 按钮 -->
    <el-button style="margin-bottom: 30px;" type="primary" icon="el-icon-edit" @click="handleNewRequest">填写买入申请</el-button>
    
    <!-- 申请列表 -->
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;"
      @row-click="handleRowClick">
      <el-table-column label="申请编号" align="center" width="300px">
        <template slot-scope="scope">
          <span>{{ scope.row.TransactionId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请日期" width="300px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.DateRequest }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="300px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.CheckState | appStatus2ColorFilter">{{ scope.row.CheckState | inboundAppStatus2CHFilter }}</el-tag>
          <el-tag v-if="scope.row.MatchState" :type="scope.row.MatchState | MatchState2ColorFilter">{{ scope.row.MatchState | MatchState2CHFilter }}</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    
    <!-- 弹出对话框 -->
    <el-dialog
      :before-close="handleClose"
      :visible.sync="dialogVisible">
      <!--  -->
      <!-- <el-steps :active="active" finish-status="success" align-center>
        <el-step title="填写入库资料" icon="el-icon-edit-outline"></el-step>
        <el-step title="提交审核" icon="el-icon-upload2"></el-step>
        <el-step title="货物入库" icon="el-icon-goods"></el-step>
        <el-step title="生成仓单" icon="el-icon-printer"></el-step>
      </el-steps> -->

      <div style="width: 600px; margin: 20px auto">
        <!--  -->
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="买入申请" icon="el-icon-edit-outline"></el-step>
          <el-step title="提交审核" icon="el-icon-upload2"></el-step>
        </el-steps>
        <!-- 第1步骤 -->
        <div v-if="active==0" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
          <el-form>
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
              <md-input v-if="requestType=='DeliveryRequest'&&ruleForm.DeliveryType=='Buyer'" v-model="ruleForm.DeliveryVarietyCode">品种代号</md-input>
              <md-input v-if="requestType=='DeliveryRequest'&&ruleForm.DeliveryType=='Buyer'" v-model="ruleForm.DeliveryQuantity">仓单数量</md-input>
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
        <el-form v-if="active==1" :model="ruleForm" ref="ruleForm" label-width="100px" label-position="right">
          <div style="display: flex; justify-content: center;">
            <!--  -->
            <div v-if="ruleForm.CheckState == 'Checking'">
              <h1><i class="el-icon-time"></i> 您的买入申请已提交审核，请耐心等候</h1>
            </div>
            <!--  -->
            <div v-if="ruleForm.CheckState == 'Rejected'" style="display: flex; align-items: center;">
              <h1><i class="el-icon-circle-close-outline"></i> 您的买入申请未通过审核</h1>
              <h2>&nbsp;&nbsp;{{ ruleForm.Description }}</h2>
            </div>
          </div>
          <!--  -->
          <!-- <el-row> -->
            <!-- <el-col :span="12"> -->
              <el-form-item label="申请编号">
                <span>{{ ruleForm.TransactionId }} </span>
              </el-form-item>
            <!-- </el-col> -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="申请日期">
                  <span>{{ ruleForm.DateRequest }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-if="ruleForm.CheckState != 'Checking'" label="审核日期">
                  <span>{{ ruleForm.DateCheck }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          <!-- </el-row> -->
        </el-form>

        <!-- 第3步骤 -->
        <el-form v-if="active==2" :model="ruleForm" ref="ruleForm" label-width="100px" label-position="right">
          <div style="display: flex; align-items: center; flex-direction: column;">
            <h1><i class="el-icon-circle-check-outline"></i> 您的买入申请已审核通过</h1>
            <!--  -->
          </div>
          <!-- <el-row> -->
            <!-- <el-col :span="12"> -->
              <el-form-item label="申请编号">
                <span>{{ ruleForm.TransactionId }} </span>
              </el-form-item>
            <!-- </el-col> -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="申请日期">
                  <span>{{ ruleForm.DateRequest }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-if="ruleForm.CheckState != 'Checking'" label="审核日期">
                  <span>{{ ruleForm.DateCheck }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          <!-- </el-row> -->
        </el-form>

        <!-- 第4步骤 -->
        <el-form v-if="active==3" :model="ruleForm" ref="ruleForm" label-width="100px" label-position="right">
          <div style="display: flex; align-items: center; flex-direction: column;">
            <h1><i class="el-icon-circle-check-outline"></i> 您的仓单已成功生成</h1>
            <el-form-item label="仓单批次号">
            <span> {{ ruleForm.WarehouseReceipts[0].WarehouseReceiptSeriesId }} </span>
          </el-form-item>
          </div>
        </el-form>

        <!-- 申请表详情 -->
        <el-form v-if="active!=0" :model="ruleForm" ref="ruleForm" label-width="100px" label-position="right">
          <div style="height: 50px"></div>
          <el-form-item label="申请人信息">
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人">
                  <span>{{ ruleForm.name }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电话">
                  <span>{{ ruleForm.phone }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <!--  -->
          <el-form-item label="客户信息">
            <el-row>
              <el-col :span="12">
                <el-form-item label="客户ID">
                  <span>{{ ruleForm.clientID }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户名称">
                  <span>{{ ruleForm.clientCompany }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户联系人">
                  <span>{{ ruleForm.clientName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户电话">
                  <span>{{ ruleForm.clientPhone }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <!--  -->
          <!-- <el-form-item label="货物信息">
            <el-row>
              <el-col :span="12">
                <el-form-item label="品种代号">
                  <span>{{ ruleForm.goodsVariety }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="数量">
                  <span>{{ ruleForm.goodsQuantity }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="品级">
                  <span>{{ ruleForm.goodsLevel }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="产地">
                  <span>{{ ruleForm.goodsRegion }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="运输方式">
                  <span>{{ ruleForm.goodsTransport }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="生产日期">
                  <span>{{ ruleForm.goodsProduceDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="有效期至">
                  <span>{{ ruleForm.goodsValidityPeriod }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="品牌">
                  <span>{{ ruleForm.goodsBand }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="货物包装">
                  <span>{{ ruleForm.goodsPack }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="货物规格">
                  <span>{{ ruleForm.goodsRank }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item> -->
          <!--  -->
          <!-- <el-form-item label="仓库信息">
            <el-row>
              <el-col :span="24">
                <el-form-item label="仓库ID">
                  <span>{{ ruleForm.warehouseID }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="拟入库时间">
                  <span>{{ ruleForm.inboundPlanTime }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item> -->
          <el-form-item v-if="ruleForm.TxType=='DeliveryRequest'" label="货物信息">
            <el-row>
              <el-col :span="12">
                <el-form-item label="品种代号">
                  <span>{{ ruleForm.DeliveryVarietyCode }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="数量">
                  <span>{{ ruleForm.DeliveryQuantity }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>

    <!-- 第1步骤 -->
    <span v-if="active==0" slot="footer">
      <!-- <el-button type="success" @click="dialogVisible = false">保存</el-button> -->
      <el-button type="primary" :loading="ruleFormLoading" @click="submitForm">提交审核</el-button>
    </span>

    </el-dialog>
    <!--  -->
  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import { parseTime } from "@/utils";
import MdInput from "@/components/MDinput";
import { queryTable } from "@/api/utils";
import { memberRequest } from "@/api/member";
import { Message } from "element-ui";
import { backToFrontReceipt } from "@/utils/conversion";

export default {
  name: "ApplicationForm",
  directives: {},
  components: {
    MdInput
  },
  filters: {},
  data() {
    return {
      total: 0,
      tableKey: 0,
      list: null,
      myInboundRequests: null,
      listLoading: true,
      ruleFormLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      dialogVisible: false,
      active: 1,
      ruleForm: {
        MemberContact: "张三",
        MemberContactPhoneNumber: "19900289212",
        ClientId: "client_000001",
        ClientName: "A农产品加工有限公司",
        ClientContact: "莉莉丝",
        ClientContactPhoneNumber: "19900289212"
      },
      // ruleForm: {
      //   name: "",
      //   phone: "",
      //   clientID: "",
      //   clientCompany: "",
      //   clientName: "",
      //   clientPhone: "",
      //   goodsVariety: "",
      //   goodsQuantity: "",
      //   goodsLevel: "",
      //   goodsRegion: "",
      //   goodsTransport: "",
      //   goodsProduceDate: "",
      //   goodsValidityPeriod: "",
      //   goodsBand: "",
      //   goodsPack: "",
      //   goodsRank: "",
      //   warehouseID: "",
      //   inboundPlanTime: ""
      // },
      rules: {
        name: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        clientID: [
          { required: true, message: "请输入客户ID", trigger: "blur" }
        ],
        clientCompany: [
          { required: true, message: "请输入客户名称", trigger: "blur" }
        ],
        clientName: [
          { required: true, message: "请输入客户联系人", trigger: "blur" }
        ],
        clientPhone: [
          { required: true, message: "请输入客户电话", trigger: "blur" }
        ],
        goodsVariety: [
          { required: true, message: "请输入品种代号", trigger: "blur" }
        ],
        goodsQuantity: [
          { required: true, message: "请输入数量", trigger: "blur" }
        ],
        goodsLevel: [
          { required: true, message: "请输入品级", trigger: "blur" }
        ],
        goodsRegion: [
          { required: true, message: "请输入产地", trigger: "blur" }
        ],
        // goodsTransport: [
        //   { required: true, message: "请输入运输方式", trigger: "blur" }
        // ],
        // goodsProduceDate: [
        //   { required: true, message: "请输入生产日期", trigger: "blur" }
        // ],
        // goodsValidityPeriod: [
        //   { required: true, message: "请输入有效期至", trigger: "blur" }
        // ],
        warehouseID: [
          { required: true, message: "请输入仓库ID", trigger: "blur" }
        ],
        TargetWarehouseName: [
          { required: true, message: "请输入仓库名称", trigger: "blur" }
        ],
        inboundPlanTime: [
          { required: true, message: "请输入拟入库时间", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      queryTable("Member", "DeliveryRequest", "queryMyRequests")
        .then(response => {
          const temp = JSON.parse(response.data.message);
          var myInboundRequests = [];
          var total = temp.length;
          for (var i = 0; i < total; i++) {
            var request = JSON.parse(temp[i]);
            if (request.DeliveryType == "Buyer")
              myInboundRequests.push(backToFrontReceipt(request));
          }
          console.log(myInboundRequests);
          this.myInboundRequests = myInboundRequests;
          this.handleCurrentChange(this.listQuery.page);
          this.total = total;
          this.listLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.listLoading = false;
        });
    },
    handleRowClick(a, b, c) {
      this.dialogVisible = true;
      switch (a.CheckState) {
        case "Resolved":
          this.active = 2;
          break;
        case "Finished":
          this.active = 3;
          break;
        default:
          this.active = 1;
          break;
      }
      this.ruleForm = Object.assign({}, a);
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
    submitForm() {
      this.ruleFormLoading = true;
      var fcn = "send" + this.requestType;
      this.ruleForm.DeliveryQuantity = parseInt(this.ruleForm.DeliveryQuantity);
      memberRequest(fcn, this.ruleForm)
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
          Message.error("提交失败！");
        });
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
    handleNewRequest() {
      // for (var k in this.ruleForm) {
      //   this.ruleForm[k] = "";
      // }
      this.active = 0;
      this.requestType = "DeliveryRequest";
      this.ruleForm.DeliveryType = "Buyer";
      this.dialogVisible = true;
    }
  }
};
</script>