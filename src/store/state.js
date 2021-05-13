/**
 * 管理后端返回的数据状态<br>
 * 保存和管理所有组件公共（通信）的数据
 */
export default {
    // 初始化A和B组件的数据，等待获取
    //----------vue-component-communication 测试使用----------
    AMsg: '',
    BMsg: '',
    //----------vue-component-communication 测试使用----------
    // showDialog
    showDialog: false,
    /** 当前登录用户 */
    userInfo: {},
    /** 用户添加卡片功能所需表单 */
    dreamForm: {},
    /** 用户评论卡片 */
    pinboardInfo: {},
    /** 在线聊天系统 */
    sessions: Map,
    users: [], // 用户聊天朋友列表
    currentSessionId: '',
    filterKey: '',
    stomp: null,
}
