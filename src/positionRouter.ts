import {BigInt, ethereum, log} from "@graphprotocol/graph-ts"
import {
    CreateIncreasePosition, ExecuteIncreasePosition, CancelIncreasePosition,
    CreateDecreasePosition, ExecuteDecreasePosition, CancelDecreasePosition
} from "../generated/PositionRouter/PositionRouter"

import {
    MarketOrderCreateIncreasePosition,
    MarketOrderCreateDecreasePosition,
    Account,
    Order,
    CreateIncreasePositionInfo,
    CreateDecreasePositionInfo
} from "../generated/schema"


//handle CreateIncreasePosition
export function handleCreateIncreasePosition(event: CreateIncreasePosition): void {
    let account = Account.load(event.params.account)
    if (account === null) {
        account = new Account(event.params.account)
        account.address = event.params.account.toHexString()
        account.lastOrderIndex = BigInt.fromI32(0)
        account.orders = []
        account.deOrders = []

        account.save()

    }

    let marketOrderCreateIncreasePosition = MarketOrderCreateIncreasePosition.load("marketOrderCreateIncreasePosition")
    if (marketOrderCreateIncreasePosition == null) {
        marketOrderCreateIncreasePosition = new MarketOrderCreateIncreasePosition("marketOrderCreateIncreasePosition")
        marketOrderCreateIncreasePosition.counterIndex = BigInt.fromI32(0)

        marketOrderCreateIncreasePosition.save()
    } else {
        marketOrderCreateIncreasePosition.counterIndex = marketOrderCreateIncreasePosition.counterIndex.plus(BigInt.fromI32(1))
        marketOrderCreateIncreasePosition.save()
    }

    // save CreateIncreasePositionInfo
    let createIncreasePositionInfo = new CreateIncreasePositionInfo(event.params.index.toString());
    createIncreasePositionInfo.account = event.params.account;
    let pathItem = createIncreasePositionInfo.path;
    if (pathItem === null) {
        pathItem = [];
        for (let i = 0; i < event.params.path.length; i++) {
            pathItem.push(event.params.path[i].toHexString());
        }
    } else {
        for (let i = 0; i < event.params.path.length; i++) {
            pathItem.push(event.params.path[i].toHexString());
        }
    }
    createIncreasePositionInfo.path = pathItem;
    createIncreasePositionInfo.indexTokne = event.params.indexToken.toHexString();
    createIncreasePositionInfo.amountIn = event.params.amountIn.toString();
    createIncreasePositionInfo.minOut = event.params.minOut.toString();
    createIncreasePositionInfo.sizeDelta = event.params.sizeDelta.toString();
    createIncreasePositionInfo.isLong = event.params.isLong;
    createIncreasePositionInfo.acceptablePrice = event.params.acceptablePrice.toString();
    createIncreasePositionInfo.executionFee = event.params.executionFee.toString();
    createIncreasePositionInfo.index = event.params.index;
    createIncreasePositionInfo.blockNumber = event.params.blockNumber;
    createIncreasePositionInfo.blockTime = event.params.blockTime;
    createIncreasePositionInfo.gasPrice = event.params.gasPrice.toString();

    createIncreasePositionInfo.save();
}

export function handleExecuteIncreasePosition(event: ExecuteIncreasePosition): void {
}

export function handleCancelIncreasePosition(event: ExecuteDecreasePosition): void {
}

export function handleCreateDecreasePosition(event: CreateDecreasePosition): void {
    let account = Account.load(event.params.account)
    if (account === null) {
        account = new Account(event.params.account)
        account.address = event.params.account.toHexString()
        account.lastOrderIndex = BigInt.fromI32(0)
        account.orders = []
        account.deOrders = []

        account.save()

    }

    let marketOrderCreateDecreasePosition = MarketOrderCreateDecreasePosition.load("marketOrderCreateDecreasePosition")
    if (marketOrderCreateDecreasePosition == null) {
        marketOrderCreateDecreasePosition = new MarketOrderCreateDecreasePosition("marketOrderCreateDecreasePosition")
        marketOrderCreateDecreasePosition.counterIndex = BigInt.fromI32(0)

        marketOrderCreateDecreasePosition.save()
    } else {
        marketOrderCreateDecreasePosition.counterIndex = marketOrderCreateDecreasePosition.counterIndex.plus(BigInt.fromI32(1))
        marketOrderCreateDecreasePosition.save()
    }

    // save CreateDecreasePositionInfo
    let createDecreasePositionInfo = new CreateDecreasePositionInfo(event.params.index.toString());
    createDecreasePositionInfo.account = event.params.account;
    let pathItem = createDecreasePositionInfo.path;
    if (pathItem === null) {
        pathItem = [];
        for (let i = 0; i < event.params.path.length; i++) {
            pathItem.push(event.params.path[i].toHexString());
        }
    } else {
        for (let i = 0; i < event.params.path.length; i++) {
            pathItem.push(event.params.path[i].toHexString());
        }
    }

    createDecreasePositionInfo.path = pathItem;
    createDecreasePositionInfo.indexTokne = event.params.indexToken.toHexString();
    createDecreasePositionInfo.collateralDelta = event.params.collateralDelta.toString();
    createDecreasePositionInfo.sizeDelta = event.params.sizeDelta.toString();
    createDecreasePositionInfo.isLong = event.params.isLong;
    createDecreasePositionInfo.receiver = event.params.receiver.toString();
    createDecreasePositionInfo.acceptablePrice = event.params.acceptablePrice.toString();
    createDecreasePositionInfo.minOut = event.params.minOut.toString();
    createDecreasePositionInfo.executionFee = event.params.executionFee.toString();
    createDecreasePositionInfo.index = event.params.index;
    createDecreasePositionInfo.blockNumber = event.params.blockNumber;
    createDecreasePositionInfo.blockTime = event.params.blockTime;

    createDecreasePositionInfo.save();
}

export function handleExecuteDecreasePosition(event: ExecuteDecreasePosition): void {
}

export function handleCancelDecreasePosition(event: ExecuteDecreasePosition): void {
}