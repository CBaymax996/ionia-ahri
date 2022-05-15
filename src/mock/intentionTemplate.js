const template_1 = {
    id: 123,
    text: "浦发银行今天股票涨了多少？今天",
    words: ["浦发银行", "今天", "涨了", "多少", "？", "今天"],
    slots: [
        {
            id: 1,
            name: "股票名称",
            wordIndex: 1
        },
        {
            id: 2,
            name: "时间",
            wordIndex: 1
        }
    ]
}

const template_np = {
    id: null,
    text: null,
    words: null,
    slots: null
}

const slots = [{
    id: 1,
    name: "股票名称"
}, {
    id: 2,
    name: "时间"
}]

export default {
    template_1, template_np, slots
}