<template>
    <div class="dropdown" id="department"  @click="clickDropDown()" :value="value" :class="{'cb-box-active':isShowOption}">
        <div class="select-button">
            <div class="title">{{dropdownTitle}}</div>
            <div class="icon-button">
                <i class="fas fa-solid fa-chevron-down"></i>
            </div>
        </div>
        <div class="option" :class="{'showOption':isShowOption}">
            <div class="value" 
                v-for="(option,index) in options" 
                :key="option[`${type}Id`]" 
                :value="option[`${type}Id`]"
                :class="{'active': indexOption === index}"
                @click="selectOption(index)">
                    {{option[`${type}Name`] }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        type:{
            type: String,
            required: true,
        },
        title:{
            type: String,
            required: true,
        },
        value:{
            
        },
        

    },
    created() {
        if(this.type == 'page'){
            this.options = [
                {
                    pageId:10,
                    pageName:'10 nhân viên/trang'
                },
                {
                    pageId:20,
                    pageName:'20 nhân viên/trang'
                },
                {
                    pageId:30,
                    pageName:'30 nhân viên/trang'
                },
                {
                    pageId:50,
                    pageName:'50 nhân viên/trang'
                },
        ]
        }
        
    },
    mounted(){
        
    },
    data(){
        return{
            isShowOption:false,
            options:[],
            indexOption:null,
            dropdownTitle:this.title,
            selectValue:this.value,
            defaultTitle:{
                page:'10 nhân viên/trang'
            },
        }
    },
    
    methods:{
        clickDropDown(){
            this.isShowOption = !this.isShowOption;
        },
        selectOption(index){
            this.indexOption = index;
            this.$emit('setPageSize',this.options[index][`${this.type}Id`]);
        },
        
    },
    watch:{
        indexOption: function(){
            this.dropdownTitle = this.options[this.indexOption][`${this.type}Name`];
            this.selectValue = this.options[this.indexOption][`${this.type}Id`];
        },
        value: function(){
            
            if(this.value!=null){
                this.options.forEach((option,index) => {
                    if(this.value == option[`${this.type}Id`]){
                        this.dropdownTitle = option[`${this.type}Name`];
                        this.indexOption = index;
                    }
                    
                });
            }
            
        }
    }
    
}
</script>
<style scoped>
    @import url('../../assets/css/main.css');
    @import url('../../assets/css/base/BaseDropdown.css')
</style>
