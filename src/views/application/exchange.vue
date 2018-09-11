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
            <el-form-item label="仓储场所">
              <span>{{ props.row.Variety }}</span>
            </el-form-item>
            <el-form-item label="开始日期">
              <span>{{ props.row.Variety }}</span>
            </el-form-item>
            <el-form-item label="截止日期">
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
    
       <el-table-column label="申请类型" align="center" width="120px" prop="Type" :filters="[{text: '注册申请', value: '注册申请' }, {text: '注销申请', value: '注销申请' }, {text: '质押审核', value: '质押审核' }, {text: '解押审核', value: '解押审核' }]" :filter-method="filterExchangeApplication">
        <template slot-scope="scope">
          <el-tag :type="scope.row.ExchangeApplication | ExchangeApplicationFilter">{{ scope.row.ExchangeApplication }}</el-tag>
        </template>
      </el-table-column>  
      <el-table-column label="交易号" align="center" width="150px" prop="BatchNumber" sortable>
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
      <el-table-column :label="$t('myWarehouseReceipt.Actions')" align="center" width="240px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
            <el-button type="success" size="mini" @click.stop="handleAgree(scope.row)">批准</el-button>
            <el-button type="danger" size="mini" @click.stop="dialogVisible=true">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <!-- 弹出对话框 -->
    <el-dialog
      :visible.sync="dialogVisible">
      <!--  -->
      <el-steps :active="true" finish-status="info" align-center>
        <el-step title="拒绝" icon="el-icon-circle-close-outline"></el-step>
      </el-steps>

      <div style="width: 600px; margin: 50px auto">
        <md-input v-model="descriptionOfRefuse">说明（选填）</md-input>
      </div>

      <span slot="footer">
        <el-button type="danger" @click="dialogVisible = false">拒绝</el-button>
      </span>

    </el-dialog>

  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";
import MdInput from "@/components/MDinput";

export default {
  name: "ComplexTable",
  components: {
    MdInput
  },
  directives: {
    waves
  },
  filters: {
    typeStatusFilter(type) {
      return type ? "success" : "danger";
    },
    ExchangeApplicationFilter(ExchangeApplication) {
      const ExchangeApplicationMap = {
        注册申请: "success",
        注销申请: "danger",
        质押审核: "info",
        解押审核: "warn"
      };
      return ExchangeApplicationMap[ExchangeApplication];
    }
  },
  data() {
    return {
      dialogVisible: false,
      descriptionOfRefuse: null,
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
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
    filterExchangeApplication(value, row) {
      return row.ExchangeApplication == value;
    },
    filterVariety(value, row) {
      return row.Variety == value;
    },
    filterType(value, row) {
      return row.Type == value;
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
    handleAgree(val) {
        this.$confirm("确认批准？")
          .then(_ => {
            // TODO
          })
          .catch(_ => {});
    }
  }
};
</script>
