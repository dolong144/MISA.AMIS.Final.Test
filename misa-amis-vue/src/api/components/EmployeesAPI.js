import BaseAPI from "@/api/base/BaseAPI.js";

class EmployeesAPI extends BaseAPI {
    constructor() {
        super();
        this.controller = "v1/employees";
    }
}

export default new EmployeesAPI();