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
       
      <el-table-column :label="$t('myWarehouseReceipt.BatchNumber')" align="center" prop="DeliveryWarehouseReceiptSeriesId" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.DeliveryWarehouseReceiptSeriesId }}</span>
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
     
      <el-table-column :label="$t('myWarehouseReceipt.Holder')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.WarehouseReceiptHolder }}</span>
        </template>
      </el-table-column>

      <el-table-column label="匹配状态" class-name="status-col"  prop="MatchState" :filters="[{ text: '未匹配', value: 'Matching' }, { text: '已匹配', value: 'Matched' } ]" :filter-method="filterMatchState">
        <template slot-scope="scope"> 
          <el-tag :type="scope.row.MatchState | MatchState2ColorFilter">{{ scope.row.MatchState | MatchState2CHFilter }}</el-tag>
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[5,10,20,30]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

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
    filterVariety(value, row) {
      return row.VarietyCode == value;
    },
    filterType(value, row) {
      return row.Type == value;
    },
    filterMatchState(value, row) {
      return row.MatchState == value;
    },
    getList() {
      this.listLoading = true;
      queryTable("Exchange", "DeliveryRequest", "queryMyRequests")
        .then(response => {
          var myWarehouseReceipts = JSON.parse(response.data.message);
          for (var i = 0; i < myWarehouseReceipts.length; ++i)
            myWarehouseReceipts[i] = JSON.parse(myWarehouseReceipts[i]);
          console.log(myWarehouseReceipts);
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
            done();
          })
          .catch(_ => {});
    }
  }
};
</script>
