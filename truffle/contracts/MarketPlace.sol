// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

interface NftProperty {
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) external;

    function balanceOf(address account, uint256 id)
        external
        view
        returns (uint256);

    function setApprovalForAll(address operator, bool approved) external;

    function getCollectionId() external view returns (uint256);
}

contract MarketPlace is Ownable {
    /// @notice fees collected by the platform on each sale. To be devided by 1000 to get the percentage
    uint256 public platformFee = 100;

    /// @notice give the amount of item to sell by 'id' and by owner 'address'
    /// @dev collectionAddress => tokenId => userAddress => quantity to sell
    mapping(address => mapping(uint256 => mapping(address => uint256)))
        public itemToSellByIdByAddress;
    /// @notice give the price of item to sell by 'id' and by owner 'address'
    /// @dev collectionAddress => tokenId => userAddress => selling price
    mapping(address => mapping(uint256 => mapping(address => uint256)))
        public sellingPriceByIdByAddress;

    event etherReceived(uint256 valueReceived);

    event propertyPutOnSell(
        uint256 collectionId,
        uint256 nftId,
        string name,
        address seller,
        uint256 quantityOnSell,
        uint256 price
    );

    function approvePropertyForSell(address _collectionAddress) external {
        NftProperty nftProperty;
        nftProperty = NftProperty(_collectionAddress);

        nftProperty.setApprovalForAll(address(this), true);
    }

    /// @notice : set a quantity of type 'itemId' of token in selling at a '_sellingPrice'
    /// @notice : The function call method from the concerned collection by instantiating the good contract with the deployement address
    /// @dev require 1 ==> check if msg.sender is the owner
    /// @dev require 2 ==> check if user balance is enough
    /// @dev set an approval for the contract
    function putPropertyForSell(
        address _collectionAddress,
        uint256 _itemId,
        string memory _name,
        uint256 _sellingPrice,
        uint256 _quantityToSell
    ) public {
        NftProperty nftProperty;
        nftProperty = NftProperty(_collectionAddress);
        require(
            nftProperty.balanceOf(msg.sender, _itemId) > _quantityToSell,
            "not enough item to sell"
        );
        itemToSellByIdByAddress[_collectionAddress][_itemId][
            msg.sender
        ] += _quantityToSell;
        sellingPriceByIdByAddress[_collectionAddress][_itemId][msg.sender] =
            _sellingPrice *
            10**18;

        uint256 collectionId = nftProperty.getCollectionId();

        emit propertyPutOnSell(
            collectionId,
            _itemId,
            _name,
            msg.sender,
            _quantityToSell,
            _sellingPrice
        );
    }

    /// @notice : but a 'quantity' of item of type 'itemId' to the 'seller'
    /// @dev require 1 ==> check if seller has enought item to sell
    /// @dev require 2 ==> check if buyer send the good amount of eth
    /// @dev require 3 ==> check the eth transfer to 'seller'
    function buyPropertyItem(
        address _collectionAddress,
        uint256 _itemId,
        uint256 _quantityToBuy,
        address _seller
    ) public payable {
        require(
            _quantityToBuy <
                itemToSellByIdByAddress[_collectionAddress][_itemId][_seller],
            "seller doesn't have enought quantity"
        );
        uint256 totalBuyingAmount = _quantityToBuy *
            sellingPriceByIdByAddress[_collectionAddress][_itemId][_seller];
        require(
            msg.value == totalBuyingAmount,
            "you have to send the exact amount"
        );
        // transfer of ETH
        uint256 amountToSeller = (msg.value * (1000 - (platformFee))) / 1000;
        uint256 amountToPlatform = (msg.value * (platformFee)) / 1000;
        (bool sentToSeller, ) = payable(_seller).call{value: amountToSeller}(
            ""
        );
        require(sentToSeller, "failed to pay the transaction to seller");
        (bool sentToPlatform, ) = payable(address(this)).call{
            value: amountToPlatform
        }("");
        require(sentToPlatform, "failed to pay the transaction to contract");
        // Tranfer of ERC1155
        NftProperty nftProperty;
        nftProperty = NftProperty(_collectionAddress);
        nftProperty.safeTransferFrom(
            _seller,
            msg.sender,
            _itemId,
            _quantityToBuy,
            ""
        );
        // update of seller balance
        itemToSellByIdByAddress[_collectionAddress][_itemId][
            _seller
        ] -= _quantityToBuy;
    }

    function getContractBalance()
        public
        view
        returns (uint256 contractBalance)
    {
        return address(this).balance;
    }

    receive() external payable {
        emit etherReceived(msg.value);
    }
}
