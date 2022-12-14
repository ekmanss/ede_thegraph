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
import {ExampleEntity, Account, Order, DeOrder,SwapOrder, Transaction} from "../generated/schema"

// handle IncreaseOrder
export function handleCreateIncreaseOrder(event: CreateIncreaseOrder): void {
    let account = Account.load(event.params.account)
    if (account === null) {
        account = new Account(event.params.account)
        account.address = event.params.account.toHexString()
        account.lastOrderIndex = event.params.orderIndex
        account.orders = []
        account.deOrders = []

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
        order.timeStamp = event.block.timestamp
        order.save()

        newOrdersList.push(order.id)
        account.orders = newOrdersList
        account.save()

    } else {
        account.lastOrderIndex = event.params.orderIndex
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
        order.timeStamp = event.block.timestamp
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
                    iOrder.timeStamp = event.block.timestamp
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
                    iOrder.timeStamp = event.block.timestamp
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
                    iOrder.timeStamp = event.block.timestamp
                    log.debug("iOrder Id: {} , excuted:", [iOrder.id.toHexString(), iOrder.excuted.toString()])
                    iOrder.save()
                }
            }
        }

    }

}


// ========================================================handle DecreaseOrder========================================================
export function handleCreateDecreaseOrder(event: CreateDecreaseOrder): void {
    let account = Account.load(event.params.account)
    if (account === null) {
        account = new Account(event.params.account)
        account.address = event.params.account.toHexString()
        account.lastOrderIndex = event.params.orderIndex
        account.orders = []
        account.deOrders = []

        let newOrdersList = account.deOrders
        //use address concat lastOrderIndex as uuid
        let order = new DeOrder(event.params.account.concatI32(event.params.orderIndex.toI32()))
        order.orderOwner = account.id
        order.ownerAddress = account.address
        order.orderIndex = event.params.orderIndex
        order.collateralToken = event.params.collateralToken.toHexString()
        order.collateralDelta = event.params.collateralDelta
        order.indexTokenAddress = event.params.indexToken.toHexString()
        order.sizeDelta = event.params.sizeDelta
        order.isLong = event.params.isLong
        order.triggerPrice = event.params.triggerPrice.toString()
        order.triggerAboveThreshold = event.params.triggerAboveThreshold
        order.executionFee = event.params.executionFee.toString()
        order.excuted = false
        order.timeStamp = event.block.timestamp
        order.save()

        newOrdersList.push(order.id)
        account.deOrders = newOrdersList
        account.save()

    } else {
        account.lastOrderIndex = event.params.orderIndex
        let newOrdersList = account.deOrders

        //use address concat lastOrderIndex as uuid
        let order = new DeOrder(event.params.account.concatI32(event.params.orderIndex.toI32()))
        order.orderOwner = account.id
        order.ownerAddress = account.address
        order.orderIndex = event.params.orderIndex
        order.collateralToken = event.params.collateralToken.toHexString()
        order.collateralDelta = event.params.collateralDelta
        order.indexTokenAddress = event.params.indexToken.toHexString()
        order.sizeDelta = event.params.sizeDelta
        order.isLong = event.params.isLong
        order.triggerPrice = event.params.triggerPrice.toString()
        order.triggerAboveThreshold = event.params.triggerAboveThreshold
        order.executionFee = event.params.executionFee.toString()
        order.excuted = false
        order.timeStamp = event.block.timestamp
        order.save()

        newOrdersList.push(order.id)
        account.deOrders = newOrdersList
        account.save()

    }

}

export function handleUpdateDecreaseOrder(event: UpdateDecreaseOrder): void {

    let address = event.params.account
    let orderIdex = event.params.orderIndex


    let account = Account.load(address)
    if (account !== null) {
        let orderList = account.deOrders
        //find order of event.params.orderIndex and remove it
        for (let i = 0; i < orderList.length; i++) {
            let iOrder = DeOrder.load(orderList[i])
            if (iOrder !== null) {
                if (iOrder.orderIndex.equals(orderIdex)) {
                    //set excuted to true
                    iOrder.triggerPrice = event.params.triggerPrice.toString()
                    iOrder.triggerAboveThreshold = event.params.triggerAboveThreshold
                    iOrder.sizeDelta = event.params.sizeDelta
                    iOrder.collateralDelta = event.params.collateralDelta
                    iOrder.timeStamp = event.block.timestamp
                    log.debug("iOrder Id: {} , excuted:", [iOrder.id.toHexString(), iOrder.excuted.toString()])
                    iOrder.save()
                }
            }
        }

    }

}

export function handleCancelDecreaseOrder(event: CancelDecreaseOrder): void {

    let address = event.params.account
    let orderIdex = event.params.orderIndex


    let account = Account.load(address)
    if (account !== null) {
        let orderList = account.deOrders
        //find order of event.params.orderIndex and remove it
        for (let i = 0; i < orderList.length; i++) {
            let iOrder = DeOrder.load(orderList[i])
            if (iOrder !== null) {
                if (iOrder.orderIndex.equals(orderIdex)) {
                    //set excuted to true
                    iOrder.excuted = true
                    iOrder.timeStamp = event.block.timestamp
                    log.debug("iOrder Id: {} , excuted:", [iOrder.id.toHexString(), iOrder.excuted.toString()])
                    iOrder.save()
                }
            }
        }

    }

}

export function handleExecuteDecreaseOrder(event: ExecuteDecreaseOrder): void {

    let address = event.params.account
    let orderIdex = event.params.orderIndex


    let account = Account.load(address)
    if (account !== null) {
        let orderList = account.deOrders
        //find order of event.params.orderIndex and remove it
        for (let i = 0; i < orderList.length; i++) {
            let iOrder = DeOrder.load(orderList[i])
            if (iOrder !== null) {
                if (iOrder.orderIndex.equals(orderIdex)) {
                    //set excuted to true
                    iOrder.excuted = true
                    iOrder.timeStamp = event.block.timestamp
                    log.debug("iOrder Id: {} , excuted:", [iOrder.id.toHexString(), iOrder.excuted.toString()])
                    iOrder.save()
                }
            }
        }

    }

}


// handle SwapOrder
export function handleCreateSwapOrder(event: CreateSwapOrder): void {
    let swapOrderIndex = event.params.orderIndex
    let swapOrder = SwapOrder.load(event.params.account.concatI32(swapOrderIndex.toI32()));
    if (swapOrder === null) {
        swapOrder = new SwapOrder(event.params.account.concatI32(swapOrderIndex.toI32()))
        swapOrder.ownerAddress = event.params.account.toHexString()
        swapOrder.orderIndex = event.params.orderIndex
        let pathRouter = ""
        swapOrder.path = []
        let newPath = swapOrder.path
        for (let i = 0; i < event.params.path.length; i++) {
            newPath.push(event.params.path[i].toHexString())
            pathRouter = pathRouter.concat("-").concat(event.params.path[i].toHexString())
        }
        swapOrder.pathRouter = pathRouter
        swapOrder.path = newPath
        swapOrder.amountIn = event.params.amountIn
        swapOrder.minOut = event.params.minOut
        swapOrder.triggerRatio = event.params.triggerRatio
        swapOrder.triggerAboveThreshold = event.params.triggerAboveThreshold
        swapOrder.shouldUnwrap = event.params.shouldUnwrap
        swapOrder.executionFee = event.params.executionFee
        swapOrder.timeStamp = event.block.timestamp
        swapOrder.excuted = false

        swapOrder.save()
    }else {

    }

}

export function handleUpdateSwapOrder(event: UpdateSwapOrder): void {

    let swapOrderIndex = event.params.ordexIndex
    let swapOrder = SwapOrder.load(event.params.account.concatI32(swapOrderIndex.toI32()));
    if (swapOrder === null) {
        swapOrder = new SwapOrder(event.params.account.concatI32(swapOrderIndex.toI32()))
        swapOrder.ownerAddress = event.params.account.toHexString()
        swapOrder.orderIndex = event.params.ordexIndex
        let pathRouter = ""
        swapOrder.path = []
        let newPath = swapOrder.path
        for (let i = 0; i < event.params.path.length; i++) {
            newPath.push(event.params.path[i].toHexString())
            pathRouter = pathRouter.concat("-").concat(event.params.path[i].toHexString())
        }
        swapOrder.pathRouter = pathRouter
        swapOrder.path = newPath
        swapOrder.amountIn = event.params.amountIn
        swapOrder.minOut = event.params.minOut
        swapOrder.triggerRatio = event.params.triggerRatio
        swapOrder.triggerAboveThreshold = event.params.triggerAboveThreshold
        swapOrder.shouldUnwrap = event.params.shouldUnwrap
        swapOrder.executionFee = event.params.executionFee
        swapOrder.timeStamp = event.block.timestamp
        swapOrder.excuted = false

        swapOrder.save()
    }else {
        swapOrder.minOut = event.params.minOut
        swapOrder.triggerRatio = event.params.triggerRatio
        swapOrder.triggerAboveThreshold = event.params.triggerAboveThreshold
        swapOrder.timeStamp = event.block.timestamp

        swapOrder.save()
    }
}

export function handleExecuteSwapOrder(event: ExecuteSwapOrder): void {
    let swapOrderIndex = event.params.orderIndex
    let swapOrder = SwapOrder.load(event.params.account.concatI32(swapOrderIndex.toI32()));
    if (swapOrder === null) {
        swapOrder = new SwapOrder(event.params.account.concatI32(swapOrderIndex.toI32()))
        swapOrder.ownerAddress = event.params.account.toHexString()
        swapOrder.orderIndex = event.params.orderIndex
        let pathRouter = ""
        swapOrder.path = []
        let newPath = swapOrder.path
        for (let i = 0; i < event.params.path.length; i++) {
            newPath.push(event.params.path[i].toHexString())
            pathRouter = pathRouter.concat("-").concat(event.params.path[i].toHexString())
        }
        swapOrder.pathRouter = pathRouter
        swapOrder.path = newPath
        swapOrder.amountIn = event.params.amountIn
        swapOrder.minOut = event.params.minOut
        swapOrder.triggerRatio = event.params.triggerRatio
        swapOrder.triggerAboveThreshold = event.params.triggerAboveThreshold
        swapOrder.shouldUnwrap = event.params.shouldUnwrap
        swapOrder.executionFee = event.params.executionFee
        swapOrder.timeStamp = event.block.timestamp
        swapOrder.excuted = false

        swapOrder.save()
    }else {
        swapOrder.excuted = true
        swapOrder.timeStamp = event.block.timestamp

        swapOrder.save()
    }

}

export function handleCancelSwapOrder(event: CancelSwapOrder): void {

    let swapOrderIndex = event.params.orderIndex
    let swapOrder = SwapOrder.load(event.params.account.concatI32(swapOrderIndex.toI32()));
    if (swapOrder === null) {
        swapOrder = new SwapOrder(event.params.account.concatI32(swapOrderIndex.toI32()))
        swapOrder.ownerAddress = event.params.account.toHexString()
        swapOrder.orderIndex = event.params.orderIndex
        let pathRouter = ""
        swapOrder.path = []
        let newPath = swapOrder.path
        for (let i = 0; i < event.params.path.length; i++) {
            newPath.push(event.params.path[i].toHexString())
            pathRouter = pathRouter.concat("-").concat(event.params.path[i].toHexString())
        }
        swapOrder.pathRouter = pathRouter
        swapOrder.path = newPath
        swapOrder.amountIn = event.params.amountIn
        swapOrder.minOut = event.params.minOut
        swapOrder.triggerRatio = event.params.triggerRatio
        swapOrder.triggerAboveThreshold = event.params.triggerAboveThreshold
        swapOrder.shouldUnwrap = event.params.shouldUnwrap
        swapOrder.executionFee = event.params.executionFee
        swapOrder.timeStamp = event.block.timestamp
        swapOrder.excuted = false

        swapOrder.save()
    }else {
        swapOrder.excuted = true
        swapOrder.timeStamp = event.block.timestamp

        swapOrder.save()
    }

}
//================================================================================================

export function handleInitialize(event: Initialize): void {}
export function handleUpdateGov(event: UpdateGov): void {}
export function handleUpdateMinExecutionFee(event: UpdateMinExecutionFee): void {}
export function handleUpdateMinPurchaseTokenAmountUsd(event: UpdateMinPurchaseTokenAmountUsd): void {}



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