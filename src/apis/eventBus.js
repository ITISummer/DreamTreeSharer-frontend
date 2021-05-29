// 事件总线

import Vue from 'vue'
export const EventBus = new Vue()

export const EventName = {
    // Comments | Home | DialogRight
    INIT_PIN_INFO: 'initPinboardInfo',
    // Home | Upload | Pinboards
    INIT_IMAGE_URL: 'initImageUrl',
    // Home | DialogRight
    SHOW_SAVE_BTN: 'showSaveBtn',
    // Home | DialogLeft
    SHOW_SAVE_FROM_SITE_BTN: 'showSaveFromSiteBtn',
    // Upload | DialogRight
    GET_IMAGE_URL_FROM_UPLOAD: 'getImageUrlFromUpload',
    // Pinboards | DialogRight
    GET_SHOW_DIALOG: 'getShowDialog',
    // Pinboards | DialogRight
    INIT_DREAM_FORM: 'initDreamForm',
    // Pinboards | DialogRight
    SAVE_OR_UPDATE: 'saveOrUpdate',

}
