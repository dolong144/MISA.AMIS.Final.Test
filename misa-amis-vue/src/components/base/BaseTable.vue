<template>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>
                        <div class="select-box"></div>
                    </th>
                    <th>MÃ NHÂN VIÊN</th>
                    <th>TÊN NHÂN VIÊN</th>
                    <th>GIỚI TÍNH</th>
                    <th>NGÀY SINH</th>
                    <th>SỐ CMND</th>
                    <th>CHỨC DANH</th>
                    <th>TÊN ĐƠN VỊ</th>
                    <th>SỐ TÀI KHOẢN</th>
                    <th>TÊN NGÂN HÀNG</th>
                    <th>CHI NHÁNH TK NGÂN HÀNG</th>
                    <th>CHỨC NĂNG</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(employee,index) in employees" 
                    :key="employee.EmployeeId" 
                    ref="tableRow"
                    @dblclick="rowDbClick(employee.EmployeeId)" >
                    <td>
                        <div class="select-box"></div>
                    </td>
                    <td>{{employee.EmployeeCode}}</td>
                    <td>{{employee.FullName}}</td>
                    <td>{{formatGender(employee.Gender)}}</td>
                    <td>{{formatDate(employee.DateOfBirth)}}</td>
                    <td>{{employee.IdentityNumber}}</td>
                    <td>{{employee.PositionName}}</td>
                    <td>{{employee.DepartmentName}}</td>
                    <td>{{employee.BankAcount}}</td>
                    <td>{{employee.BankName}}</td>
                    <td>{{employee.BankBranch}}</td>
                    <td>
                        <div class="dropdown-table">
                            <div class="select-button-table">
                                <div class="title" @click="rowDbClick(employee.EmployeeId)">Sửa</div>
                                <div class="icon-button" @click="showFunction(index)"></div>
                            </div>
                            <div class="option-table" :class="{'show-option':(isShowOption && index == curentRowFunction)}">
                                <div class="value-table" @click="doubleRow(employee.EmployeeId)">Nhân bản</div>
                                <div class="value-table" @click="showPopup(employee.EmployeeId,employee.EmployeeCode)">Xoá</div>
                                <div class="value-table" >Ngưng sử dụng</div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import Format from "../../utils/Format.js"
export default {
    props:{
        employees:{
            type: Array,
            required:true,
        },
        employeesToDelete:{
            type:Array,
            
        }

    },
    data(){
        return{
            isShowOption:false,
            curentRowFunction:0,
        }
    },
    methods:{
    //định dang lại ngày sinh để hiển thị ra bảng
    //DVLong(3/9/2021)
    formatDate: function(date){
        return Format.dobFormat(date);
    },
    //định dang hiển thị giới tính
    //DVLong(3/9/2021)
    formatGender: function(gender){
        switch(gender){
            case 0:
            return "Nữ";
            case 1:
            return "Nam";
            case 2:
            return "Không xác định";
        }
    },
     //hiện thông tin chi tiết 1 nhân viên khi nhấn đúp vào 1 hàng
     //DVLong(3/9/2021)
      rowDbClick(employeeId){
          this.$emit('rowDbClick',employeeId);
         
      },
    //hiện các chức năng trong cột chức năng
    //DVLong(3/9/2021)
    showFunction(index){
        this.isShowOption = !this.isShowOption;
        this.curentRowFunction = index;
    },
    //Hiện popup
    //DVLong(3/9/2021)
    showPopup(id,code){
        this.showFunction(0);
        this.$emit('showPopup',id,code)
    },
    //nhân bản bản ghi
    //DVLong(3/9/2021)
    doubleRow(id){
        this.showFunction(0);
        this.$emit('doubleRow',id)

    }
  }
}
</script>
<style scoped>
@import url('../../assets/css/main.css');
@import url('../../assets/css/base/BaseTable.css');
</style>