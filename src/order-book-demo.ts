import {BigInt, ethereum, log} from "@graphprotocol/graph-ts"
import {
    OrderBookDemo,
    CancelDecreaseOrder,
    CancelIncreaseOrder,
    CancelSwapOrder,
    CreateDecreaseOrder,
    CreateIncreaseOrder,
    CreateSwapOrder,
    ExecuteDecreaseOrder,
    ExecuteIncreaseOrder,
    ExecuteSwapOrder,
    Initialize,
    UpdateDecreaseOrder,
    UpdateGov,
    UpdateIncreaseOrder,
    UpdateMinExecutionFee,
    UpdateMinPurchaseTokenAmountUsd,
    UpdateSwapOrder
} from "../generated/OrderBookDemo/OrderBookDemo"
import {ExampleEntity, Account, Order, Transaction} from "../generated/schema"

// handle IncreaseOrder
export function handleCreateIncreaseOrder(event: CreateIncreaseOrder): void {
    let account = Account.load(event.params.account)
    if (account === null) {
        account = new Account(event.params.account)
        account.address = event.params.account.toHexString()
        account.lastOrderIndex = event.params.orderIndex
        account.orders = []

        let newOrdersList = account.orders
        //use address concat lastOrderIndex as uuid
        let order = new Order(event.params.account.concatI32(event.params.orderIndex.toI32()))
        order.orderOwner = account.id
        order.ownerAddress = account.address
        order.orderIndex = event.params.orderIndex
        order.purchaseToken = event.params.purchaseToken.toHexString()
        order.purchaseTokenAmount = event.params.purchaseTokenAmount
        order.collateralToken = event.params.collateralToken.toHexString()
        order.indexTokenAddress = event.params.indexToken.toHexString()
        order.sizeDelta = event.params.sizeDelta
        order.isLong = event.params.isLong
        order.triggerPrice = event.params.triggerPrice.toString()
        order.triggerAboveThreshold = event.params.triggerAboveThreshold
        order.executionFee = event.params.executionFee.toString()
        order.excuted = false
        order.save()

        newOrdersList.push(order.id)
        account.orders = newOrdersList
        account.save()

    } else {
        account.lastOrderIndex = event.params.orderIndex
        let newOrdersList = account.orders
        let newOrder = account.orders

        //use address concat lastOrderIndex as uuid
        let order = new Order(event.params.account.concatI32(event.params.orderIndex.toI32()))
        order.orderOwner = account.id
        order.ownerAddress = account.address
        order.orderIndex = event.params.orderIndex
        order.purchaseToken = event.params.purchaseToken.toHexString()
        order.purchaseTokenAmount = event.params.purchaseTokenAmount
        order.collateralToken = event.params.collateralToken.toHexString()
        order.indexTokenAddress = event.params.indexToken.toHexString()
        order.sizeDelta = event.params.sizeDelta
        order.isLong = event.params.isLong
        order.triggerPrice = event.params.triggerPrice.toString()
        order.triggerAboveThreshold = event.params.triggerAboveThreshold
        order.executionFee = event.params.executionFee.toString()
        order.excuted = false
        order.save()

        newOrdersList.push(order.id)
        account.orders = newOrdersList
        account.save()

    }

}

export function handleUpdateIncreaseOrder(event: UpdateIncreaseOrder): void {
    let address = event.params.account
    let orderIdex = event.params.orderIndex


    let account = Account.load(address)
    if (account !== null) {
        let orderList = account.orders
        //find order of event.params.orderIndex and remove it
        for (let i = 0; i < orderList.length; i++) {
            let iOrder = Order.load(orderList[i])
            if (iOrder !== null) {
                if (iOrder.orderIndex.equals(orderIdex)) {
                    //set excuted to true
                    iOrder.sizeDelta = event.params.sizeDelta
                    iOrder.triggerPrice = event.params.triggerPrice.toString()
                    iOrder.triggerAboveThreshold = event.params.triggerAboveThreshold
                    log.debug("iOrder Id: {} , excuted:", [iOrder.id.toHexString(), iOrder.excuted.toString()])
                    iOrder.save()
                }
            }
        }

    }

}

export function handleCancelIncreaseOrder(event: CancelIncreaseOrder): void {
    let address = event.params.account
    let orderIdex = event.params.orderIndex

    let account = Account.load(address)
    if (account !== null) {
        let orderList = account.orders
        //find order of event.params.orderIndex and remove it
        for (let i = 0; i < orderList.length; i++) {
            let iOrder = Order.load(orderList[i])
            if (iOrder !== null) {
                if (iOrder.orderIndex.equals(orderIdex)) {
                    //set excuted to true
                    iOrder.excuted = true
                    log.debug("iOrder Id: {} , excuted:", [iOrder.id.toHexString(), iOrder.excuted.toString()])
                    iOrder.save()
                }
            }
        }

    }
}

export function handleExecuteIncreaseOrder(event: ExecuteIncreaseOrder): void {
    let address = event.params.account
    let orderIdex = event.params.orderIndex

    let testOrder = Order.load(event.params.account.concatI32(orderIdex.toI32()));
    if (testOrder !== null) {
        log.debug("testOrder Id: {} , excuted:", [testOrder.id.toHexString(), testOrder.excuted.toString()])
    }

    let account = Account.load(address)
    if (account !== null) {
        let orderList = account.orders
        //find order of event.params.orderIndex and remove it
        for (let i = 0; i < orderList.length; i++) {
            let iOrder = Order.load(orderList[i])
            if (iOrder !== null) {
                if (iOrder.orderIndex.equals(orderIdex)) {
                    //set excuted to true
                    iOrder.excuted = true
                    log.debug("iOrder Id: {} , excuted:", [iOrder.id.toHexString(), iOrder.excuted.toString()])
                    iOrder.save()
                }
            }
        }

    }

}


// handle DecreaseOrder
export function handleCreateDecreaseOrder(event: CreateDecreaseOrder): void {
}

export function handleUpdateDecreaseOrder(event: UpdateDecreaseOrder): void {
}

export function handleCancelDecreaseOrder(event: CancelDecreaseOrder): void {
}

export function handleExecuteDecreaseOrder(event: ExecuteDecreaseOrder): void {
}


// handle SwapOrder
export function handleCreateSwapOrder(event: CreateSwapOrder): void {
}

export function handleUpdateSwapOrder(event: UpdateSwapOrder): void {
}

export function handleExecuteSwapOrder(event: ExecuteSwapOrder): void {
}


//utils
export function loadTransaction(event: ethereum.Event): Transaction {
    let transaction = Transaction.load(event.transaction.hash.toHexString())
    if (transaction === null) {
        transaction = new Transaction(event.transaction.hash.toHexString())
    }
    transaction.blockNumber = event.block.number
    transaction.timestamp = event.block.timestamp
    transaction.gasUsed = event.transaction.gasLimit
    transaction.gasPrice = event.transaction.gasPrice
    transaction.save()
    return transaction as Transaction
}