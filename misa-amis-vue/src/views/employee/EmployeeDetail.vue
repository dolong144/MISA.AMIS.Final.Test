<template>
    <div class="container-form">
        <div class="form">
            <div class="form-header">
                <div class="title-form">
                    <div class="name-title">Thông tin nhân viên</div>
                    <div class="check-box-title">
                        <div class="select-box"></div>
                        Là khách hàng</div>
                    <div class="check-box-title">
                        <div class="select-box"></div>
                        Là nhà cung cấp</div>
                </div>
                <div class="button-form">
                    <div class="help-button"></div>
                    <div class="close-button-form" @click="closeForm()"></div>
                </div>
            </div>
            <div class="main-form">
                <div class="flex-form">
                    <div class="column1">
                        <div class="row">
                            <div class="field">
                                <div class="title-field">Mã <span class="binding">*</span></div>
                                <input type="text" v-model="employee.EmployeeCode" :class="{'error-input':errorInput[0]}" @blur="checkRequired(employee.EmployeeCode,0)">
                            </div>
                            <div class="field">
                                <div class="title-field" >Tên <span class="binding">*</span></div>
                                <input type="text" :class="{'error-input':errorInput[1]}" v-model="employee.FullName" @blur="checkRequired(employee.FullName,1)">
                            </div>
                        </div>
                        <div class="field">
                            <div class="title-field">Đơn vị <span class="binding">*</span></div>
                            <input type="text" v-model="employee.DepartmentName" :class="{'error-input':errorInput[2]}" @blur="checkRequired(employee.DepartmentName,2)">
                        </div>
                        <div class="field">
                            <div class="title-field">Chức danh</div>
                            <input type="text" v-model="employee.PositionName">
                        </div>
                    </div>
                    <div class="column2">
                        <div class="row">
                            <div class="field">
                                <div class="title-field">Ngày sinh</div>
                                <input type="date" v-model="employee.DateOfBirth">
                            </div>
                            <div class="field">
                                <div class="title-field">Giới tính</div>
                                <div class="option-radio" style="display:flex;">
                                    <div class="gender-radio">
                                        <input type="radio" name="gender" ref="gender" id="male" value="1" v-model="employee.Gender">
                                        <label class="gender-name" for="male" >Nam</label>
                                    </div>
                                    <div class="gender-radio">
                                        <input type="radio" name="gender" id="female" value="0" v-model="employee.Gender">
                                        <label class="gender-name" for="female">Nữ</label>
                                    </div>
                                    <div class="gender-radio">
                                        <input type="radio" name="gender" id="other" value="2" v-model="employee.Gender">
                                        <label class="gender-name" for="other">Khác</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="field">
                                <div class="title-field">Số CMND</div>
                                <input type="text" style="width: 245px;" v-model="employee.IdentityNumber">
                            </div>
                            <div class="field">
                                <div class="title-field">Ngày cấp</div>
                                <input type="date" v-model="employee.IdentityDate">
                            </div>
                        </div>
                        <div class="field">
                            <div class="title-field">Nơi cấp</div>
                            <input type="text" v-model="employee.IdentityPlace">
                        </div>
                    </div>
                </div>
                <div >
                    <div class="field">
                        <div class="title-field">Địa chỉ</div>
                        <input type="text" style="width: 875px;" v-model="employee.Address">
                    </div>
                    <div class="row">
                        <div class="field">
                            <div class="title-field">DT di động</div>
                            <input type="text" v-model="employee.MobiePhoneNumber">
                        </div>
                        <div class="field">
                            <div class="title-field">DT cố định</div>
                            <input type="text" v-model="employee.TelePhoneNumber">
                        </div>
                        <div class="field">
                            <div class="title-field">Email</div>
                            <input type="text" v-model="employee.Email">
                        </div>
                    </div>
                    <div class="row">
                        <div class="field">
                            <div class="title-field">TK ngân hàng</div>
                            <input type="text" v-model="employee.BankAcount">
                        </div>
                        <div class="field">
                            <div class="title-field">Tên ngân hàng</div>
                            <input type="text" v-model="employee.BankName">
                        </div>
                        <div class="field">
                            <div class="title-field">Chi nhánh</div>
                            <input type="text" v-model="employee.BankBranch">
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="form-footer">
                <div class="footer-left">
                    <div class="second-button" @click="closeForm()">Huỷ</div>
                </div>
                <div class="footer-right">
                    <div class="second-button" @click="submitForm()">Cất</div>
                    <div class="first-button">Cất và thêm</div>
                </div>
            </div>
        </div>
        <BasePopup v-show="isShowPopup"
                    :contentPopup="contentPopup"
                    :typePopup="typePopup"
                    @hidePopup="showPopup"
                    @confirmPopup="showPopup"/>
    </div>
</template>
<script>
import BasePopup from "../../components/base/BasePopup.vue"
import EmployeesAPI from "@/api/components/EmployeesAPI";
import Format from "../../utils/Format.js"
export default {
    components:{
    BasePopup,
  },
    props:{
        isShowForm:{
            type: Boolean,
            default: false,
            required: true,
        },
        employeeId:{
            type: String,
            default: '',
            required: true,
        },
        newCode:{
            type:String,
            required:false,
        },
        typeSubmitForm:{
            type: String,
            required:true,
        }
    },
    data() {
        return {
            employee:{
                EmployeeCode: this.newCode,
                FullName:'',
                Email:'',
                Address:'',
                MobiePhoneNumber:'',
                TelePhoneNumber:'',
                IdentityNumber:'',
                IdentityDate:"1999-02-14T15:06:15",
                IdentityPlace:'',
                DepartmentId:'11452b0c-768e-5ff7-0d63-eeb1d8ed8cef',
                DepartmentName:'',
                PositionName:'',
                BankName:'',
                BankBranch:'',
                BankAcount:'',
                CreatedDate:"1999-02-14T15:06:15",
                CreatedBy:'',
                ModifiedDate:"1999-02-14T15:06:15",
                ModifiedBy:'',
            },
            isShowPopup:false,
            typePopup:'',
            contentPopup:'',
            errorInput:[false,false,false],
        }
    },
    methods:{
        //đóng form
        closeForm(){
            this.$emit('showForm');
            this.resetForm();
        },
        //Ấn lưu thông tin nhân viên
        submitForm(){
            //validate dữ liệu
            console.log(this.$refs)
           if(this.employee.EmployeeCode == ''){
               this.typePopup = "alert";
               this.contentPopup="Mã nhân viên không được để trống!";
               this.showPopup();
               return;
           }
           if(this.employee.FullName == ''){
               this.typePopup = "alert";
               this.contentPopup="Tên không được để trống!";
               this.showPopup();
               return;
           }
           if(this.employee.DepartmentName == ''){
               this.typePopup = "alert";
               this.contentPopup="Đơn vị không được để trống!";
               this.showPopup();
               return;
           }
           
            let self = this;
            //thêm mới nhân viên
            if(self.typeSubmitForm !=2 ){
                EmployeesAPI.add(self.employee).then(res=>{
                    console.log(res);
                    self.closeForm();
                    self.$emit('loadData');
                }).catch(res=>{
                    console.log(res);
                    self.closeForm();
                })
            }
            //Sửa 1 nhân viên
            else{
                EmployeesAPI.update(self.employeeId,self.employee).then(res=>{
                    console.log(res);
                    self.$emit('showToast','Sửa nhân viên thành công!','success-toast');
                    self.closeForm();
                    self.$emit('loadData');
                }).catch(res=>{
                    console.log(res);
                    self.$emit('showToast','Có lỗi xảy ra!','error-toast');
                    // self.closeForm();
                })
            }
            
        },
        //reset form
        resetForm(){
            this.employee={
                EmployeeCode: this.newCode,
                FullName:'',
                Email:'',
                Address:'',
                MobiePhoneNumber:'',
                TelePhoneNumber:'',
                IdentityNumber:'',
                IdentityDate:"1999-02-14T15:06:15",
                IdentityPlace:'',
                DepartmentId:'11452b0c-768e-5ff7-0d63-eeb1d8ed8cef',
                DepartmentName:'',
                PositionName:'',
                BankName:'',
                BankBranch:'',
                BankAcount:'',
                CreatedDate:"1999-02-14T15:06:15",
                CreatedBy:'',
                ModifiedDate:"1999-02-14T15:06:15",
                ModifiedBy:'',
            }
            this.errorInput = [false,false,false];

        },
        //
        showPopup(){
            this.isShowPopup = !this.isShowPopup;
        },

        checkRequired(input,index){
            if(input == ''){
                this.errorInput[index] = true;
            }else{
                this.errorInput[index] = false;
            }
        }
    },
    watch: { 
        employeeId(){
            let self = this;
            /* Lấy dữ liệu nhân viên theo mã và hiển thị lên form
            dvlong(2/8/2021)
            */
            if (self.employeeId != ''){
                EmployeesAPI.getById(self.employeeId).then(res=>{
                    self.employee = JSON.parse(JSON.stringify(res.data));

                    // format các dữ liệu cần thay đổi
                    self.employee.DateOfBirth = Format.dobFormatToForm(self.employee.DateOfBirth)
                    self.employee.IdentityDate = Format.dobFormatToForm(self.employee.IdentityDate)
                    self.employee.JoinDate = Format.dobFormatToForm(self.employee.JoinDate)
                    self.employee.Salary = Format.currencyFormatter(self.employee.Salary)
                    if(this.typeSubmitForm == 3){
                        self.employee.EmployeeCode = this.newCode;
                    }
                }).catch(res=>{ 
                    console.log(res);
                    
                })
            }
        },
        /* gán EmployeeCode bằng mã code mới
        dvlong(31/7/2021)
         */
        isShowForm: function(){
            if((this.typeSubmitForm == 1 || this.typeSubmitForm == 3) && this.isShowForm){
                
                this.employee.EmployeeCode = this.newCode;
            }
            
            
        },
        
        

    },
    
}
</script>
<style scoped>
@import url('../../assets/css/main.css');
@import url('../../assets/css/layout/EmployeeDetail.css');


</style>