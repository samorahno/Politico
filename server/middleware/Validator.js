class Validator{
    static validateString(string){
        if(!string || string === undefined || string.toString().trim() === '' || typeof string !== 'string') return false;
        if(string.lenght < 3 || string.lenght > 500) return false;
        const stringAllowed = /^[a-zA-Z-'\s\d]+$/;
        if(!string.match(stringAllowed)) return false;
        return true;
    }

    static validateAddress(string){
        if(!string || string === undefined || string.toString().trim() === '' || typeof string !== 'string') return false;
        if(string.lenght < 3 || string.lenght > 500) return false;
        return true;
    }

}
export default Validator;