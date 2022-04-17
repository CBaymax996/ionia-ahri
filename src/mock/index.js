const Mock = require('mockjs')
const {user} = require("~/mock/user");

//使用mockjs模拟数据
Mock.mock('/api/user', () =>
    user
);

Mock.mock("/api/number", () => 123);