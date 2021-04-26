const RequestService ={

    get:function (urlApi:string,onSuccess:any, onError:any ){
        fetch(urlApi, {
            method: 'GET', 
          }).then(res => res.json())
          .catch(error =>   onError(error))
          .then(response =>   onSuccess(response));
    }

}
export default RequestService;