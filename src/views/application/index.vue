<template>
  <div class="app-container" style="width: 1000px; margin: 0 auto;">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写入库资料" icon="el-icon-edit-outline"></el-step>
      <el-step title="提交审核" icon="el-icon-upload2"></el-step>
      <el-step title="货物入库" icon="el-icon-goods"></el-step>
      <el-step title="生成仓单" icon="el-icon-printer"></el-step>
    </el-steps>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="left" style="width: 600px; margin: 50px auto">
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
        <el-row>
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
        </el-row>
        <!--  -->
        <el-row>
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
        </el-row>
        <!--  -->
        <el-form-item prop="goodsProduceDate">
          <md-input v-model="ruleForm.goodsProduceDate">生产日期</md-input>
        </el-form-item>
        <!--  -->
        <el-form-item prop="goodsValidityPeriod">
          <md-input v-model="ruleForm.goodsValidityPeriod">有效期</md-input>
        </el-form-item>
        <!--  -->
        <el-form-item prop="goodsBand">
          <md-input v-model="ruleForm.goodsBand">品牌</md-input>
        </el-form-item>
        <!--  -->
        <el-form-item prop="goodsPack">
          <md-input v-model="ruleForm.goodsPack">货物包装</md-input>
        </el-form-item>
        <!--  -->
        <el-form-item prop="goodsRank">
          <md-input v-model="ruleForm.goodsRank">货物规格</md-input>
        </el-form-item>
      </el-form-item>
    </el-form>
    <!--  -->
    <div style="width:100%; display: flex;justify-content: center;">
        <el-button type="success">保存</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
    </div>
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
        phone: "",
        clientID: "",
        clientName: "",
        clientPhone: "",
        goodsVariety: "",
        goodsQuantity: "",
        goodsLevel: "",
        goodsRegion: "",
        goodsTransport: "",
        goodsProduceDate: "",
        goodsValidityPeriod: "",
        goodsBand: "",
        goodsPack: "",
        goodsRank: ""
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
        goodsProduceDate: [{ required: true, message: "请输入生产日期", trigger: "blur" }],
        goodsValidityPeriod: [{ required: true, message: "请输入有效期", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    }
  }
};
</script>