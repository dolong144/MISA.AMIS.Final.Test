<template>
    <div class="content-container">
        <div class="navbar">
          <div class="title-content">Nhân viên</div>
          <div class="button-add" @click="btnAdd()">Thêm mới nhân viên</div>
        </div>
        <div class="content-main">
          <div class="cover-filter">
            <div class="content-filter-section">
              <input type="text" placeholder="Tìm theo mã, tên nhân viên" style="width:250px;" v-model="textSearch">
              <div class="refresh-box" @click="loadData()"></div>
              <div class="export-box"></div>
            </div>
          </div>
          <BaseTable :employees="employees"
                    :employeesToDelete="employeesToDelete"
                    
                    @deleteEmployeeDelete="deleteEmployeeDelete"
                    @rowDbClick="rowDbClick"
                    @loadData="loadData"
                    @doubleRow="doubleRow"
                    @showPopup="showPopup"/>
          
        </div>
        <div class="content-footer">
          <div class="footer-left">Tổng số: <span style="font-family:NotoSans-Bold;"> {{ totalRecord }} </span>  bản ghi</div>
          <div class="footer-right">
            <BaseDropdown class="size-page"
                          :type='"page"'
                          title = "10 nhân viên/trang"
                          @setPageSize="setPageSize"/>
            <div class="paging">
              <div class="pre-page button-paging" @click="setCurrentPage(curentPage - 1)" :class="{'hide-page-button':(curentPage == 1)}">Trước</div>
              <div class="page-number button-paging" @click="setCurrentPage(1)" :class="{'page-active':(curentPage == 1)}">1</div>
              <div class="page-number button-paging" @click="setCurrentPage(2)" :class="{'page-active':(curentPage == 2)}" v-show="2 < totalPage" >2</div>
              <div class="page-number button-paging" @click="setCurrentPage(3)" :class="{'page-active':(curentPage == 3)}" v-show="3 < totalPage">3</div>
              <span v-show="4 < totalPage">...</span>
              <div class="page-number button-paging" @click="setCurrentPage(totalPage)" :class="{'page-active':(curentPage == totalPage)}" v-show="1 < totalPage">{{totalPage}}</div>
              <div class="next-page button-paging"  @click="setCurrentPage(curentPage + 1)" :class="{'hide-page-button':(curentPage == totalPage)}">Sau</div>
            </div>
          </div>
        </div>
        <EmployeeDetail :class="{'showForm':isShowForm}"
                        @showForm="showForm"
                        :isShowForm="isShowForm"
                        :typeSubmitForm="typeSubmitForm"
                        :employeeId="employeeId"
                        :newCode="newCode"
                        @loadData="loadData" />
        <BaseLoading v-show="isLoading"/>
        <BasePopup v-show="isShowPopup"
                    :contentPopup="contentPopup"
                    :typePopup="typePopup"
                    @hidePopup="hidePopup"
                    @confirmPopup="confirmPopup"/>
    </div>
</template>
<script>
import BaseDropdown from '../../components/base/BaseDropdown.vue'
import BaseLoading from '../../components/base/BaseLoading.vue'
import BaseTable from '../../components/base/BaseTable.vue'
import EmployeeDetail from './EmployeeDetail.vue'
import BasePopup from "../../components/base/BasePopup.vue"
import EmployeesAPI from "@/api/components/EmployeesAPI";
export default {
  name: 'TheContent',
  components:{
    BaseTable,EmployeeDetail,BaseLoading,BasePopup,BaseDropdown
  },
  mounted() {
      this.loadData();
  },
  data(){
    return{
      isShowButtonDelete:false,
      typeSubmitForm: 1,
      employeeId :'',
      newCode: '',
      isShowForm : false,
      employees:[],
      isShowPopup: false,
      typePopup:'',
      contentPopup:'',
      employeesToDelete:'',
      isLoading:false,
      totalPage:4,
      totalRecord:0,
      curentPage:1,
      pageSize:10,
      textSearch:'',
      timeOutSearch:0,
    }
  },
  methods:{
    //Hàm load dữ liệu 
    //DVLong(3/9/2021)
      loadData(){
            var self = this;
            self.isLoading = true;
            self.employees = {};
            //Gọi API lấy dữ liệu nhân viên
            EmployeesAPI.paging(this.textSearch,this.curentPage,this.pageSize).then(res=>{

                self.employees = res.data.data;
                this.totalRecord = res.data.totalRecord;
                this.totalPage = res.data.totalPage;
                self.isLoading = false;

            }).catch(res=>{
                console.log(res);
                self.isLoading = false;
            })
      },
      //Mở form thêm nhân viên
      //DVLong(3/9/2021)
      btnAdd(){
          let self =this;
            EmployeesAPI.newCode().then(res=>{
                self.newCode = res.data;
                self.isShowForm = !self.isShowForm;
                self.typeSubmitForm = 1;
                
            }).catch(res=>{
                console.log(res);
                this.isShowForm = !this.isShowForm;
            })
                
      },
      //hàm ẩn hiện form
      //DVLong(3/9/2021)
      showForm(){
          this.isShowForm = !this.isShowForm;
      },
      //hiện thông tin chi tiết 1 nhân viên khi nhấn đúp vào 1 hàng
      //DVLong(3/9/2021)
      rowDbClick(employeeId){
          this.typeSubmitForm = 2;
          this.employeeId = employeeId;
          this.isShowForm = !this.isShowForm;
      },
      //Dặt kích thước trang
      //DVLong(3/9/2021)
      setPageSize(pageNumber){
        this.pageSize = pageNumber;
      },
      //đặt số trang hiện tại
      //DVLong(3/9/2021)
      setCurrentPage(index){
        this.curentPage = index;
        if(this.curentPage < 1){
          this.curentPage  = 1;
        }
        if(this.curentPage > this.totalPage){
          this.curentPage  = this.totalPage;
        }
      },
      //Nhân bản bản ghi
      //DVLong(3/9/2021)
      doubleRow(id){
        this.typeSubmitForm = 3;
        this.employeeId = id;
        this.isShowForm = !this.isShowForm;
        let self =this;
        EmployeesAPI.newCode().then(res=>{
            self.newCode = res.data;
        }).catch(res=>{
            console.log(res);
        })
      },
      //Hiện popup xoá
      //DVLong(3/9/2021)
      showPopup(id,code){
        this.isShowPopup = !this.isShowPopup;
        this.contentPopup = `Bạn có thực sự muốn xoá nhân viên <${code}> không?`;
        this.employeesToDelete = id;

      },
      //ẩn popup
      //DVLong(3/9/2021)
      hidePopup(){
        this.isShowPopup = !this.isShowPopup;
      },
      //Xác nhận popup để tiếp tục thực hiện
      //DVLong(3/9/2021)
      confirmPopup(){
        this.isShowPopup = !this.isShowPopup;
        this.deleteRow(this.employeesToDelete);
      },
      // Xoá 1 hàng dữ liệu
      //DVLong(3/9/2021)
      deleteRow(id){
        EmployeesAPI.delete(id).then(res => {
            this.loadData();
            console.log(res);

        }).catch(res=>{
            console.log(res);
        })

    },
  },
  watch:{
      
      isShowForm:function(){
          if(!this.isShowForm){
              this.employeeId = '';
          }
      },
      textSearch:function(){
          
        clearTimeout(this.timeOutSearch);
        this.timeOutSearch = setTimeout(()=>{
          this.curentPage = 1;
          this.loadData();
          console.log(this.textSearch);
        },500)
          
      },
      curentPage:function(){
        this.loadData();
      },
      pageSize:function(){
        this.curentPage = 1;
        this.loadData();
      },

  },
  
}
</script>
<style scoped>
@import url('../../assets/css/main.css');
@import url('../../assets/css/layout/EmployeeList.css');

</style>
