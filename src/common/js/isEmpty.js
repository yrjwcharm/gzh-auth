//判断字符是否为空的方法
export default function isEmpty(str){
    if(typeof str == "undefined" || str == null || str == ""|| str ==0){
        return true;
    }else{
        return false;
    }
}
