export class Customer {
    id :number;
    username :string;
    password :string;
    name :string;
    surname :string;
    email :string;
    phone :string;
    address :string;
    agreement :Boolean;
    activeOrder :Boolean;

    constructor(username: string = '', password: string = '', name: string = '', surname: string = '', email: string = '', phone: string = '', address: string = '', agreement: boolean = false, activeOrder: boolean = false) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.agreement = agreement;
        this.activeOrder = activeOrder;
    }
    // Giriş yaparken kullanılacak constructor
    static login(username: string, password: string): Customer {
        return new Customer(username, password);
    }

}
