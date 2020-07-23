function printReceipt(barcodes) {
    const allItem = loadAllItem()
    const itemInBarcodes = arrayDeDuplication(barcodes, allItem)
    const itemInBarcodesgetName = decodeBarcodes(itemInBarcodes, allItem)
    const allSubtotalObj = subtotal(barcodes, itemInBarcodesgetName)
    const allSubtotalString = CreateAllSubtotal(allSubtotalObj)
    const totalPrice = getTotalPrice(allSubtotalObj)
    console.log(createReceipt(allSubtotalString, totalPrice))
}

function createReceipt(allSubtotalStr, totalPrice) {
    /* let str = "\n***<store earning no money>Receipt ***\n" + allSubtotalStr + "----------------------\n" + "Total: " + totalPrice+ " (yuan)\n" + "**********************" */
    let str = `\n***<store earning no money>Receipt ***\n${allSubtotalStr}----------------------\nTotal: ${totalPrice} (yuan)\n**********************`
    return str
}

//数组去重
function arrayDeDuplication(array, allItem) {
    let newArray = []
    array.map(item => {
        if(newArray.indexOf(item) < 0) {
            newArray.push(item)
        }
    })
    newArray = checkBarcodeIsValid(newArray, allItem)
    return newArray;
} 

//判断barcode是否有效
function checkBarcodeIsValid(barcodes, allItem) {
    barcodes.map(barcode => {
        let index = allItem.findIndex(example => example.barcode == barcode)
        if( index < 0) {
            barcodes.splice(index, 1)
        }
    })
    return barcodes
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

//使用find()实现
function subtotal(barcodes, allSubtotal) {
    barcodes.map(barcode => {
        let index = allSubtotal.findIndex(item => item.barcode == barcode)
        allSubtotal[index].Quantity += 1
        allSubtotal[index].subtotal = allSubtotal[index].price * allSubtotal[index].Quantity
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