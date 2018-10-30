export function frontToBackReceipt(ruleForm) {
  return {
    TransactionId: ruleForm.TransactionId || null,
    // TxType: null,
    // MemberId: null,
    // MemberName: null,
    DateRequest: ruleForm.DateRequest || null,
    MemberContact: ruleForm.name || null,
    MemberContactPhoneNumber: ruleForm.phone || null,
    ClientId: ruleForm.clientID || null,
    ClientName: ruleForm.clientCompany || null,
    ClientContact: ruleForm.clientName || null,
    ClientContactPhoneNumber: ruleForm.clientPhone || null,
    GoodsListRequested: [{
      VarietyCode: ruleForm.goodsVariety || null,
      Quantity: parseInt(ruleForm.goodsQuantity) || null,
      Quality: ruleForm.goodsLevel || null,
      Brand: ruleForm.goodsBand || null,
      GoodsPackage: ruleForm.goodsPack || null,
      GoodsSpecification: ruleForm.goodsRank || null,
      ProductionPlace: ruleForm.goodsRegion || null,
      ProductionDate: ruleForm.goodsProduceDate || null,
      ValidDate: ruleForm.goodsValidityPeriod || null,
    }],
    ModeOfTransport: ruleForm.goodsTransport || null,
    TargetWarehouseId: ruleForm.warehouseID || null,
    // TargetWarehouseName: null,
    DateInplan: ruleForm.inboundPlanTime || null,
    // DateCheck: null,
    CheckState: ruleForm.CheckState || null,
    // GoodsListPermitted: [],
    // DatePermitted: null,
    // Description: null,
    // GoodsListIndeed: [],
    // DateIndeed: null,
    // WarehouseReceipts: [],
    // DateCreate: null
  }
}


export function backToFrontReceipt(ruleForm) {
  var WarehouseReceipt = {};
  if (ruleForm.GoodsListRequested)
    WarehouseReceipt = ruleForm.GoodsListRequested[0];
  else if (ruleForm.RegisteringWarehouseReceipt)
    WarehouseReceipt =
      ruleForm.RegisteringWarehouseReceipt;
  else if (ruleForm.PledgingWarehouseReceipt)
    WarehouseReceipt =
      ruleForm.PledgingWarehouseReceipt;
  else if (ruleForm.UnpledgingWarehouseReceipt)
    WarehouseReceipt =
      ruleForm.UnpledgingWarehouseReceipt;
  else if (ruleForm.UnregisteringWarehouseReceipt)
    WarehouseReceipt =
      ruleForm.UnregisteringWarehouseReceipt;
  return Object.assign({
    // TransactionId: ruleForm.TransactionId || null,
    // TxType: null,
    // MemberId: null,
    // MemberName: null,
    // DateRequest: ruleForm.DateRequest || null,
    name: ruleForm.MemberContact || null,
    phone: ruleForm.MemberContactPhoneNumber || null,
    clientID: ruleForm.ClientId || null,
    clientCompany: ruleForm.ClientName || null,
    clientName: ruleForm.ClientContact || null,
    clientPhone: ruleForm.ClientContactPhoneNumber || null,
    goodsVariety: WarehouseReceipt.VarietyCode || null,
    goodsQuantity: WarehouseReceipt.Quantity ? parseInt(WarehouseReceipt.Quantity) : null,
    goodsLevel: WarehouseReceipt.Quality || null,
    goodsBand: WarehouseReceipt.Brand || null,
    goodsPack: WarehouseReceipt.GoodsPackage || null,
    goodsRank: WarehouseReceipt.GoodsSpecification || null,
    goodsRegion: WarehouseReceipt.ProductionPlace || null,
    goodsProduceDate: WarehouseReceipt.ProductionDate || null,
    goodsValidityPeriod: WarehouseReceipt.ValidDate || null,
    goodsTransport: ruleForm.ModeOfTransport || null,
    warehouseID: ruleForm.TargetWarehouseId || null,
    // TargetWarehouseName: null,
    inboundPlanTime: ruleForm.DateInPlan || null,
    // DateCheck: null,
    CheckState: ruleForm.CheckState || null,
    // GoodsListPermitted: [],
    // DatePermitted: null,
    // Description: null,
    // GoodsListIndeed: [],
    // DateIndeed: null,
    // WarehouseReceipts: [],
    // DateCreate: null
    WarehouseReceipt: WarehouseReceipt
  }, ruleForm);
}
