<template>
  <div class="dashboard-editor-container">
    <div>
      <img src="../../../img/logo.png" class="emptyGif">
    </div>
    <div class="band">Bulk Chain</div>
    <h1>区块链农产品仓单系统</h1>
    <h2 class="display_name">我是{{ name }}</h2>
  </div>
</template>
 
<script>
import { mapGetters } from "vuex";
import PanThumb from "@/components/PanThumb";

export default {
  name: "DashboardEditor",
  components: { PanThumb },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"])
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.emptyGif {
  display: block;
  width: 20%;
  margin: 0 auto;
}

.dashboard-editor-container {
  background-image: url("../../../img/bg_1.jpg");
  min-height: 100vh;
  padding: 150px 60px 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: white;
  .band {
    font-size: 60px;
  }
  .display_name{
    margin-top: 60px;
    padding: 10px 50px;
    background-image: url("../../../img/btn_s.png");
    background-size: 100% 100%; 
  }
}
</style>
