import Helper from './Helper';

let {checkString, checkStringLength, checkRegex} = Helper;
class Validator{
    static validateString(string){
        if(string){
            if(checkString(string)) return false;
            if(checkStringLength(string)) return false;
            if(checkRegex(string)) return false;
            return true;
        }
        return false;
    }

    static validateAddress(string){
        if(string){
            if(checkString(string)) return false;
            if(checkStringLength(string)) return false;
            return true;
        }
        return false;
    }

}
export default Validator;