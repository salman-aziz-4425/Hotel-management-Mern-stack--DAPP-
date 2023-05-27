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
    mapping(uint=>bool)approvals;
    //arrays 
    hotelPayments[] arrayBook;
    // Constructor
 constructor(address thirdPerson2,address thirdPerson){
        owner = thirdPerson2;
        thirdParty = thirdPerson;
        id = 0;
    }
    // Events
    event PaymentCreated(bool success);
    event PaymentApproved(bool success);
    event RoomsCheckedOut(bool success);
     event userCheckedOut(bool success);
    
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
        id+=1;
        return true;
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
    function compareStrings(string memory string1, string memory string2) public pure returns (bool) {
    return keccak256(abi.encodePacked(string1)) == keccak256(abi.encodePacked(string2));
}


function approvePayment(address sender1,uint userId) public returns (bool) {
    require(sender1 == owner || sender1 == thirdParty, "Not an authority person");

    if (sender1 == owner) {
        customers[userId].Manager = true;
        for(uint i=0;i<arrayBook.length;i++){
            if(arrayBook[i].reciptID==userId){
                arrayBook[i].Manager=true;
                break;
            }
        }
    } else if (sender1 == thirdParty) {
        customers[userId].thirdPart = true;
         for(uint i=0;i<arrayBook.length;i++){
            if(arrayBook[i].reciptID==userId){
                arrayBook[i].thirdPart=true;
                break;
            }
        }
    }

    if (customers[userId].Manager && customers[userId].thirdPart) {
        customers[userId].status = true;
         for(uint i=0;i<arrayBook.length;i++){
            if(arrayBook[i].reciptID==userId){
                emit PaymentApproved(true);
                arrayBook[i].status=true;
                break;
            }
        }
        return true;
    }

    emit PaymentApproved(customers[userId].status);
    return false;
}

function getPayment(address sender1,uint userId) public view returns (bool) {
    require(sender1 == owner || sender1 == thirdParty, "Not an authority person");
     return customers[userId].status;
    }

function userCheckout(string memory roomId) public returns(bool){
         if(bookings[roomId]==true){
             bookings[roomId]=false;
            emit userCheckedOut(true);
            return true;
         }
 emit userCheckedOut(false);
 return false;
    }


    function getPermissions()public view returns(hotelPayments[] memory){
        require(msg.sender==owner || msg.sender==thirdParty, "Not an authority person");
        return arrayBook;
    }
}
