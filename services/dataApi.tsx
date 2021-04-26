import RequestService from "./api";

const dataApi={
    getListData:function(onSuccess:any,onError:any){
        RequestService.get("https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json",
        (res:any)=>{onSuccess(res)},(err: any)=>{onError(err)})
    },
};
export default dataApi;