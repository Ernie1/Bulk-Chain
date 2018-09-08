<template>
  <div class="app-container" style="width: 1000px; margin: 0 auto;">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写入库资料" icon="el-icon-edit-outline"></el-step>
      <el-step title="提交审核" icon="el-icon-upload2"></el-step>
      <el-step title="货物入库" icon="el-icon-goods"></el-step>
      <el-step title="生成仓单" icon="el-icon-printer"></el-step>
    </el-steps>
    <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="left" style="width: 600px; margin: 50px auto 0 auto;">
      <!--  -->
      <el-form-item label="申请人信息">
        <el-form-item prop="name">
          <md-input v-model="ruleForm.name">姓名</md-input>
        </el-form-item>
        <el-form-item prop="phone">
          <md-input v-model="ruleForm.phone">电话</md-input>
        </el-form-item>
      </el-form-item>
      <!--  -->
      <el-form-item label="客户信息">
        <el-form-item prop="clientID">
          <md-input v-model="ruleForm.clientID">客户ID</md-input>
        </el-form-item>
        <el-form-item prop="clientName">
          <md-input v-model="ruleForm.clientName">客户姓名</md-input>
        </el-form-item>
        <el-form-item prop="clientPhone">
          <md-input v-model="ruleForm.clientPhone">客户电话</md-input>
        </el-form-item>
      </el-form-item>
      <!--  -->
      <el-form-item label="货物信息">
        <el-col :span="6">
          <el-form-item prop="goodsVariety">
            <md-input v-model="ruleForm.goodsVariety">品种代号</md-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">&nbsp;</el-col>
        <el-col :span="6">
          <el-form-item prop="goodsQuantity">
            <md-input v-model="ruleForm.goodsQuantity">数量</md-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">&nbsp;</el-col>
        <el-col :span="6">
          <el-form-item prop="goodsLevel">
            <md-input v-model="ruleForm.goodsLevel">品级</md-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <!--  -->
      <el-form-item>
        <el-col :span="11">
          <el-form-item prop="goodsRegion">
            <md-input v-model="ruleForm.goodsRegion">产地</md-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">&nbsp;</el-col>
        <el-col :span="10">
          <el-form-item prop="goodsTransport">
            <md-input v-model="ruleForm.goodsTransport">运输方式</md-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <!--  -->

      <el-form-item prop="clientName">
        <md-input v-model="ruleForm.clientName">客户姓名</md-input>
      </el-form-item>
      <el-form-item prop="clientPhone">
        <md-input v-model="ruleForm.clientPhone">客户电话</md-input>
      </el-form-item>
      <!--  -->
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MdInput from "@/components/MDinput";
export default {
  name: "ApplicationForm",
  components: {
    MdInput
  },
  directives: {},
  filters: {},
  data() {
    return {
      active: 0,
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        clientID: [{ required: true, message: "请输入客户ID", trigger: "blur" }],
        clientName: [{ required: true, message: "请输入客户姓名", trigger: "blur" }],
        clientPhone: [{ required: true, message: "请输入客户电话", trigger: "blur" }],
        goodsVariety: [{ required: true, message: "请输入品种代号", trigger: "blur" }],
        goodsQuantity: [{ required: true, message: "请输入数量", trigger: "blur" }],
        goodsLevel: [{ required: true, message: "请输入品级", trigger: "blur" }],
        goodsRegion: [{ required: true, message: "请输入产地", trigger: "blur" }],
        goodsTransport: [{ required: true, message: "请输入运输方式", trigger: "blur" }],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>