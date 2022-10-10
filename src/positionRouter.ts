import {BigInt, ethereum, log} from "@graphprotocol/graph-ts"
import {
    CreateIncreasePosition, ExecuteIncreasePosition, CancelIncreasePosition,
    CreateDecreasePosition, ExecuteDecreasePosition, CancelDecreasePosition
} from "../generated/PositionRouter/PositionRouter"

import {MarketOrderCreateIncreasePosition,MarketOrderCreateDecreasePosition} from "../generated/schema"


//handle CreateIncreasePosition
export function handleCreateIncreasePosition(event: CreateIncreasePosition): void {
    let marketOrderCreateIncreasePosition = MarketOrderCreateIncreasePosition.load("marketOrderCreateIncreasePosition")
    if (marketOrderCreateIncreasePosition == null) {
        marketOrderCreateIncreasePosition = new MarketOrderCreateIncreasePosition("marketOrderCreateIncreasePosition")
        marketOrderCreateIncreasePosition.counterIndex = BigInt.fromI32(0)

        marketOrderCreateIncreasePosition.save()
    }else {
        marketOrderCreateIncreasePosition.counterIndex = marketOrderCreateIncreasePosition.counterIndex.plus(BigInt.fromI32(1))
        marketOrderCreateIncreasePosition.save()
    }
}
export function handleExecuteIncreasePosition(event: ExecuteIncreasePosition): void {}
export function handleCancelIncreasePosition(event: ExecuteDecreasePosition): void {}

export function handleCreateDecreasePosition(event: CreateDecreasePosition): void {
    let marketOrderCreateDecreasePosition = MarketOrderCreateDecreasePosition.load("marketOrderCreateDecreasePosition")
    if (marketOrderCreateDecreasePosition == null) {
        marketOrderCreateDecreasePosition = new MarketOrderCreateDecreasePosition("marketOrderCreateDecreasePosition")
        marketOrderCreateDecreasePosition.counterIndex = BigInt.fromI32(0)

        marketOrderCreateDecreasePosition.save()
    }else {
        marketOrderCreateDecreasePosition.counterIndex = marketOrderCreateDecreasePosition.counterIndex.plus(BigInt.fromI32(1))
        marketOrderCreateDecreasePosition.save()
    }
}
export function handleExecuteDecreasePosition(event: ExecuteDecreasePosition): void {}
export function handleCancelDecreasePosition(event: ExecuteDecreasePosition): void {}