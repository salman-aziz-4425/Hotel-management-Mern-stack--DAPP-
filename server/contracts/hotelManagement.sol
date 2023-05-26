// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract hotelManagement{
    // State variables
    uint id;
    // Owners
    address public owner;
    address public thirdParty;
    
    // Structure
    struct hotelPayments{
        uint reciptID;
        uint payment;
        string onwerID;
        string[] roomsID;
        bool Manager;
        bool thirdPart;
        bool status;
    }
    
    // Mappings
    mapping(uint => hotelPayments) customers;
    mapping(string => bool) bookings;
    //arrays 
    hotelPayments[] arrayBook;
    // Constructor
    constructor(address Manager, address thirdPerson){
        owner = Manager;
        thirdParty = thirdPerson;
        id = 0;
    }
    
    // Events
    event PaymentCreated(bool success);
    event PaymentApproved(bool success, string id);
    event RoomsCheckedOut(bool success);
    
    // Functions
    function createPayment(string memory userID, uint pay, string[] memory rooms) public returns(bool){
        for(uint i = 0; i < rooms.length; i++){
            if(bookings[rooms[i]] == true){
                emit PaymentCreated(false);
                return false;
            }
        }
        
        customers[id] = hotelPayments({
            reciptID:id,
            payment: pay,
            onwerID: userID,
            roomsID: rooms,
            Manager: false,
            thirdPart: false,
            status: false
        });
        for(uint i = 0; i < rooms.length; i++){
            if(bookings[rooms[i]] == false){
               bookings[rooms[i]] = true;
            }
        }
        
        emit PaymentCreated(true);
        arrayBook.push(customers[id]);
        return true;
    }
    
    function approvePayment(uint id) public returns(bool){
        require(msg.sender == owner || msg.sender == thirdParty, "Not an authority person");
        
        if(msg.sender == owner){
            customers[id].Manager = true;
        }
        else{
            customers[id].thirdPart = true;
        }
        
        if(customers[id].Manager == true && customers[id].thirdPart == true){
            customers[id].status = true;
        }
        
        emit PaymentApproved(customers[id].status,customers[id].onwerID);
        return customers[id].status;
    }
    
    function checkoutRooms(uint payID,string[] memory rooms) public returns(bool){
            for(uint i=0;i<arrayBook.length;i++){
                if(arrayBook[i].reciptID==payID){
                    arrayBook[i]=arrayBook[arrayBook.length-1];
                    arrayBook.pop();
                     for(uint i = 0; i < rooms.length; i++){
                            if(bookings[rooms[i]] == true){
                                  bookings[rooms[i]] = false;
                            }
                        }
                emit RoomsCheckedOut(true);
                return true;
                }
            }
      emit RoomsCheckedOut(false);
        return false;
    }
    function getPermissions()public view returns(hotelPayments[] memory){
        require(msg.sender == owner || msg.sender == thirdParty, "Not an authority person");
        return arrayBook;
    }
}
