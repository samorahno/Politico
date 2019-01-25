export default class Helper{
    static checkString(string){
        if(!string || string === undefined || string.toString().trim() === '' || typeof string !== 'string') return false;
    }

    static checkStringLength(string){
        if(string.length < 3 || string.length > 500) return false;
    }

    static checkRegex(string){
        const stringAllowed = /^[a-zA-Z-'\s\d]+$/;
        if(!string.match(stringAllowed)) return false;
    }
}