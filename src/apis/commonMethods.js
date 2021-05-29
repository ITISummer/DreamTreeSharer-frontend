import constants from "./constants";

export const getUserAvatarUrl = function (userInfo) {
    return constants.qiniu.uploadQiniuAddr + userInfo.userAvatarUrl
}

export const getBaseUrl = function () {
    return constants.qiniu.uploadQiniuAddr
}
