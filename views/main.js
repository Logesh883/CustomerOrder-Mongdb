function validate1(){
    var cust_id=document.getElementById("custid-field");
    var orderid=document.getElementById("orderid-field");
    var amount=document.getElementById('amount-field');
    var address=document.getElementById('address-field');
    var letters = /^[A-Za-z]+$/;


    if(cust_id.value==""||orderid.value==""|| amount.value==""||address.value==""){
        alert("Enter all customerorder details");
        return false;
    }
    
}