<template>
<div class="popup-container" :class="{'showPopup':isShowPopup}">
    <div class="popup" :class="typePopup">
        <div class="main-popup">
            <div class="icon-popup"></div>
            <div class="content-popup">{{contentPopup}}</div>
        </div>
        <hr>
        <div class="footer-popup">
            <div class="cancle-button" @click="hidePopup">Không</div>
            <div class="allow-button" @click="confirmPopup">Có</div>
            <div class="close-button" @click="confirmPopup">Đóng</div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props:{
        isShowPopup:{
            type : Boolean,
            default:false,
            required : true,
        },
        typePopup:{
            type: String,
            
        },
        contentPopup:{
            type: String,
            
        }
    },
    methods:{
        
        // xác nhận đồng ý popup
        //DVLong(3/9/2021)
        confirmPopup(){
            this.$emit('confirmPopup');
        },
        // ẩn popup đi
        //DVLong(3/9/2021)
        hidePopup(){
            this.$emit('hidePopup');
        }
    }
}
</script>
<style scoped>
@import url('../../assets/css/main.css');
@import url('../../assets/css/base/BasePopup.css');
</style>