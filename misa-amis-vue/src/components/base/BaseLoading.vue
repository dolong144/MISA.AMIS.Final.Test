<template>
    <div class="container">
        <div class="spinner">
        </div>
    </div>
</template>
<script>
export default {
    components:{
        
    },
    
}
</script>
<style lang="css" scope>
    .container{
        z-index: 30;
        position: fixed;
        top:0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color:#000000;
        opacity: 0.25;
        align-items: center;
        color: #019160;
    }
    .spinner{
        position: absolute;
        bottom: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: url(../../assets/loading.svg);
        width: 32px;
        height: 32px;
    }
</style>