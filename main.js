function printReceipt(barcodes) {
    const allItem = loadAllItem()
    const itemInBarcodes = arrayDeDuplication(barcodes)
    const itemInBarcodesgetName = decodeBarcodes(itemInBarcodes, allItem)
    const allSubtotalObj = subtotal(barcodes, itemInBarcodesgetName)
    const allSubtotalStr = CreateAllSubtotal(allSubtotalObj)
    const totalPrice = getTotalPrice(allSubtotalObj)
    console.log(createReceipt(allSubtotalStr, totalPrice))
}

function createReceipt(allSubtotalStr, totalPrice) {
    let str = "\n***<store earning no money>Receipt ***\n" + allSubtotalStr + "----------------------\n" + "Total: " + totalPrice+ " (yuan)\n" + "**********************"
    return str
}

//数组去重
function arrayDeDuplication(array) {
    let arr = []
    array.map(item => {
        if(arr.indexOf(item) < 0) {
            arr.push(item)
        }
    })
    return arr;
} 

function decodeBarcodes(barcodes, allItem) {
    let subtotalMessage = []
    barcodes.map(barcode => {
        allItem.map(item => {
            if(barcode == item.barcode) {
                subtotalMessage.push({"barcode": item.barcode, "Name": item.name, "Quantity": 0, "price": item.price, "subtotal": 0})
            }
        })
    })
    return subtotalMessage
}

function CreateAllSubtotal(subtotal) {
    let allSubtotal = ""
    subtotal.map(item => {
        allSubtotal = allSubtotal + `Name: ${item.Name}, Quantity: ${item.Quantity}, Unit price: ${item.price} (yuan), Subtotal: ${item.subtotal} (yuan)\n`
    })
    return allSubtotal
}

/* Name: Coca-Cola, Quantity: 5, Unit price: 3 (yuan), Subtotal: 15 (yuan) */
function subtotal(itemInBarcodes, allSubtotal) {
    itemInBarcodes.map(barcode => {
        for(let i = 0; i < allSubtotal.length; i++) {
            if(barcode == allSubtotal[i].barcode) {
                item = allSubtotal[i]
                item.Quantity += 1
                item.subtotal = item.price * item.Quantity
            }
        }
    })
    return allSubtotal
}

/* Total: 23 (yuan) */
function getTotalPrice(allSubtotal) {
    let total = 0;
    allSubtotal.map(item => {
        total += item.subtotal
    })
    return total
}

//获取商品信息
function loadAllItem() {
    const allItem = [
        {
            barcode: 'ITEM000000',
            name: 'Coca-Cola',
            price: 3
            },
            {
            barcode: 'ITEM000001',
            name: 'Sprite',
            price: 3
            },
            {
            barcode: 'ITEM000002',
            name: 'Apple',
            price: 5
            },
            {
            barcode: 'ITEM000003',
            name: 'Litchi',
            price: 15
            },
            {
            barcode: 'ITEM000004',
            name: 'Battery',
            price: 2
            },
            {
            barcode: 'ITEM000005',
            name: 'Instant Noodles',
            price: 4
            }
    ]
    return allItem
}

module.exports = {
    printReceipt
};